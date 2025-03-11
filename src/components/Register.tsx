import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/style/Register.scss';

interface APIError {
  error?: string;
  message?: string;
}

const Register: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Imię musi mieć minimum 3 znaki';
    }

    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Nieprawidłowy format emaila';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Hasło musi zawierać: 1 wielką literę, 1 małą literę, 1 cyfrę i 1 znak specjalny (@$!%*?&)';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const { confirmPassword, ...submitData } = formData;
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const contentType = response.headers.get('content-type');
      const responseData = contentType?.includes('application/json') 
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(
          typeof responseData === 'object' 
            ? (responseData as APIError).error || 'Błąd podczas rejestracji'
            : 'Błąd podczas rejestracji'
        );
      }

      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      let errorMessage = 'Wystąpił nieoczekiwany błąd';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String((error as APIError).message);
      }

      setServerError(errorMessage);
      console.error('Szczegóły błędu:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register">
      <div className="register__background">
        <div className="register__gradient"></div>
        <div className="register__decor">
          <div className="wedding-rings">💍</div>
          <div className="flower-pattern"></div>
        </div>
      </div>
      
      <div className="container register__content">
        <div className="register__card animate-slide-up">
          <h2 className="register__title">Stwórz swoje wesele</h2>
          <p className="register__subtitle">Zacznij planowanie już dziś</p>

          {isSuccess ? (
            <div className="register__success animate-pop-in">
              <h3>Gotowe! 🎉</h3>
              <p>Za chwilę przeniesiemy Cię do logowania...</p>
              <div className="success-icon">💐</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="register__form">
              {serverError && <div className="register__error animate-shake">⚠️ {serverError}</div>}

              <div className="input-group">
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={isSubmitting}
                  required
                />
                <label htmlFor="name" className="input-label">Imię i nazwisko</label>
                {errors.name && <span className="input-error">✎ {errors.name}</span>}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isSubmitting}
                  required
                />
                <label htmlFor="email" className="input-label">Email</label>
                {errors.email && <span className="input-error">✉ {errors.email}</span>}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={isSubmitting}
                  required
                />
                <label htmlFor="password" className="input-label">Hasło</label>
                {errors.password && <span className="input-error">🔒 {errors.password}</span>}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  id="confirmPassword"
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  disabled={isSubmitting}
                  required
                />
                <label htmlFor="confirmPassword" className="input-label">Potwierdź hasło</label>
                {errors.confirmPassword && <span className="input-error">🔑 {errors.confirmPassword}</span>}
              </div>

              <button 
                type="submit" 
                className={`register__button ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loader"></div>
                ) : (
                  <>
                    🎀 Rozpocznij planowanie
                  </>
                )}
              </button>
            </form>
          )}

          <div className="register__login-link">
            Masz już konto? <Link to="/login">Zaloguj się</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;