import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/style/Register.scss';

const Register: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

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

            <div className="auth0-register-container">
              <button
                  className="auth0-register-button"
                  onClick={() => loginWithRedirect({
                    authorizationParams: {
                      screen_hint: "signup"
                    }
                  })}
              >
                Sign Up with Auth0
              </button>
            </div>

            <div className="register__login-link">
              Masz już konto? <Link to="/login">Zaloguj się</Link>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Register;