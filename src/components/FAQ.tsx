// components/FAQ/FAQ.tsx
import React, { FC, useState } from 'react';
import '../assets/style/FAQ.scss';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Jak działa system RSVP?',
      answer: 'Generujemy unikalne linki dla każdego gościa które możesz rozesłać przez SMS/e-mail.'
    },
    {
      id: 2,
      question: 'Jak długo trwa konfiguracja?',
      answer: 'Średnio 15 minut - dodaj gości, dostosuj formularz i gotowe!'
    },
    {
      id: 3,
      question: 'Czy mogę zmienić pakiet później?',
      answer: 'Tak, możesz zmienić pakiet w dowolnym momencie w panelu administracyjnym.'
    }
  ];

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq">
      <div className="container">
        <h2 className="section-title animate-slide-in">Częste pytania</h2>
        <div className="faq__grid">
          {faqItems.map((item, index) => (
            <div 
              key={item.id}
              className={`faq__item ${activeId === item.id ? 'active' : ''} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="faq__header"
                onClick={() => toggleFAQ(item.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && toggleFAQ(item.id)}
              >
                <h3 className="faq__question">{item.question}</h3>
                <div className="faq__icon">
                  <div className="faq__icon-bar"></div>
                  <div className="faq__icon-bar"></div>
                </div>
              </div>
              <div className="faq__content">
                <p className="faq__answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;