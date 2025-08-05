import axios from 'axios';
// import { backendUrl } from '../config';
import { BASE_URL } from '../constants/Endpoints';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response || error)
);

export default apiClient;
