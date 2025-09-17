import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add request logging here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;

        case 403:
          // Forbidden
          if (data.message) {
            toast.error(data.message);
          }
          break;

        case 404:
          // Not found
          if (data.message) {
            toast.error(data.message);
          }
          break;

        case 422:
          // Validation error
          if (data.details && Array.isArray(data.details)) {
            data.details.forEach(detail => toast.error(detail));
          } else if (data.message) {
            toast.error(data.message);
          }
          break;

        case 429:
          // Rate limit
          toast.error('Too many requests. Please try again later.');
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          toast.error('Server error. Please try again later.');
          break;

        default:
          // Other errors
          if (data.message) {
            toast.error(data.message);
          } else {
            toast.error('An unexpected error occurred.');
          }
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    } else {
      // Other errors
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;