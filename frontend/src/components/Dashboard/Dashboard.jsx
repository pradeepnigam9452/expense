import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import * as expenseService from '../../services/expenseService';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Loader from '../Shared/Loader';
import ErrorMessage from '../Shared/ErrorMessage';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Income form
  const [incomeForm, setIncomeForm] = useState({ amount: '', source: '' });
  const [incomeError, setIncomeError] = useState('');
  
  // Expense form
  const [expenseForm, setExpenseForm] = useState({ amount: '', title: '', category: 'Food' });
  const [expenseError, setExpenseError] = useState('');
  
  // Goal form
  const [goalForm, setGoalForm] = useState({ targetAmount: '', duration: '' });
  const [goalError, setGoalError] = useState('');
  
  // Analysis data
  const [analysisData, setAnalysisData] = useState(null);

  const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const dashData = await expenseService.getDashboard(token);
      setDashboardData(dashData.data);
      
      // Fetch analysis data if goal exists
      try {
        const analysisResp = await expenseService.getSavingAnalysis(token);
        setAnalysisData(analysisResp.analysis);
      } catch (analysisErr) {
        console.log('No analysis available yet');
      }
      
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    setIncomeError('');
    
    if (!incomeForm.amount || !incomeForm.source) {
      setIncomeError('Please fill all fields');
      return;
    }

    try {
      await expenseService.addIncome(
        { amount: parseFloat(incomeForm.amount), source: incomeForm.source },
        localStorage.getItem('token')
      );
      setIncomeForm({ amount: '', source: '' });
      await fetchDashboardData();
    } catch (err) {
      setIncomeError(err.response?.data?.message || 'Failed to add income');
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setExpenseError('');
    
    if (!expenseForm.amount || !expenseForm.title) {
      setExpenseError('Please fill all fields');
      return;
    }

    try {
      await expenseService.addExpense(
        { 
          amount: parseFloat(expenseForm.amount), 
          title: expenseForm.title,
          category: expenseForm.category
        },
        localStorage.getItem('token')
      );
      setExpenseForm({ amount: '', title: '', category: 'Food' });
      await fetchDashboardData();
    } catch (err) {
      setExpenseError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const handleSetGoal = async (e) => {
    e.preventDefault();
    setGoalError('');
    
    if (!goalForm.targetAmount || !goalForm.duration) {
      setGoalError('Please fill all fields');
      return;
    }

    try {
      await expenseService.setGoal(
        { 
          targetAmount: parseFloat(goalForm.targetAmount),
          duration: parseInt(goalForm.duration)
        },
        localStorage.getItem('token')
      );
      setGoalForm({ targetAmount: '', duration: '' });
      await fetchDashboardData();
    } catch (err) {
      setGoalError(err.response?.data?.message || 'Failed to set goal');
    }
  };


  if (loading) return <Loader />;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container-lg">
        {/* Header */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-primary">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-3 fs-5 text-muted">
            Manage your finances and track your progress
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        {dashboardData && (
          <>
            {/* Summary Cards */}
            <div className="row g-4 mb-5">
              {/* Total Income Card */}
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card shadow-sm border-success h-100">
                  <div className="card-body">
                    <p className="text-muted text-uppercase small fw-semibold mb-2">Total Income</p>
                    <p className="display-6 fw-bold text-success mb-3">
                      ₹{dashboardData.totalIncome?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-muted small">+{dashboardData.incomeCount} transactions</p>
                  </div>
                </div>
              </div>

              {/* Total Expenses Card */}
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card shadow-sm border-danger h-100">
                  <div className="card-body">
                    <p className="text-muted text-uppercase small fw-semibold mb-2">Total Expenses</p>
                    <p className="display-6 fw-bold text-danger mb-3">
                      ₹{dashboardData.totalExpenses?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-muted small">+{dashboardData.expenseCount} transactions</p>
                  </div>
                </div>
              </div>

              {/* Current Savings Card */}
              <div className="col-12 col-md-6 col-lg-3">
                <div className={`card shadow-sm h-100 ₹{dashboardData.currentSavings >= 0 ? 'border-info' : 'border-danger'}`}>
                  <div className="card-body">
                    <p className="text-muted text-uppercase small fw-semibold mb-2">Current Savings</p>
                    <p className={`display-6 fw-bold mb-3 ₹{dashboardData.currentSavings >= 0 ? 'text-info' : 'text-danger'}`}>
                      ₹{dashboardData.currentSavings?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-muted small">Savings rate: {dashboardData.savingRate}%</p>
                  </div>
                </div>
              </div>

              {/* Active Goal Card */}
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card shadow-sm border-primary h-100">
                  <div className="card-body">
                    <p className="text-muted text-uppercase small fw-semibold mb-2">Active Goal</p>
                    <p className="display-6 fw-bold text-primary mb-3">
                      ₹{dashboardData.savingGoal?.targetAmount?.toFixed(2) || 'N/A'}
                    </p>
                    <p className="text-muted small">
                      {dashboardData.savingGoal ? `₹{dashboardData.savingGoal.duration} months target` : 'Set a goal'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Forms Section */}
            <div className="row g-4 mb-5">
              {/* Add Income Form */}
              <div className="col-12 col-lg-4">
                <div className="card shadow-sm border-success">
                  <div className="card-body">
                    <h3 className="card-title fw-bold mb-4">Add Income</h3>
                    {incomeError && <ErrorMessage message={incomeError} />}
                    <form onSubmit={handleAddIncome} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-semibold">Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          value={incomeForm.amount}
                          onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                          placeholder="0.00"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div>
                        <label className="form-label small fw-semibold">Source</label>
                        <input
                          type="text"
                          value={incomeForm.source}
                          onChange={(e) => setIncomeForm({ ...incomeForm, source: e.target.value })}
                          placeholder="e.g., Salary, Freelance"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success fw-semibold w-100"
                      >
                        Add Income
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Add Expense Form */}
              <div className="col-12 col-lg-4">
                <div className="card shadow-sm border-danger">
                  <div className="card-body">
                    <h3 className="card-title fw-bold mb-4">Add Expense</h3>
                    {expenseError && <ErrorMessage message={expenseError} />}
                    <form onSubmit={handleAddExpense} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-semibold">Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          value={expenseForm.amount}
                          onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                          placeholder="0.00"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div>
                        <label className="form-label small fw-semibold">Title</label>
                        <input
                          type="text"
                          value={expenseForm.title}
                          onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                          placeholder="e.g., Grocery Shopping"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div>
                        <label className="form-label small fw-semibold">Category</label>
                        <select
                          value={expenseForm.category}
                          onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                          className="form-select form-select-sm"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-danger fw-semibold w-100"
                      >
                        Add Expense
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Set Saving Goal Form */}
              <div className="col-12 col-lg-4">
                <div className="card shadow-sm border-primary">
                  <div className="card-body">
                    <h3 className="card-title fw-bold mb-4">Set Goal</h3>
                    {goalError && <ErrorMessage message={goalError} />}
                    <form onSubmit={handleSetGoal} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-semibold">Target Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          value={goalForm.targetAmount}
                          onChange={(e) => setGoalForm({ ...goalForm, targetAmount: e.target.value })}
                          placeholder="0.00"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div>
                        <label className="form-label small fw-semibold">Duration (Months)</label>
                        <input
                          type="number"
                          value={goalForm.duration}
                          onChange={(e) => setGoalForm({ ...goalForm, duration: e.target.value })}
                          placeholder="6"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary fw-semibold w-100"
                      >
                        Set Goal
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Analysis Section */}
            {analysisData && (
              <div className="card shadow-sm border-info mb-5">
                <div className="card-body">
                  <h2 className="card-title fw-bold mb-4">Savings Analysis</h2>
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <h3 className="fw-semibold text-dark mb-3">Your Goal Status</h3>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item px-0 d-flex justify-content-between">
                          <span className="text-dark">Monthly Savings</span>
                          <strong className="text-info">₹{analysisData.currentMonthlySavings?.toFixed(2)}</strong>
                        </div>
                        <div className="list-group-item px-0 d-flex justify-content-between">
                          <span className="text-dark">Required Monthly</span>
                          <strong className="text-primary">₹{analysisData.requiredMonthlySavings?.toFixed(2)}</strong>
                        </div>
                        <div className="list-group-item px-0 d-flex justify-content-between">
                          <span className="text-dark">Target Amount</span>
                          <strong className="text-success">₹{analysisData.targetAmount?.toFixed(2)}</strong>
                        </div>
                        <div className="list-group-item px-0 d-flex justify-content-between">
                          <span className="text-dark">Duration</span>
                          <strong className="text-dark">{analysisData.duration} months</strong>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <h3 className="fw-semibold text-dark mb-3">
                        {analysisData.isAchievable ? 'Goal Achievable' : 'Goal Not Achievable'}
                      </h3>
                      {analysisData.isAchievable ? (
                        <div className="d-flex flex-column gap-2">
                          <div className="alert alert-success mb-0" role="alert">
                            <p className="mb-0 small">
                              <span className="fw-semibold">Months to reach goal:</span> {analysisData.projections?.monthsToReach} months
                            </p>
                          </div>
                          <div className="alert alert-info mb-0" role="alert">
                            <p className="mb-0 small">
                              <span className="fw-semibold">Projected savings:</span> ₹{analysisData.projections?.projectedSavings?.toFixed(2)}
                            </p>
                          </div>
                          <div className="alert alert-primary mb-0" role="alert">
                            <p className="mb-0 small">
                              <span className="fw-semibold">Surplus after goal:</span> ₹{analysisData.projections?.surplus?.toFixed(2)}
                            </p>
                          </div>
                          <div className="alert alert-success mt-2 mb-0">
                            <p className="mb-0 small fw-semibold">Great! You're on track to achieve your goal.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-2">
                          <div className="alert alert-danger mb-0" role="alert">
                            <p className="mb-0 small">
                              <span className="fw-semibold">Additional monthly savings:</span> ₹{Math.abs(analysisData.difference)?.toFixed(2)}
                            </p>
                          </div>
                          <div className="alert alert-warning mb-0" role="alert">
                            <p className="mb-0 small">
                              <span className="fw-semibold">Months needed:</span> {analysisData.projections?.suggestedDuration} months
                            </p>
                          </div>
                          <div className="alert alert-warning mt-2 mb-0">
                            <p className="mb-2 small fw-semibold">Tips to reach your goal:</p>
                            <ul className="mb-0 ps-3 small">
                              <li>Cut expenses in high-spending categories</li>
                              <li>Look for additional income sources</li>
                              <li>Extend your goal duration to spread savings</li>
                              <li>Review discretionary spending regularly</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expense Chart Section */}
            {dashboardData?.categoryBreakdown && Object.keys(dashboardData.categoryBreakdown).length > 0 && (
              <div className="card shadow-sm mb-5">
                <div className="card-body">
                  <h2 className="card-title fw-bold mb-5">Expense Distribution</h2>
                  <div className="row g-4">
                    {/* Pie Chart */}
                    <div className="col-12 col-lg-6">
                      <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={Object.entries(dashboardData.categoryBreakdown).map(([category, data]) => ({
                                name: category,
                                value: typeof data === 'object' ? (data.total || 0) : data,
                                percentage: typeof data === 'object' ? data.percentage : 0
                              }))}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percentage }) => `₹{name}: ₹{percentage}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#007bff" />
                              <Cell fill="#28a745" />
                              <Cell fill="#dc3545" />
                              <Cell fill="#ffc107" />
                              <Cell fill="#17a2b8" />
                              <Cell fill="#6f42c1" />
                              <Cell fill="#fd7e14" />
                            </Pie>
                            <Tooltip formatter={(value) => `₹₹{value.toFixed(2)}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Category Table */}
                    <div className="col-12 col-lg-6">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th className="fw-bold text-dark">Category</th>
                              <th className="fw-bold text-dark text-end">Amount</th>
                              <th className="fw-bold text-dark text-end">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(dashboardData.categoryBreakdown).map(([category, data], index) => {
                              const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary', 'orange'];
                              return (
                                <tr key={category}>
                                  <td>
                                    <span className={`badge bg-₹{colors[index % colors.length]} me-2`}></span>
                                    {category}
                                  </td>
                                  <td className="text-end fw-semibold">
                                    ₹{typeof data === 'object' ? (data.total?.toFixed(2) || '0.00') : (data?.toFixed(2) || '0.00')}
                                  </td>
                                  <td className="text-end">
                                    {typeof data === 'object' && data.percentage ? `₹{data.percentage}%` : 'N/A'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
