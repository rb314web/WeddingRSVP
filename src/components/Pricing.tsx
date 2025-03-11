// components/Pricing/Pricing.tsx
import React, { FC } from 'react';
import { Package } from '../types';
import '../assets/style/Pricing.scss';

const packages: Package[] = [
  {
    name: 'Pakiet Basic',
    price: '99 zł/mies',
    features: [
      '✔ Do 50 gości',
      '✔ Podstawowy formularz RSVP',
      '✔ E-mailowe powiadomienia',
      '❌ Wsparcie 24/7',
      '❌ Zarządzanie stołami'
    ],
    isPremium: false,
    isBusiness: false
  },
  {
    name: 'Pakiet Premium',
    price: '199 zł/mies',
    features: [
      '✔ Do 200 gości',
      '✔ Zaawansowane funkcje RSVP',
      '✔ SMS + E-mail powiadomienia',
      '✔ Wsparcie 24/7',
      '✔ Podstawowe zarządzanie stołami'
    ],
    isPremium: true,
    isBusiness: false
  },
  {
    name: 'Pakiet Business',
    price: '299 zł/mies',
    features: [
      '✔ Nielimitowana liczba gości',
      '✔ Full customization formularza',
      '✔ Priority support 24/7',
      '✔ Pełne zarządzanie stołami',
      '✔ Dodatkowe szablony zaproszeń'
    ],
    isPremium: false,
    isBusiness: true
  }
];

interface PricingCardProps {
  package: Package;
  index: number;
}

const PricingCard: FC<PricingCardProps> = ({ package: pkg, index }) => (
  <div 
    className={`pricing__card 
      ${pkg.isPremium ? 'premium' : ''} 
      ${pkg.isBusiness ? 'business' : ''} 
      animate-slide-up`}
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    <div className="pricing__card-inner">
      {pkg.isBusiness && <div className="pricing__ribbon">Profesjonalne</div>}
      <h3 className="pricing__title">{pkg.name}</h3>
      <p className="pricing__price">{pkg.price}</p>
      <ul className="pricing__features">
        {pkg.features.map((feature, i) => (
          <li key={i} className="pricing__feature">
            {feature}
          </li>
        ))}
      </ul>
      <a href="#" className="pricing__cta">
        {pkg.isBusiness ? 'Skontaktuj się' : pkg.isPremium ? 'Najpopularniejsze' : 'Rozpocznij'}
      </a>
    </div>
    {pkg.isPremium && <div className="pricing__badge">Best Value</div>}
  </div>
);

const Pricing: FC = () => (
  <section id="pricing" className="pricing">
    <div className="container">
      <h2 className="section-title animate-slide-in">Nasze Pakiety</h2>
      <div className="pricing__grid">
        {packages.map((pkg, index) => (
          <PricingCard key={index} package={pkg} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;