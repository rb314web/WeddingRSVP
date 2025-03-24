import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/Login.scss'

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
      <div className="login-page">
        <div className="login-page__card">
          <h2>Witaj w Wedding Planner</h2>
          <p>Zaloguj się aby kontynuować</p>

          <button
              className="login-page__button"
              onClick={() => loginWithRedirect()}
          >
            Zaloguj przez Auth0
          </button>

          <div className="login-page__divider">
            <span>lub</span>
          </div>

          <div className="login-page__social-container">
            <button
                className="login-page__social-button"
                onClick={() => loginWithRedirect({
                  authorizationParams: {
                    connection: 'google-oauth2',
                  }
                })}
            >
              <span className="login-page__google-icon" />
              Kontynuuj przez Google
            </button>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;