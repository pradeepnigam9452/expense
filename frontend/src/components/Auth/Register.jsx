import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as authService from '../../services/authService';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);

    try {
      const { name, email, password } = formData;
      const response = await authService.register({ name, email, password });
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="w-100" style={{maxWidth: '400px'}}>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-5">
            {/* Logo Section */}
            <div className="text-center mb-5">
              <div className="d-inline-flex mb-3">
                <div className="bg-dark text-white p-3 rounded" style={{borderRadius: '8px'}}>
                  <svg className="w-6 h-6" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
              <h1 className="h4 fw-bold text-dark mb-2">ExpenseWise</h1>
              <p className="text-secondary small mb-0">Smart tracking, smarter saving</p>
            </div>

            {/* Form Section */}
            <div className="mb-4">
              <h2 className="h5 fw-bold text-dark mb-2">Create account</h2>
              <p className="text-secondary small mb-4">Start tracking your expenses</p>

              {apiError && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold small text-dark">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold small text-dark">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold small text-dark">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-dark w-100 fw-semibold mt-4"
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating account...
                    </span>
                  ) : (
                    <>
                      <svg className="me-2" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Create Account
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-secondary small mb-0">
                Already have an account?{' '}
                <Link to="/login" className="text-dark fw-semibold text-decoration-none">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;