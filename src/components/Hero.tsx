import React, { FC } from 'react';
import '../assets/style/Hero.scss';

const Hero: FC = () => (
  <section className="hero">
    <nav className="hero__nav">
      <div className="hero__logo">Ślubne Marzenie</div>
      <ul className="hero__menu">
        <li><a href="#about">O nas</a></li>
        <li><a href="#services">Usługi</a></li>
        <li><a href="#pricing">Cennik</a></li>
        <li><a href="#contact">Kontakt</a></li>
      </ul>
    </nav>

    <div className="hero__overlay"></div>
    <div className="container hero__content">
      <div className="hero__glass">
        <h1 className="hero__title">
          <span>Wirtualne Zarządzanie</span>
          <span>Gośćmi Weselnymi</span>
        </h1>
        <div className="hero__separator"></div>
        <p className="hero__subtitle">
          Twój Ślubny Planer w Złotym Stylu
        </p>
        <a href="#pricing" className="hero__cta">
          Rozpocznij Przygodę <span className="hero__cta-icon">💍</span>
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
