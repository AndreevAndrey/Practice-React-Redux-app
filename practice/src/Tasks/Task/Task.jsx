import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import style from './task.module.scss';

const propTypes = {
  task: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  _id: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  dataAdded: PropTypes.string.isRequired
};

const defaultProps = {
  avatar: ''
};

const Task = ({ task, name, avatar, _id, deleteTask, dataAdded, setItem }) => (
  <div className={style.task}>
    <div className={style.user}>
      <Avatar src={avatar} alt='avatar' />
      <p>{name}</p>
    </div>
    <div className={style.text}>
      <p onClick={() => setItem(_id, task)}>{task}</p>
      <div className={style.buttonData}>
        <p>Added: {dataAdded}</p>
        <Button onClick={() => deleteTask(_id)}>Delete task</Button>
      </div>
      <div />
    </div>
  </div>
);

Task.propTypes = propTypes;
Task.defaultProps = defaultProps;

export default Task;
