import React from 'react';
import PropTypes from 'prop-types';
import style from './task.module.scss';

const propTypes = {
  task: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  dataAdded: PropTypes.string.isRequired
};

const Task = ({ task, name, avatar, _id, deleteTask, dataAdded, setItem }) => (
  <div className={style.task}>
    <div className={style.user}>
      <img src={avatar} alt='avatar' />
      <p>{name}</p>
    </div>
    <div className={style.text}>
      <p onClick={() => setItem(_id, task)}>{task}</p>
      <div className={style.buttonData}>
        <p>Added: {dataAdded}</p>
        <button onClick={() => deleteTask(_id)}>Delete task</button>
      </div>
      <div />
    </div>
  </div>
);

Task.propTypes = propTypes;

export default Task;
