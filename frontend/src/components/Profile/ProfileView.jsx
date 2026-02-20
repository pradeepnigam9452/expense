import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as authService from '../../services/authService';
import Loader from '../Shared/Loader';
import ErrorMessage from '../Shared/ErrorMessage';

const ProfileView = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.updateProfile(formData, localStorage.getItem('token'));
      updateUser(response.user);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      setLoading(true);
      try {
        await authService.deleteAccount(localStorage.getItem('token'));
        logout();
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete account');
        setLoading(false);
      }
    }
  };

  if (loading && !isEditing) return <Loader />;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card shadow">
              {/* Header */}
              <div className="card-body text-center border-bottom">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <span className="display-5 fw-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h1 className="h3 fw-bold text-dark">My Profile</h1>
                <p className="text-muted mb-0">Manage your account settings</p>
              </div>

              {/* Card Body */}
              <div className="card-body">
                {error && <ErrorMessage message={error} />}

                {success && (
                  <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                    {success}
                    <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                  </div>
                )}

                {!isEditing ? (
                  // View Mode
                  <div className="d-flex flex-column gap-4">
                    <div>
                      <label className="form-label small fw-semibold text-muted">Full Name</label>
                      <p className="h6 fw-bold text-dark mb-0">{user?.name}</p>
                    </div>

                    <div>
                      <label className="form-label small fw-semibold text-muted">Email Address</label>
                      <p className="h6 fw-bold text-dark mb-0">{user?.email}</p>
                    </div>

                    <div>
                      <label className="form-label small fw-semibold text-muted">Member Since</label>
                      <p className="h6 fw-bold text-dark mb-0">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>

                    <div className="border-top pt-3 d-flex flex-column gap-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary fw-semibold"
                      >
                        Edit Profile
                      </button>

                      <button
                        onClick={logout}
                        className="btn btn-secondary fw-semibold"
                      >
                        Logout
                      </button>

                      <button
                        onClick={handleDeleteAccount}
                        className="btn btn-danger fw-semibold"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <form onSubmit={handleUpdate} className="d-flex flex-column gap-4">
                    <div>
                      <label htmlFor="name" className="form-label small fw-semibold">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label small fw-semibold">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="border-top pt-3 d-flex flex-column gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary fw-semibold"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || ''
                          });
                        }}
                        className="btn btn-secondary fw-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
