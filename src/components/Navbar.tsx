// components/Navbar/Navbar.tsx
import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/style/Navbar.scss';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = () => {
    window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <Link to="/" className="logo animate-pop-in">
          Wedding<span>RSVP</span>
        </Link>

        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && toggleMenu()}
          aria-label="Menu mobilne"
        >
          <span className="bar bar--top"></span>
          <span className="bar bar--mid"></span>
          <span className="bar bar--bot"></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {[
            { path: '/', text: 'Strona główna' },
            { hash: '#o-nas', text: 'O nas' },
            { hash: '#pakiety', text: 'Pakiety' },
            { hash: '#faq', text: 'FAQ' },
          ].map((item, index) => (
            <li key={index} className="nav-item">
              {item.path ? (
                <Link 
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active-link' : ''}`}
                  onClick={closeMenu}
                >
                  {item.text}
                  <span className="link-underline"></span>
                </Link>
              ) : (
                <a 
                  href={item.hash}
                  className={`nav-link ${location.hash === item.hash ? 'active-link' : ''}`}
                  onClick={closeMenu}
                >
                  {item.text}
                  <span className="link-underline"></span>
                </a>
              )}
            </li>
          ))}
          
          <div className="nav-buttons">
            <li>
              <Link
                to="/login"
                className={`nav-cta ${isActive('/login') ? 'active-cta' : ''}`}
                onClick={closeMenu}
              >
                {isActive('/login') ? 'Wróć do strony' : 'Zaloguj się'}
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`nav-cta ${isActive('/register') ? 'active-cta' : ''}`}
                onClick={closeMenu}
              >
                {isActive('/register') ? 'Wróć do strony' : 'Zarejestruj się'}
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;