const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const User = require('../models/users');
const ResponseData = require('../responseData/responseData');
const Error = require('../responseData/errorTypes');
const Success = require('../responseData/successTypes');
const Code = require('../responseData/resultCode');
const verifyToken = require('../middleware/verifyToken');

const router = Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res
      .status(HttpStatus.OK)
      .json(new ResponseData(Success.COMPLETED, Code.SUCCESS, user));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true
    });
    return res
      .status(HttpStatus.OK)
      .json(new ResponseData(Success.UPDATED_USER, Code.SUCCESS, updateUser));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

module.exports = router;
