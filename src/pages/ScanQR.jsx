import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanQR() {
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckQR = async () => {
    try {
      const res = await fetch(`/api/validate-qr?code=${qrCode}`);
      const data = await res.json();

      if (data.valid) {
        navigate("/chat");
      } else {
        setError("Неверный или уже использованный QR-код.");
      }
    } catch (err) {
      setError("Ошибка проверки QR-кода.");
    }
  };

  return (
    <div className="scan-qr-container" style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Сканируйте или введите QR-код</h2>
      <input
        type="text"
        placeholder="Введите QR-код"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
        style={{ padding: "0.5rem", margin: "1rem 0", width: "250px" }}
      />
      <br />
      <button onClick={handleCheckQR}>Проверить</button>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}
