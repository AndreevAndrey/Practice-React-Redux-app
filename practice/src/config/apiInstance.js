import * as axios from 'axios';

const BASE_URL = 'http://192.168.100.3:5000/';

const apiInstance = axios.create({
  baseURL: BASE_URL
});

export default apiInstance;
