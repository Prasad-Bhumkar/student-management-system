import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:3001'; // Ensure this URL is correct

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (!error.response) {
      console.error('Network error:', error.message);
    } else {
      console.error('API error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
