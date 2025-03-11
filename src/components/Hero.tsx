import React, { FC } from 'react';
import '../assets/style/Hero.scss';

const Hero: FC = () => (
  <section className="hero">
    <div className="hero__decor">
      <div className="hero__floral-pattern"></div>
      <div className="hero__glow"></div>
    </div>
    <div className="container hero__content">
      <h1 className="hero__title animate-slide-in">
        <span>Wirtualne Zarządzanie</span>
        <span>Gośćmi Weselnymi</span>
      </h1>
      <div className="hero__separator"></div>
      <p className="hero__subtitle animate-fade-in">Twój Ślubny Planer w Złotym Stylu</p>
      <a href="#pricing" className="hero__cta animate-pop-in">
        Rozpocznij Przygodę
        <span className="hero__cta-icon">💍</span>
      </a>
    </div>
  </section>
);

export default Hero;