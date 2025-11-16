const User =  require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

// GET /users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}


// GET /users/me
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
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

// UPDATE /users/me
const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, avatar, email } = req.body;

  User.findByIdAndUpdate(_id, {$set: { name, avatar, email }}, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: err.message });
      }
      if (err.code === 11000) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }
      return next(err);
    });
};


// POST /signup
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash })
    )
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;

      return res.status(201).json(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      return next(err);
    });
}


// POST /signin
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required'});
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'Incorrect email or password') {
        return res.status(401).send({ message: 'Incorrect email or password'  });
      }
      return next(err);
    })
}

module.exports = { getUsers, getCurrentUser, updateUser, createUser, login };