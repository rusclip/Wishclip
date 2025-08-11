import React, { useState } from 'react';

export default function Chat({ qrCode, onVideoReady }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m Visha. Let’s create your song!' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Great! Creating your clip...' }]);
      onVideoReady();
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Chat with Visha</h2>
      <div style={{ marginBottom: '10px', minHeight: '200px', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{
              display: 'inline-block',
              background: m.role === 'user' ? '#007bff' : '#f1f1f1',
              color: m.role === 'user' ? 'white' : 'black',
              padding: '8px 12px',
              borderRadius: '12px',
              maxWidth: '80%'
            }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={send} style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Send
        </button>
      </div>
    </div>
  );
}
