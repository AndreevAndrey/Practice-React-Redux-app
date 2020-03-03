const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const Tasks = require('../models/tasks');
const User = require('../models/users');
const ResponseData = require('../responseData/responseData');
const Error = require('../responseData/errorTypes');
const Success = require('../responseData/successTypes');
const Code = require('../responseData/resultCode');

const router = Router();

const CHUNK_TASKS = 8;

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const skip = limit || 0;
    const userTasks = await Tasks.findOne(
      {},
      { tasks: { $slice: [skip * CHUNK_TASKS, CHUNK_TASKS] } }
    ).populate('tasks.user', ['avatar', 'name']);
    if (!userTasks) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .json(new ResponseData(Success.COMPLETED, Code.SUCCESS));
    }
    const { tasks } = userTasks;
    res
      .status(HttpStatus.OK)
      .json(new ResponseData(Success.COMPLETED, Code.SUCCESS, tasks));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

router.post('/', async (req, res) => {
  try {
    const tasksCollection = await Tasks.findOne();
    const { task } = req.body;
    const user = await User.findOne();
    const userTask = { task, user };
    if (!!tasksCollection) {
      tasksCollection.tasks.push(userTask);
      await tasksCollection.save();
      return res
        .status(HttpStatus.OK)
        .json(new ResponseData(Success.CREATED_TASK, Code.SUCCESS));
    }
    const newTask = new Tasks({
      tasks: [userTask]
    });
    await newTask.save();

    return res
      .status(HttpStatus.CREATED)
      .json(new ResponseData(Success.CREATED_TASK, Code.SUCCESS));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

router.put('/', async (req, res) => {
  try {
    const { newTask, taskId } = req.body;
    await Tasks.updateOne(
      { 'tasks._id': taskId },
      { $set: { 'tasks.$.task': newTask } }
    );
    return res
      .status(HttpStatus.OK)
      .json(new ResponseData(Success.UPDATED_TASK, Code.SUCCESS));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.query;
    await Tasks.updateOne({}, { $pull: { tasks: { _id } } });
    return res
      .status(HttpStatus.OK)
      .json(new ResponseData(Success.DELETED_TASK, Code.SUCCESS));
  } catch (e) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ResponseData(Error.SERVER_ERROR, Code.ERROR));
  }
});

module.exports = router;
