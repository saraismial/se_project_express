const logger = require('./logger');

// global level error handling
process.on('unhandledRejection', (reason) => {
  logger.error(`UNHANDLED REJECTION: ${reason?.stack || reason}`);
});
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION: ${err.stack || err}`);
});