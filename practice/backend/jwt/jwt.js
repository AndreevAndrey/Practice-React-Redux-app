const jwt = require('jsonwebtoken');

exports.getAccessToken = id => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_LIFE
  });
};
exports.getRefreshToken = id => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE
  });
};
