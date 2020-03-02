import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './tasks.module.scss';
import Task from './Task/Task';
import Preloader from '../Common/Preloader/Preloader';
import TaskForm from './Task/TaskForm';
import { addUsersTask, deleteUsersTask, fetchUserTasks } from './tasksAction';

const propTypes = {
  addUsersTask: PropTypes.func.isRequired,
  fetchUserTasks: PropTypes.func.isRequired,
  deleteUsersTask: PropTypes.func.isRequired,
  tasks: PropTypes.shape({
    tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    isFetching: PropTypes.bool.isRequired
  }).isRequired
};

class TasksContainer extends Component {
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
          />
        </div>
      );
    });
    return (
      <div>
        <TaskForm onSubmit={this.onSubmit} />
        <div className={style.tasks}>{Tasks}</div>
        <div>{isFetching && <Preloader />}</div>
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
  deleteUsersTask
})(TasksContainer);
