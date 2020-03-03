const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const User = require('../models/users');
const ResponseData = require('../responseData/responseData');
const Error = require('../responseData/errorTypes');
const Success = require('../responseData/successTypes');
const Code = require('../responseData/resultCode');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne();
    res
      .status(HttpStatus.OK)
      .json(new ResponseData(Success.COMPLETED, Code.SUCCESS, user));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

router.put('/', async (req, res) => {
  try {
    if (req.body._id) {
      const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {
        new: true
      });
      return res
        .status(HttpStatus.OK)
        .json(
          new ResponseData(Success.UPDATED_USER, Code.SUCCESS, updatedUser)
        );
    }
    const createUser = new User({
      name: req.body.name,
      avatar: req.body.avatar
    });
    await createUser.save();
    return res
      .status(HttpStatus.CREATED)
      .json(new ResponseData(Success.CREATE_USER, Code.SUCCESS, createUser));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

module.exports = router;
