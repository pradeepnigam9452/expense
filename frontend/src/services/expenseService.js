import api from './api';

// Expense APIs
export const addExpense = async (expenseData, token) => {
  const response = await api.post('/expenses', expenseData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllExpenses = async (token, filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/expenses?${params}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getExpenseById = async (id, token) => {
  const response = await api.get(`/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateExpense = async (id, expenseData, token) => {
  const response = await api.put(`/expenses/${id}`, expenseData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteExpense = async (id, token) => {
  const response = await api.delete(`/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Income APIs
export const addIncome = async (incomeData, token) => {
  const response = await api.post('/income', incomeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllIncome = async (token) => {
  const response = await api.get('/income', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateIncome = async (id, incomeData, token) => {
  const response = await api.put(`/income/${id}`, incomeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteIncome = async (id, token) => {
  const response = await api.delete(`/income/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Goal APIs
export const setGoal = async (goalData, token) => {
  const response = await api.post('/goals', goalData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getActiveGoal = async (token) => {
  const response = await api.get('/goals/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateGoal = async (id, goalData, token) => {
  const response = await api.put(`/goals/${id}`, goalData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Analysis APIs
export const getDashboard = async (token) => {
  const response = await api.get('/analysis/dashboard', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getSavingAnalysis = async (token) => {
  const response = await api.get('/analysis/saving-feasibility', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};