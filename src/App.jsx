import React, { useState } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import PaymentButton from './components/PaymentButton';
import QRScanner from './components/QRScanner';
import Chat from './components/Chat';
import { translations } from './utils/translate';

export default function App() {
  const [lang, setLang] = useState(navigator.language.split('-')[0] || 'en');
  const [step, setStep] = useState('start'); // start, scanning, chat
  const [qrCode, setQrCode] = useState('');

  const t = translations[lang] || translations.en;

  return (
    <div className="app" style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>
        {t.title}
      </h1>

      {step === 'start' && (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            {t.scan_qr}
          </p>
          <button
            onClick={() => setStep('scanning')}
            style={{
              padding: '12px 24px',
              background: '#5a00b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '20px'
            }}
          >
            {t.scan_qr}
          </button>
          <p>{t.or_enter}</p>
          <input
            type="text"
            placeholder="WISH-XXXX-XXXX"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            style={{
              padding: '10px',
              width: '80%',
              maxWidth: '300px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              marginBottom: '10px'
            }}
          />
          <button
            onClick={() => qrCode.trim() && setStep('chat')}
            disabled={!qrCode.trim()}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              opacity: qrCode.trim() ? 1 : 0.6
            }}
          >
            {t.continue}
          </button>

          <div style={{ marginTop: '30px' }}>
            <PaymentButton lang={lang} />
          </div>
        </div>
      )}

      {step === 'scanning' && (
        <QRScanner onScan={(code) => { setQrCode(code); setStep('chat'); }} />
      )}

      {step === 'chat' && (
        <Chat qrCode={qrCode} onVideoReady={() => alert('Video ready!')} />
      )}
    </div>
  );
}
