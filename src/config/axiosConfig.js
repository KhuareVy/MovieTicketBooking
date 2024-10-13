/* eslint-disable no-unused-vars */
import axios from 'axios';

// eslint-disable-next-line no-undef
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AxiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 2000,
  headers: {'Content-Type': 'application/json' }
});

const _get = (url, config = {}) => {
  return AxiosInstance.get(url, config);
};
  
const _delete = (url, config = {}) => {
  return AxiosInstance.delete(url, config);
};
  
const _put = (url, data = {}, config = {}) => {
  return AxiosInstance.put(url, data, config);
};
  
const _post = (url, data = {}, config = {}) => {
  return AxiosInstance.post(url, data, config);
};

export { _get, _delete, _put, _post, AxiosInstance };