import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/style/Dashboard.scss';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Rola: {user.role}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Wyloguj
        </button>
      </div>

      <div className="main-content">
        <h1>Witaj w panelu użytkownika!</h1>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Ostatnie logowanie</h3>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;