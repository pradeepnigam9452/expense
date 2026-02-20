import api from './api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateProfile = async (userData, token) => {
  const response = await api.put('/users/profile', userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteAccount = async (token) => {
  const response = await api.delete('/users/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};