import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

let token = null;


export const setBearerToken = (newToken) => {
  token = newToken;
};


api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
