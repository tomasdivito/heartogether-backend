require('dotenv').config();
const path = require('path');

module.exports = {
  googleApplicationCredentials: path.join(__dirname, '../../', process.env.GOOGLE_APPLICATION_CREDENTIALS),
  port: process.env.PORT || 8001
};
