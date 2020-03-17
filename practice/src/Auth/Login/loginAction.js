import apiInstance from '../../config/apiInstance';
import RequestApi from '../../api/api';
import { login, loginFailure, loginSuccess } from './loginReducer';
import errorTypes from '../../utils/error/errorTypes';
import history from '../../utils/history/history';

export default userData => async dispatch => {
  dispatch(login());
  try {
    const response = await apiInstance.post(RequestApi.LOG_IN, userData);
    if (response.data.statusCode) {
      dispatch(loginSuccess());
      const { token, refreshToken } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    }
  } catch (e) {
    dispatch(loginFailure(errorTypes.LOG_IN_ERROR));
  }
};
