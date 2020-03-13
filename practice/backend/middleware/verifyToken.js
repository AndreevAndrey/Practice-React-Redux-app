const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const Error = require('../responseData/errorTypes');
const Code = require('../responseData/resultCode');
const ResponseData = require('../responseData/responseData');

module.exports = async (req, res, next) => {
  const OPTIONS = 'OPTIONS';
  if (req.method === OPTIONS) {
    return next();
  }
  try {
    const token = req.headers.autorization.split(' ')[1];
    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new ResponseData(Error.UNAUTHORIZED, Code.ERROR));
    }

    const user = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new ResponseData(Error.UNAUTHORIZED, Code.ERROR));
    }
    req.user = user;
    next();
  } catch (e) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json(new ResponseData(Error.UNAUTHORIZED, Code.ERROR));
  }
};
