import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/style/Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(emailRegex.test(email.trim()) && password.trim().length >= 8);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Login failed');
      
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-layout">
      <div className="login-image-column">
        <div className="image-overlay">
          <h2 className="brand-heading">RSVP</h2>
          <p className="event-date">AUG 20, 2016</p>
        </div>
      </div>

      <div className="login-form-column">
        <div className="login-container">
          <div className="login-header">
            <h1>WELCOME BACK</h1>
            <div className="decorative-line" />
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder=" "
              />
              <label className="input-label">Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder=" "
              />
              <label className="input-label">Password</label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="login__button"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <div className="loader" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="auth-link">
            Don't have an account? <a href="/register">Register now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;