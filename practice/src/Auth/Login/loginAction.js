import apiInstance from '../../config/apiInstance';
import RequestApi from '../../api/api';
import { login, loginFailure, loginSuccess } from './loginReducer';
import errorTypes from '../../utils/error/errorTypes';

export default userData => async dispatch => {
  dispatch(login());
  try {
    const response = await apiInstance.post(RequestApi.LOG_IN, userData);
    if (response.data.statusCode) {
      const { token, refreshToken } = response.data.data;
      const tokens = { token, refreshToken };
      dispatch(loginSuccess(tokens));
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  } catch (e) {
    dispatch(loginFailure(errorTypes.LOG_IN_ERROR));
  }
};
