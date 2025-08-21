import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LanguageSelect from "../components/LanguageSelect";

export default function Home() {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/scan-qr");
  };

  const handleNo = () => {
    // ссылка на покупку через Gumroad
    window.location.href = "https://gumroad.com/your-product-link";
  };

  return (
    <div className="home-container" style={{ textAlign: "center", padding: "2rem" }}>
      <Header />
      <LanguageSelect />
      <img
        src="/microphone.png"
        alt="Microphone"
        style={{ width: "200px", margin: "2rem 0" }}
      />
      <h2>Здесь вы можете создать поздравительный видеоклип или признание в любви в песне!</h2>
      <p>У вас уже есть QR-код?</p>
      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={handleYes} style={{ marginRight: "1rem" }}>Да</button>
        <button onClick={handleNo}>Нет</button>
      </div>
    </div>
  );
}
