import apiInstance from '../../config/apiInstance';
import RequestApi from '../../api/api';
import errorTypes from '../../utils/error/errorTypes';
import { signIn, signInFailure, signInSuccess } from './signInReducer';
import history from '../../utils/history/history';

export default userData => async dispatch => {
  dispatch(signIn());
  try {
    const response = await apiInstance.post(RequestApi.SIGN_IN, userData);
    if (response.data.statusCode) {
      dispatch(signInSuccess(userData));
      history.push('/login');
    }
  } catch (e) {
    dispatch(signInFailure(errorTypes.SIGN_IN_ERROR));
  }
};
