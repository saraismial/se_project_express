const router = require('express').Router();

const { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');

const { validateCardBody, validateItemId } = require('../middlewares/validation');

router.get('/', getItems);

router.post('/', validateCardBody, createItem);

router.put('/:itemId', validateItemId, updateItem);

router.delete('/:itemId', validateItemId, deleteItem);

router.put('/:itemId/likes', validateItemId, likeItem);

router.delete('/:itemId/likes', validateItemId, dislikeItem);


module.exports = router;
