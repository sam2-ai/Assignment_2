import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If token is expired, try to refresh it
      try {
        const refreshResponse = await api.post('/api/refresh');
        const newToken = refreshResponse.data.token;
        localStorage.setItem('token', newToken);
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const registerUser = async (userData) => {
  const response = await api.post('/api/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/api/logout');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/api/profile');
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post('/api/refresh');
  return response.data;
};

// Health API functions
export const getHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const getDetailedHealth = async () => {
  const response = await api.get('/health/detailed');
  return response.data;
};

// User API functions
export const updateProfile = async (userData) => {
  const response = await api.put('/api/profile', userData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put('/api/change-password', passwordData);
  return response.data;
};

// Document API functions (for future use)
export const uploadDocument = async (formData) => {
  const response = await api.post('/api/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getDocuments = async (params = {}) => {
  const response = await api.get('/api/documents', { params });
  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`/api/documents/${id}`);
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/api/documents/${id}`);
  return response.data;
};

// Analytics API functions (for dashboard)
export const getDashboardStats = async () => {
  const response = await api.get('/api/analytics/dashboard');
  return response.data;
};

export const getUsageStats = async (period = '7d') => {
  const response = await api.get(`/api/analytics/usage?period=${period}`);
  return response.data;
};

export default api;