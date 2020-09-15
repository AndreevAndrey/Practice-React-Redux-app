const USER_UPDATE = 'USER_UPDATE';
const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
const USER_UPDATE_FAILURE = 'PROFILE_FORM_FAILURE';
const FETCH_PROFILE = 'FETCH_PROFILE';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

const initialState = {
  user: {
    name: '',
    avatar: '',
    _id: ''
  },
  isFetching: false,
  errorMessage: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        user: { ...state.user },
        isFetching: true,
        errorMessage: ''
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.data },
        isFetching: false,
        errorMessage: ''
      };
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    case FETCH_PROFILE: {
      return {
        ...state,
        user: { ...state.user },
        isFetching: true,
        errorMessage: ''
      };
    }
    case FETCH_PROFILE_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, ...action.profile },
        isFetching: false
      };
    }
    case FETCH_PROFILE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    }
    default:
      return state;
  }
};

export const userUpdate = () => ({ type: USER_UPDATE });
export const userUpdateSuccess = data => ({ type: USER_UPDATE_SUCCESS, data });
export const userUpdateFailure = errorMessage => ({
  type: USER_UPDATE_FAILURE,
  errorMessage
});
export const fetchProfile = () => ({ type: FETCH_PROFILE });
export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  profile
});
export const fetchProfileFailure = errorMessage => ({
  type: FETCH_PROFILE_FAILURE,
  errorMessage
});

export default profileReducer;
