const SIGN_IN = 'SIGN_IN';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

const initialState = {
  isFetching: false,
  errorMessage: '',
  user: ''
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        errorMessage: '',
        isFetching: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.data,
        isFetching: false
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export const signIn = () => ({ type: SIGN_IN });
export const signInSuccess = data => ({ type: SIGN_IN_SUCCESS, data });
export const signInFailure = errorMessage => ({
  type: SIGN_IN_FAILURE,
  errorMessage
});

export default signInReducer;
