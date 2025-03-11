import React, { FC } from 'react';
import { FeatureItem } from '../types';
import '../assets/style/Features.scss';

const features: FeatureItem[] = [
  { title: '🎉 Automatyczne RSVP', text: 'Zbieraj odpowiedzi gości przez spersonalizowane linki' },
  { title: '📅 Zarządzanie Listą', text: 'Rzeczywiste aktualizacje i statystyki w panelu admina' },
  { title: '💌 Powiadomienia', text: 'SMS i e-mail z potwierdzeniami i przypomnieniami' }
];

const Features: FC = () => (
  <section className="features">
    <div className="container">
      <div className="features__grid">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="feature-card animate-slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="feature-card__inner">
              <h2 className="feature-card__title">{feature.title}</h2>
              <p className="feature-card__text">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;