import React, { useState } from 'react';
import { translations } from './utils/translate';

export default function App() {
  const [lang, setLang] = useState(navigator.language.split('-')[0] || 'en');
  const [step, setStep] = useState('start'); // start, scanning, chat

  const t = translations[lang] || translations.en;

  return (
    <div className="container">
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        {['en', 'ru', 'es', 'de', 'fr', 'it'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ margin: '0 4px' }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <p><strong>{t.has_qr}</strong></p>

      <div>
        <button className="yes" onClick={() => setStep('scanning')}>
          {t.yes}
        </button>
        <button className="no" onClick={() => window.open(t.buy_link, '_blank')}>
          {t.no}
        </button>
      </div>
    </div>
  );
}
