require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  WS_PATH: process.env.WS_PATH || '/ws',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};