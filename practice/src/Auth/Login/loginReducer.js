const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const initialState = {
  token: '',
  refreshToken: '',
  isFetching: false,
  errorMessage: ''
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        errorMessage: '',
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.tokens,
        isFetching: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export const login = () => ({ type: LOGIN });
export const loginSuccess = tokens => ({ type: LOGIN_SUCCESS, tokens });
export const loginFailure = errorMessage => ({
  type: LOGIN_FAILURE,
  errorMessage
});

export default loginReducer;
