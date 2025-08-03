import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://08abfbc34259.ngrok-free.app/api',
  headers: {
    // This is the crucial header to add
    'ngrok-skip-browser-warning': 'true'
  }
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
