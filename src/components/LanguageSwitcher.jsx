import React from 'react';

export default function LanguageSwitcher({ lang, setLang }) {
  const languages = ['en', 'ru', 'es', 'de', 'fr', 'it'];
  const labels = { en: 'EN', ru: 'RU', es: 'ES', de: 'DE', fr: 'FR', it: 'IT' };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      {languages.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            fontWeight: lang === l ? 'bold' : 'normal',
            margin: '0 4px',
            background: 'none',
            border: '1px solid #ccc',
            padding: '4px 8px',
            cursor: 'pointer'
          }}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
