const RequestApi = {
  USER_DATA: 'api/user',
  USER_TASKS: (count, _id) => `api/tasks?limit=${count}&_id=${_id}`
};

export default RequestApi;
