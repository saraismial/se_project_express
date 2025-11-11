/* eslint-disable no-console */
const logger = {
  info: (msg) => console.log(`[Info] ${msg}`),
  error: (msg) => console.error(`[Error] ${msg}`)
};

module.exports = logger;