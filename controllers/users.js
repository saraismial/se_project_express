const User =  require("../models/user");

// GET /users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}


// GET singular user /users/userID
const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).json({ message: 'User not found' });
      }
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid user id' });
      }
      return next(err);
    });
}


// POST /users
const createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      return next(err);
    });
}

module.exports = { getUsers, getUser, createUser };