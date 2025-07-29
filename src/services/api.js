import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Get token from local storage
const getToken = () => localStorage.getItem('token');

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://vercel-backend-taupe.vercel.app/api"
,
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

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Register Error:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Progress API calls
export const getProgress = async (videoId) => {
  try {
    const response = await api.get(`/progress/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Get Progress Error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProgress = async (videoId, interval, videoDuration) => {
  try {
    const response = await api.post(`/progress/${videoId}`, {
      videoId,
      interval,
      videoDuration,
    });
    return response.data;
  } catch (error) {
    console.error('Update Progress Error:', error.response?.data || error.message);
    throw error;
  }
}; 
