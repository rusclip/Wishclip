import React, { useRef, useEffect, useState } from 'react';

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const startScan = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const ctx = canvasRef.current.getContext('2d');
        const video = videoRef.current;

        const tick = () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

            import('jsqr').then(module => {
              const code = module.default(imageData.data, imageData.width, imageData.height);
              if (code) {
                onScan(code.data);
              } else {
                requestAnimationFrame(tick);
              }
            });
          } else {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      } catch (err) {
        setError('Camera access denied. Please enter code manually.');
      }
    };

    startScan();
  }, [onScan]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Scan QR Code</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <video ref={videoRef} style={{ width: '100%', maxWidth: '400px', border: '1px solid #ccc' }} autoPlay />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}
      <p>Or enter manually:</p>
      <input
        type="text"
        placeholder="WISH-XXXX-XXXX"
        style={{ padding: '8px', margin: '10px 0' }}
        onChange={(e) => e.target.value.length > 5 && onScan(e.target.value)}
      />
    </div>
  );
}
