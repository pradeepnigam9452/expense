import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import * as expenseService from '../services/expenseService';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [savingGoal, setSavingGoal] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await expenseService.getAllExpenses(token);
      setExpenses(data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    if (!token) return;
    try {
      const data = await expenseService.addExpense(expenseData, token);
      setExpenses([data.expense, ...expenses]);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateExpense = async (id, expenseData) => {
    if (!token) return;
    try {
      const data = await expenseService.updateExpense(id, expenseData, token);
      setExpenses(expenses.map(exp => exp._id === id ? data.expense : exp));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    if (!token) return;
    try {
      await expenseService.deleteExpense(id, token);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (error) {
      throw error;
    }
  };

  const fetchIncome = async () => {
    if (!token) return;
    try {
      const data = await expenseService.getAllIncome(token);
      setIncome(data.incomes);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  const fetchSavingGoal = async () => {
    if (!token) return;
    try {
      const data = await expenseService.getActiveGoal(token);
      setSavingGoal(data.goal);
    } catch (error) {
      console.error('Error fetching goal:', error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        income,
        savingGoal,
        loading,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        fetchIncome,
        fetchSavingGoal,
        setSavingGoal
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};