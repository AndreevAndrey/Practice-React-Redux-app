import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField } from '@material-ui/core';
import style from './tasks.module.scss';
import Task from './Task/Task';
import TaskForm from './Task/TaskForm';
import {
  fetchUserTasks,
  addUsersTask,
  updateUsersTask,
  deleteUsersTask
} from './tasksAction';

const propTypes = {
  addUsersTask: PropTypes.func.isRequired,
  fetchUserTasks: PropTypes.func.isRequired,
  updateUsersTask: PropTypes.func.isRequired,
  deleteUsersTask: PropTypes.func.isRequired,
  tasks: PropTypes.shape({
    tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    isFetching: PropTypes.bool.isRequired
  }).isRequired
};

const TasksContainer = ({
  fetchUserTasks,
  addUsersTask,
  updateUsersTask,
  deleteUsersTask,
  tasks: { tasks, isFetching }
}) => {
  const [isToggle, setIsToggle] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetchUserTasks();
    }

    fetchData();
  }, [fetchUserTasks]);

  const onSubmit = ({ task }) => {
    addUsersTask(task).then(() => fetchUserTasks());
  };

  const deleteTask = taskId => {
    deleteUsersTask(taskId).then(() => fetchUserTasks());
  };

  const setToggle = () => {
    setIsToggle(!isToggle);
    setId('');
  };

  const changeInputValue = e => {
    const event = e.target;
    setNewTask(event.value);
  };

  const updateTask = () => {
    updateUsersTask(newTask, id).then(() => fetchUserTasks());
  };

  const setItem = (id, task) => {
    setId(id);
    setNewTask(task);
  };

  const Tasks = tasks.map(({ task, _id, addedTime, user }) => {
    const dataAdded = addedTime.split('T')[0];
    return (
      <div key={_id}>
        <Task
          task={task}
          name={user.name}
          avatar={user.avatar}
          dataAdded={dataAdded}
          _id={_id}
          deleteTask={deleteTask}
          setItem={setItem}
        />
      </div>
    );
  });
  if (id) {
    return (
      <form onBlur={updateTask} className={style.changeTask}>
        <TextField
          autoFocus
          label='Update task'
          inputProps={{
            maxLength: 200
          }}
          type='text'
          value={newTask}
          onChange={changeInputValue}
          onBlur={setToggle}
        />
      </form>
    );
  }
  return (
    <div>
      <TaskForm onSubmit={onSubmit} />
      <div className={style.tasks}>{Tasks}</div>
      <div>{isFetching && <CircularProgress />}</div>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => ({
  tasks
});

TasksContainer.propTypes = propTypes;

export default connect(mapStateToProps, {
  fetchUserTasks,
  addUsersTask,
  updateUsersTask,
  deleteUsersTask
})(TasksContainer);
