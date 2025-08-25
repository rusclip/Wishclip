import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function QR({ onValidated }) {
  const [manual, setManual] = useState("");
  const [status, setStatus] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const webhook = import.meta.env.VITE_MAKE_QR_VALIDATE_WEBHOOK_URL;

  // --- QR SCAN ---
  useEffect(() => {
    let stream;
    let mounted = true;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!mounted) return;
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const tick = () => {
          if (!video.videoWidth) { animRef.current = requestAnimationFrame(tick); return; }
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            validate(code.data);
            return; // stop on first read
          }
          animRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) {
        console.warn("Camera error:", e);
        setStatus("Camera unavailable. Please enter your code manually.");
      }
    })();

    return () => {
      mounted = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  // --- VALIDATE VIA MAKE WEBHOOK ---
  async function validate(code) {
    try {
      setStatus("Validating…");
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      const data = await res.json(); // { valid: boolean }
      if (data.valid) {
        setStatus("Valid ✅ Redirecting…");
        onValidated();
      } else {
        setStatus("Invalid or unpaid QR code.");
      }
    } catch (e) {
      console.error(e);
      setStatus("Validation error. Try again.");
    }
  }

  return (
    <div className="container">
      <h2>Scan your QR code</h2>
      <p>Allow camera access, or enter the code manually.</p>

      <div className="card" style={{padding:16, color:"#fff", background:"#111"}}>
        <video ref={videoRef} style={{ width: "100%", borderRadius: 10 }} playsInline muted></video>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      <div className="row mt" style={{justifyContent:"flex-start"}}>
        <input
          className="input"
          placeholder="WISH-XXXX-XXXX or OFF-XXXX-XXXX"
          value={manual}
          onChange={(e)=>setManual(e.target.value)}
          style={{maxWidth:400}}
        />
        <button className="btn btn-primary" onClick={()=> manual.trim() && validate(manual.trim())}>
          Validate code
        </button>
      </div>

      <p className="small" style={{color:"#111"}}>{status}</p>
    </div>
  );
}
