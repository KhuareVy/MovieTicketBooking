/* eslint-disable no-unused-vars */
import axios from 'axios';

// eslint-disable-next-line no-undef
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = localStorage.getItem('token');
const AUTH_TOKEN = `Bearer ${TOKEN}`;
const PROTECTED_HEADERS = {
  headers: {
    Authorization: AUTH_TOKEN,
  },
};
const PUBLIC_URL = ['/auth/login', '/auth/register'];
const PROTECTED_URL_PATTERNS = [
  /^\/showtimes\/[^/]+\/seats$/,
  /^\/bookings\/[^/]+$/,
  /^\/bookings$/,
  /^\/bookings\/history$/,
];

const AxiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 2000,
  headers: {'Content-Type': 'application/json' }
});

const isProtectedUrl = (url) => {
  return PROTECTED_URL_PATTERNS.some(pattern => pattern.test(url));
};

const _get = (url, config = {}) => {
  if (isProtectedUrl(url)) {
    return AxiosInstance.get(url, PROTECTED_HEADERS);
  }
  return AxiosInstance.get(url, config);
};

const _delete = (url, config = {}) => {
  return AxiosInstance.delete(url, config);
};

const _put = (url, data = {}, config = {}) => {
  return AxiosInstance.put(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
  if (PUBLIC_URL.includes(url)) {
    return AxiosInstance.post(url, data);
  } else if (isProtectedUrl(url)) {
    return AxiosInstance.post(url, data, PROTECTED_HEADERS);
  } else {
    return AxiosInstance.post(url, data, config);
  }
};

export { _get, _delete, _put, _post, AxiosInstance };