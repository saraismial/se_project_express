const ClothingItem = require('../models/clothingItem');


// CREATE /items
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      return next(err);
    });
};


// GET /items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: err.message });
      }
      return next(err);
    });
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
        return res.status(400).json({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: err.message });
      }
      return next(err);
    });
};


// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).json({item}))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: err.message });
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
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: err.message });
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
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: err.message });
      }
      return next(err);
    });
}


module.exports = { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem };