// EmailVerification.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../assets/style/Login.scss';

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus('error');
          setMessage('Brak tokenu weryfikacyjnego');
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/verify-email?token=${token}`
        );

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Błąd weryfikacji');
        
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Nieznany błąd';
        setStatus('error');
        
        if (errorMessage.includes('wygasł')) {
          setStatus('expired');
          setMessage('Link wygasł. Wygeneruj nowy w ustawieniach konta.');
        } else {
          setMessage(errorMessage);
        }
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="login__card">
      <h2 className="login__title">Weryfikacja adresu email</h2>
      
      <div className={`verification-status ${status}`}>
        {status === 'loading' && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Trwa weryfikacja...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="success-message">
            ✅ {message || 'Email został pomyślnie potwierdzony!'}
            <p>Za chwilę zostaniesz przekierowany do logowania...</p>
          </div>
        )}

        {(status === 'error' || status === 'expired') && (
          <div className="error-message">
            ❌ {message || 'Błąd podczas weryfikacji'}
            <div className="action-buttons">
              <button onClick={() => navigate('/login')} className="login__button">
                Przejdź do logowania
              </button>
              <button onClick={() => navigate('/register')} className="login__button">
                Zarejestruj się
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;