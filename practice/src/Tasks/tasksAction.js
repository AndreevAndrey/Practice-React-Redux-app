import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
  fetchTasks,
  fetchTasksFailure,
  fetchTasksSuccess
} from './tasksReducer';
import apiInstance from '../config/apiInstance';
import RequestApi from '../api/api';

export const fetchUserTasks = () => async dispatch => {
  dispatch(fetchTasks());
  const response = await apiInstance.get(RequestApi.USER_TASKS());
  if (response.data.statusCode) {
    dispatch(fetchTasksSuccess(response.data.data));
  } else {
    dispatch(fetchTasksFailure());
  }
};

export const addUsersTask = task => async dispatch => {
  dispatch(addTask());
  const response = await apiInstance.post(RequestApi.USER_TASKS(), {
    task
  });
  if (response.data.statusCode) {
    dispatch(addTaskSuccess());
  } else {
    dispatch(addTaskFailure());
  }
};

export const deleteUsersTask = taskId => async dispatch => {
  dispatch(addTask());
  const response = await apiInstance.delete(RequestApi.USER_TASKS('', taskId));
  if (response.data.statusCode) {
    dispatch(addTaskSuccess());
  } else {
    dispatch(addTaskFailure());
  }
};
