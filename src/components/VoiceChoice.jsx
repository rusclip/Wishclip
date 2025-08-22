// src/components/VoiceChoice.jsx

import React, { useState } from 'react';

export default function VoiceChoice({ onNext, lang, t }) {
  const [voiceType, setVoiceType] = useState('ai'); // 'ai' или 'my'
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setError('');
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Остановка через 20 секунд
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
        }
      }, 20000);

      // Для ручной остановки
      window.stopRecording = () => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
        }
      };
    } catch (err) {
      setError('Ошибка доступа к микрофону. Разрешите доступ и попробуйте снова.');
    }
  };

  const stopRecording = () => {
    if (window.stopRecording) window.stopRecording();
  };

  const handleNext = () => {
    if (voiceType === 'my' && !audioBlob) {
      setError('Пожалуйста, запишите голос');
      return;
    }
    onNext({ voiceType, audioBlob });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
      <h3>{t.voice_title}</h3>

      <label style={{ display: 'block', margin: '15px 0' }}>
        <input
          type="radio"
          name="voice"
          value="ai"
          checked={voiceType === 'ai'}
          onChange={() => setVoiceType('ai')}
        />
        <strong> {t.ai_voice}</strong>
      </label>

      <label style={{ display: 'block', margin: '15px 0' }}>
        <input
          type="radio"
          name="voice"
          value="my"
          checked={voiceType === 'my'}
          onChange={() => setVoiceType('my')}
        />
        <strong> {t.my_voice}</strong>
      </label>

      {voiceType === 'my' && (
        <div style={{ marginTop: '20px', fontSize: '16px' }}>
          <p><em>{t.voice_tip}</em></p>
          <p><strong>{t.voice_prompt}</strong></p>

          {!audioBlob ? (
            <div>
              <button
                onClick={startRecording}
                disabled={isRecording}
                style={{
                  padding: '10px 20px',
                  background: '#5a00b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {isRecording ? 'Идёт запись...' : t.upload_voice}
              </button>
              {isRecording && (
                <button
                  onClick={stopRecording}
                  style={{
                    marginLeft: '10px',
                    padding: '10px 15px',
                    background: '#d9534f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Остановить
                </button>
              )}
            </div>
          ) : (
            <div>
              <audio controls src={URL.createObjectURL(audioBlob)} style={{ margin: '10px 0' }} />
              <div>
                <button
                  onClick={() => setAudioBlob(null)}
                  style={{
                    padding: '8px 16px',
                    background: '#555',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Перезаписать
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <button
        onClick={handleNext}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Продолжить
      </button>
    </div>
  );
}
