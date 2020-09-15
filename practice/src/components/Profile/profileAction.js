import apiInstance from '../../config/apiInstance';
import RequestApi from '../../api/api';
import errorTypes from '../../utils/error/errorTypes';

import {
  fetchProfile as fetchProfilePending,
  fetchProfileSuccess,
  fetchProfileFailure,
  userUpdate,
  userUpdateSuccess,
  userUpdateFailure
} from './profileReducer';

export const fetchProfile = () => async dispatch => {
  dispatch(fetchProfilePending());
  try {
    const response = await apiInstance.get(RequestApi.USER_DATA);
    if (response.data.statusCode) {
      dispatch(fetchProfileSuccess(response.data.data));
    }
  } catch (e) {
    dispatch(fetchProfileFailure(errorTypes.LOADING_ERROR));
  }
};

export const updateProfile = userData => async dispatch => {
  dispatch(userUpdate());
  try {
    const user = {
      name: userData.name,
      avatar: userData.avatar
    };
    const response = await apiInstance.put(RequestApi.USER_DATA, user);
    if (response.data.statusCode) {
      dispatch(userUpdateSuccess(response.data.data));
    }
  } catch (e) {
    dispatch(userUpdateFailure(errorTypes.LOADING_ERROR));
  }
};
