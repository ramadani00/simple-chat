const { LOG_LEVEL } = require('./config');

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLevel = logLevels[LOG_LEVEL];

module.exports = {
  error: (msg) => logLevels.error <= currentLevel && console.error(`[ERROR] ${msg}`),
  warn: (msg) => logLevels.warn <= currentLevel && console.warn(`[WARN] ${msg}`),
  info: (msg) => logLevels.info <= currentLevel && console.log(`[INFO] ${msg}`),
  debug: (msg) => logLevels.debug <= currentLevel && console.debug(`[DEBUG] ${msg}`)
};