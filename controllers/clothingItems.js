const ClothingItem = require('../models/clothingItem');


// CREATE /items
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(201).send(item)
    }).catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};


// GET /items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      return res.status(500).send({ message: 'is this the error?', err });
    });
};


// UPDATE /items/:itemId
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: { imageUrl }}, { new: true, runValidators: true })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else return res.status(500).send({ message: err.message });
    });
};


// DELETE /items/:itemId
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({item}))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};


// PUT /items/:itemId/likes
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
}


// DELETE /items/:itemId/likes
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
}


module.exports = { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem };