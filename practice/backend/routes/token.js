const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ResponseData = require('../responseData/responseData');
const Error = require('../responseData/errorTypes');
const Success = require('../responseData/successTypes');
const Code = require('../responseData/resultCode');
const Session = require('../models/session');
const { getAccessToken, getRefreshToken } = require('../jwt/jwt');

const router = Router();

router.post('/', async (req, res) => {
  try {
    let { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(new ResponseData(Error.UNAUTHORIZED, Code.ERROR));
    }
    const serverTokens = await Session.findOne({ refreshToken });
    if (!serverTokens) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(new ResponseData(Error.UNAUTHORIZED, Code.ERROR));
    }
    const verifyUser = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!verifyUser) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new ResponseData(Error.UNAUTHORIZED, Code.ERROR));
    }
    let { token } = serverTokens;
    token = getAccessToken(verifyUser.id);
    refreshToken = getRefreshToken(verifyUser.id);
    serverTokens.refreshToken = refreshToken;
    await serverTokens.save();
    res.status(HttpStatus.OK).json(
      new ResponseData(Success.AUTHENTICATE_USER, Code.SUCCESS, {
        token,
        refreshToken
      })
    );
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

module.exports = router;
