import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QR() {
  const [manual, setManual] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 240 }, false);
    scanner.render(async (decodedText) => {
      scanner.clear();
      await handleCode(decodedText);
    }, () => {});
    return () => scanner.clear().catch(() => {});
  }, []);

  async function handleCode(code) {
    setMsg("Checking code...");
    let valid = false;

    // 1) Проверка через Make (если настроишь вебхук)
    const webhook = import.meta.env.VITE_MAKE_WEBHOOK_URL || "";
    if (webhook) {
      try {
        const r = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code })
        });
        const data = await r.json().catch(() => ({}));
        valid = data.valid === true || data.status === "ok";
      } catch {}
    }

    // 2) Временная "демо" проверка, если вебхук не подключён
    if (!valid && code === "DEMO123") valid = true;

    if (valid) {
      setMsg("Valid! Redirecting…");
      nav("/chat");
    } else {
      setMsg("Invalid or inactive code. Try again or buy access.");
    }
  }

  return (
    <div className="page">
      <h2>Scan your QR or enter code</h2>
      <div id="qr-reader" style={{ width: "320px", maxWidth: "90vw" }}></div>

      <div className="row" style={{ marginTop: 16 }}>
        <input
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="Enter code manually"
        />
        <button onClick={() => handleCode(manual)}>Check code</button>
      </div>

      {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
    </div>
  );
}
