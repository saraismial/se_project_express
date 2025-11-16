const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
require('./utils/processHandlers');

const mainRouter = require('./routes/index');
const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => logger.info("Connected to the Database."))
  .catch((error) => logger.error(error))
;

// middleware to parse json body
app.use(express.json());
// enable cross origin resource sharing
app.use(cors());

// public routes
app.post('/signin', login);
app.post('/signup', createUser);

// authentication
app.use(auth);

app.use("/", mainRouter);


// central error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.stack || err);

  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;

  return res.status(status).send({ message });
})

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}.`));
