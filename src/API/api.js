import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://08abfbc34259.ngrok-free.app/api',
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
