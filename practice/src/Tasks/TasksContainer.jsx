import React, { Component } from 'react';
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

class TasksContainer extends Component {
  state = {
    isToggle: true,
    newTask: '',
    id: ''
  };

  componentDidMount() {
    this.props.fetchUserTasks();
  }

  onSubmit = ({ task }) => {
    const { addUsersTask, fetchUserTasks } = this.props;
    addUsersTask(task).then(() => fetchUserTasks());
  };

  deleteTask = taskId => {
    const { deleteUsersTask, fetchUserTasks } = this.props;
    deleteUsersTask(taskId).then(() => fetchUserTasks());
  };

  setToggle = () => {
    this.setState(({ isToggle }) => ({ isToggle: !isToggle, id: '' }));
  };

  changeInputValue = e => {
    const event = e.target;
    this.setState({ newTask: event.value });
  };

  updateTask = () => {
    const { newTask, id } = this.state;
    const { updateUsersTask, fetchUserTasks } = this.props;
    updateUsersTask(newTask, id).then(() => fetchUserTasks());
  };

  setItem = (id, task) => {
    this.setState({ id, newTask: task });
  };

  render() {
    const {
      tasks: { tasks, isFetching }
    } = this.props;
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
            deleteTask={this.deleteTask}
            setItem={this.setItem}
          />
        </div>
      );
    });
    if (this.state.id) {
      return (
        <form onBlur={this.updateTask} className={style.changeTask}>
          <TextField
            autoFocus
            label='Update task'
            inputProps={{
              maxLength: 200
            }}
            type='text'
            value={this.state.newTask}
            onChange={this.changeInputValue}
            onBlur={this.setToggle}
          />
        </form>
      );
    }
    return (
      <div>
        <TaskForm onSubmit={this.onSubmit} />
        <div className={style.tasks}>{Tasks}</div>
        <div>{isFetching && <CircularProgress />}</div>
      </div>
    );
  }
}

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
