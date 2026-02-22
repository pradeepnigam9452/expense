import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = window.location;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-lite shadow-lg sticky-top border-bottom border-secondary">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand fw-bold d-flex align-items-center gap-2 fs-5">
          
          <span>Finance Tracker</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
              >
               Reset Dashboard
              </Link>
            </li>

             <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item ms-2">
              <span className="navbar-text text-light me-3 small">
                
              </span>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm fw-semibold"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;