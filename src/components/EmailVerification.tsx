import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Brak tokena w URL');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-email?token=${token}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Błąd weryfikacji');
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Wystąpił nieznany błąd');
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Weryfikacja emaila</h2>
      {status === 'loading' && <p>Trwa weryfikacja...</p>}
      {status === 'success' && <p>✅ {message}</p>}
      {status === 'error' && <p>❌ {message}</p>}
      {status === 'expired' && <p>⚠ Token wygasł</p>}
    </div>
  );
};

export default EmailVerification;
