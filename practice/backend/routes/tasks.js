const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const Tasks = require('../models/tasks');
const ResponseData = require('../responseData/responseData');
const Error = require('../responseData/errorTypes');
const Success = require('../responseData/successTypes');
const Code = require('../responseData/resultCode');
const verifyToken = require('../middleware/verifyToken');

const router = Router();

const CHUNK_TASKS = 8;

router.get('/', verifyToken, async (req, res) => {
  try {
    const { limit } = req.query;
    const skip = limit || 0;
    const userTasks = await Tasks.findOne(
      { _id: req.user.id },
      { tasks: { $slice: [skip * CHUNK_TASKS, CHUNK_TASKS] } }
    ).populate('_id', ['avatar', 'name']);
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

router.post('/', verifyToken, async (req, res) => {
  try {
    const tasksCollection = await Tasks.findOne({ _id: req.user.id });
    const { task } = req.body;
    if (!!tasksCollection) {
      tasksCollection.tasks.push({ task });
      await tasksCollection.save();
      return res
        .status(HttpStatus.OK)
        .json(new ResponseData(Success.CREATED_TASK, Code.SUCCESS));
    }
    const newTask = new Tasks({
      _id: req.user.id,
      tasks: [{ task }]
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

router.put('/', verifyToken, async (req, res) => {
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

router.delete('/', verifyToken, async (req, res) => {
  try {
    const { _id } = req.query;
    await Tasks.updateOne({ 'tasks._id': _id }, { $pull: { tasks: { _id } } });
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
