const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');

const logger = require('./utils/logger');

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => logger.info("Connected to the Database."))
  .catch((error) => logger.error(error))
;

// middleware to parse json body
app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: "69125c0087edaa917171bec5" };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}.`));
