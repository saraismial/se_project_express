const logger = require('../utils/logger');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } = require('../utils/errors');

// central error handling
const errorHandler = ((err, req, res, next) => {
  logger.error(err.stack || err);

  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;

  return res.status(status).send({ message });
})

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  errorHandler
};