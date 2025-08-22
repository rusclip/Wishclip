// src/App.jsx

import React, { useState } from 'react';
import { translations } from './utils/translate';
import VoiceChoice from './components/VoiceChoice';

export default function App() {
  const [lang, setLang] = useState(navigator.language.split('-')[0] || 'en');
  const [step, setStep] = useState('start'); // 'start', 'voice-choice'

  const t = translations[lang] || translations.en;

  const handleVoiceChoice = ({ voiceType, audioBlob }) => {
    console.log('Выбрано:', voiceType);
    if (voiceType === 'my') {
      console.log('Аудио записано:', audioBlob);
    }
    // Здесь будет переход к чату
    setStep('chat');
  };

  return (
    <div style={{
      minHeight: '100vh',
      margin: 0,
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Переключатель языка */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        gap: '6px'
      }}>
        {['en', 'ru', 'es', 'de', 'fr', 'it'].map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? '#5a00b8' : 'none',
              color: 'white',
              border: '1px solid #ccc',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: lang === l ? 'bold' : 'normal'
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Главный экран */}
      {step === 'start' && (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '40px',
          borderRadius: '16px',
          color: 'white',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
        }}>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <p><strong>{t.has_qr}</strong></p>
          <div>
            <button
              onClick={() => setStep('scanning')}
              style={{
                margin: '10px',
                padding: '12px 24px',
                background: '#5a00b8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {t.yes}
            </button>
            <button
              onClick={() => setStep('voice-choice')}
              style={{
                margin: '10px',
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {t.no}
            </button>
          </div>
        </div>
      )}

      {/* Выбор голоса */}
      {step === 'voice-choice' && (
        <VoiceChoice onNext={handleVoiceChoice} lang={lang} t={t} />
      )}

      {/* Заглушка чата */}
      {step === 'chat' && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          <h2>Чат с ИИ</h2>
          <p>Здесь будет диалог для создания песни...</p>
          <button onClick={() => setStep('start')}>Назад</button>
        </div>
      )}

      {/* Заглушка сканирования */}
      {step === 'scanning' && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          <h2>Сканирование QR-кода</h2>
          <p>Здесь будет сканер</p>
          <button onClick={() => setStep('start')}>Назад</button>
        </div>
      )}
    </div>
  );
}
