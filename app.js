require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const logger = require('./utils/logger');
const { requestLogger, errorLogger } = require('./middlewares/logger');


require('./utils/processHandlers');

const { errorHandler } = require('./middlewares/error-handler');

const mainRouter = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const { getItems } = require('./controllers/clothingItems');

const auth = require('./middlewares/auth');

const { validateUserBody, validateLoginBody } = require('./middlewares/validation');

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

app.use(requestLogger);

// server crash testing
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// public routes
app.post('/signin', validateLoginBody, login);
app.post('/signup', validateUserBody, createUser);

// anyone can see default items
app.get('/items', getItems);

// authentication
app.use(auth);

// protected routes
app.use("/", mainRouter);

app.use(errorLogger);
// celebrate error handler
app.use(errors());
// centralized error handler
app.use(errorHandler);


app.listen(PORT, () => logger.info(`Server is running on port ${PORT}.`));
