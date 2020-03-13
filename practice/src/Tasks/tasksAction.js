import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
  fetchTasks,
  fetchTasksFailure,
  fetchTasksSuccess,
  loadMoreSuccess
} from './tasksReducer';
import apiInstance from '../config/apiInstance';
import RequestApi from '../api/api';
import errorTypes from '../utils/error/errorTypes';

export const fetchUserTasks = () => async dispatch => {
  dispatch(fetchTasks());
  try {
    const response = await apiInstance.get(RequestApi.USER_TASKS());
    if (response.data.statusCode) {
      dispatch(fetchTasksSuccess(response.data.data));
    }
    if (response.status === 204) {
      dispatch(fetchTasksSuccess([]));
    }
  } catch (e) {
    dispatch(fetchTasksFailure(errorTypes.LOADING_ERROR));
  }
};

export const addUsersTask = task => async dispatch => {
  dispatch(addTask());
  try {
    const response = await apiInstance.post(RequestApi.USER_TASKS(), {
      task
    });
    if (response.data.statusCode) {
      dispatch(addTaskSuccess());
    }
  } catch (e) {
    dispatch(addTaskFailure(errorTypes.LOADING_ERROR));
  }
};
export const updateUsersTask = (newTask, taskId) => async dispatch => {
  dispatch(addTask());
  try {
    const body = {
      newTask,
      taskId
    };
    const response = await apiInstance.put(RequestApi.USER_TASKS(), body);
    if (response.data.statusCode) {
      dispatch(addTaskSuccess());
    }
  } catch (e) {
    dispatch(addTaskFailure(errorTypes.LOADING_ERROR));
  }
};

export const deleteUsersTask = taskId => async dispatch => {
  dispatch(addTask());
  try {
    const response = await apiInstance.delete(
      RequestApi.USER_TASKS('', taskId)
    );
    if (response.data.statusCode) {
      dispatch(addTaskSuccess());
    }
  } catch (e) {
    dispatch(addTaskFailure(errorTypes.LOADING_ERROR));
  }
};

export const loadMore = count => async dispatch => {
  dispatch(addTask());
  try {
    const response = await apiInstance.get(RequestApi.USER_TASKS(count));
    if (response.data.statusCode) {
      dispatch(loadMoreSuccess(response.data.data, count));
    }
  } catch (e) {
    dispatch(addTaskFailure(errorTypes.LOADING_ERROR));
  }
};
