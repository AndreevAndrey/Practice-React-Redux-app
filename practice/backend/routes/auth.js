const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const HttpStatus = require('http-status-codes');
const { getAccessToken, getRefreshToken } = require('../jwt/jwt');
const User = require('../models/users');
const Session = require('../models/session');
const ResponseData = require('../responseData/responseData');
const Error = require('../responseData/errorTypes');
const Success = require('../responseData/successTypes');
const Code = require('../responseData/resultCode');

const router = Router();
const PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 8;

router.post(
  '/sign-in',
  [
    check('email', Error.EMAIL_INVALID).isEmail(),
    check('password', Error.SHORT_PASSWORD(PASSWORD_LENGTH))
      .isLength({
        min: PASSWORD_LENGTH
      })
      .withMessage(`Must be at least ${PASSWORD_LENGTH} chars long`)
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const { msg: message } = result.errors[0];
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseData(message, Code.ERROR));
      }
      const { email, password, ...rest } = req.body;

      const userExist = await User.findOne({ email });
      if (!!userExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseData(Error.USER_EXIST, Code.ERROR));
      }

      const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = new User({ email, password: hashPassword, ...rest });
      await user.save();
      res
        .status(HttpStatus.CREATED)
        .json(new ResponseData(Success.CREATED_USER, Code.SUCCESS));
    } catch (e) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
    }
  }
);

router.post(
  '/login',
  [
    check('email', Error.EMAIL_INVALID).isEmail(),
    check('password', Error.SHORT_PASSWORD(PASSWORD_LENGTH)).isLength({
      min: PASSWORD_LENGTH
    })
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const { msg: message } = result.errors[0];
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseData(message, Code.ERROR));
      }
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseData(Error.EMAIL_INVALID, Code.ERROR));
      }

      const validPassword = await bcrypt.compare(password, userExist.password);
      if (!validPassword) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseData(Error.PASSWORD_INVALID, Code.ERROR));
      }

      const token = getAccessToken(userExist.id);
      const refreshToken = getRefreshToken(userExist.id);
      const session = await Session.findOne({ id: userExist.id });
      if (!session) {
        const newSession = new Session({
          id: userExist.id,
          token,
          refreshToken
        });
        await newSession.save();
      } else {
        session.token = token;
        session.refreshToken = refreshToken;
        await session.save();
      }
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
  }
);

module.exports = router;
