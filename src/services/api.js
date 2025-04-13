import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Get token from local storage
const getToken = () => localStorage.getItem('token');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Progress API calls
export const getProgress = async (videoId) => {
  const response = await api.get(`/progress/${videoId}`);
  return response.data;
};

export const updateProgress = async (videoId, interval, videoDuration) => {
  const response = await api.post(`/progress/${videoId}`, {
    videoId,
    interval,
    videoDuration,
  });
  return response.data;
}; 