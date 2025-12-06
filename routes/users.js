const router = require('express').Router();

const { validateUserId } = require('../middlewares/validation');

const { getUsers, getCurrentUser, updateUser } = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);  // change /me to /:userId?

router.patch('/me', updateUser);


module.exports = router;