const ClothingItem = require('../models/clothingItem');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../middlewares/error-handler');

// CREATE /items
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

// GET /items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch(next);
};


// UPDATE /items/:itemId
const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: { imageUrl }}, { new: true, runValidators: true })
    .orFail()
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError('Item not found'));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};


// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if(!item.owner.equals(req.user._id)) {
        return next(new ForbiddenError('You can only delete your own items.'));
      }
      return item.deleteOne().then(() => res.status(200).json(item));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError('Item not found'));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};


// PUT /items/:itemId/likes
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError('Item not found'));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
}


// DELETE /items/:itemId/likes
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError('Item not found'));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
}


module.exports = { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem };