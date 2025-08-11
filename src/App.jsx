import React, { useState } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import PaymentButton from './components/PaymentButton';
import QRScanner from './components/QRScanner';
import Chat from './components/Chat';
import { translations } from './utils/translate';
import './App.css';

export default function App() {
  const [lang, setLang] = useState(navigator.language.split('-')[0] || 'en');
  const [step, setStep] = useState('start'); // start, scanning, chat
  const [qrCode, setQrCode] = useState('');

  const t = translations[lang] || translations.en;

  return (
    <div className="app">
      <div className="card">
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <h1 className="title">{t.title}</h1>

        {step === 'start' && (
          <>
            <p className="subtitle">{t.scan_qr}</p>
            <button className="btn primary" onClick={() => setStep('scanning')}>
              {t.scan_qr}
            </button>

            <p className="or">{t.or_enter}</p>
            <input
              type="text"
              className="input"
              placeholder="WISH-XXXX-XXXX"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
            />
            <button
              className="btn secondary"
              onClick={() => qrCode.trim() && setStep('chat')}
              disabled={!qrCode.trim()}
            >
              {t.continue}
            </button>

            <div className="payment">
              <PaymentButton lang={lang} />
            </div>
          </>
        )}

        {step === 'scanning' && (
          <QRScanner onScan={(code) => { setQrCode(code); setStep('chat'); }} />
        )}

        {step === 'chat' && (
          <Chat qrCode={qrCode} onVideoReady={() => alert('Video ready!')} />
        )}
      </div>
    </div>
  );
}
