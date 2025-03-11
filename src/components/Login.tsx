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
    const isEmailValid = emailRegex.test(email.trim());
    const isPasswordValid = password.trim().length >= 8;
    
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const validateForm = (): string | null => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return 'Wszystkie pola są wymagane';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return 'Nieprawidłowy format adresu email';
    }

    if (trimmedPassword.length < 8) {
      return 'Hasło musi mieć minimum 8 znaków';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Błąd logowania');
      }

      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Wystąpił nieznany błąd');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__card">
      <h2 className="login__title">Logowanie</h2>
      
      {error && (
        <div className="login__error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
          <label className="input-label">Hasło</label>
        </div>

        <button
          type="submit"
          className="login__button"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? (
            <div className="loader" />
          ) : (
            'Zaloguj się'
          )}
        </button>
      </form>

      <div className="login__link">
        Nie masz konta? <a href="/register">Zarejestruj się</a>
      </div>
    </div>
  );
};

export default Login;