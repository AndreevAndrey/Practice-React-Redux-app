import * as axios from 'axios';
import RequestApi from '../api/api';
import history from '../utils/history/history';
import routePath from '../components/Routes/routePath';

const BASE_URL = 'http://192.168.100.6:5000/';

const apiInstance = axios.create({
  baseURL: BASE_URL
});

const handlerRequest = async request => {
  if (request.url === RequestApi.LOG_IN) {
    return request;
  }
  const token = localStorage.getItem('token');

  if (token) {
    request.headers.Autorization = `Bearer ${token}`;
  }
  return request;
};

const handlerErrorResponse = async error => {
  if (
    error.response.status === 401 &&
    error.config.url !== `${BASE_URL}${RequestApi.LOG_IN}`
  ) {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await apiInstance.post(RequestApi.TOKEN, { refreshToken });
    if (res && res.status === 200) {
      const { token, refreshToken } = res.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
      return apiInstance(error.config);
    }
    history.push(routePath.LOG_IN);
  }
};

apiInstance.interceptors.request.use(request => handlerRequest(request));
apiInstance.interceptors.response.use(
  response => response,
  error => handlerErrorResponse(error)
);

export default apiInstance;
