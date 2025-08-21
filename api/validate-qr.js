import { useState } from "react";

export default function QrPage() {
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState(null); // null | "valid" | "invalid" | "loading"

  const handleCheckQr = async () => {
    if (!qrCode) return;
    setStatus("loading");

    try {
      const res = await fetch(`/api/validate-qr?code=${encodeURIComponent(qrCode)}`);
      const data = await res.json();

      if (data.valid) {
        setStatus("valid");
        // Переход к GPT-чату
        window.location.href = "/chat"; 
      } else {
        setStatus("invalid");
      }
    } catch (err) {
      console.error(err);
      setStatus("invalid");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter or Scan your QR code</h1>
      <input
        type="text"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
        placeholder="Enter QR code"
        style={{ padding: "10px", fontSize: "16px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={handleCheckQr} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Check
      </button>

      {status === "loading" && <p>Checking...</p>}
      {status === "invalid" && <p style={{ color: "red" }}>Invalid or used QR code</p>}
    </div>
  );
}
