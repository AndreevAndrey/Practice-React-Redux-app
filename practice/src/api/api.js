const RequestApi = {
  USER_DATA: 'api/user',
  USER_TASKS: (count = '', _id = '') => `api/tasks?limit=${count}&_id=${_id}`,
  LOG_IN: 'api/auth/login',
  SIGN_IN: 'api/auth/sign-in',
  TOKEN: 'api/token'
};

export default RequestApi;
