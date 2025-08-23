import React, { useEffect, useState } from "react";

const texts = {
  en: {
    title: "This service helps you create a song and automatically make a music video.",
    yes: "Yes",
    no: "No"
  },
  ru: {
    title: "Сервис поможет вам создать песню и автоматически сделать музыкальный видеоклип.",
    yes: "Да",
    no: "Нет"
  }
};

export default function App() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("wishclip_lang");
    const browser = navigator.language && navigator.language.startsWith("ru") ? "ru" : "en";
    setLang(saved || browser);
  }, []);

  const applyLang = (l) => {
    setLang(l);
    localStorage.setItem("wishclip_lang", l);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        position: "relative"
      }}
    >
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <button onClick={() => applyLang("en")}>EN</button>
        <button onClick={() => applyLang("ru")}>RU</button>
      </div>
      <h1 style={{ marginBottom: "1rem" }}>{texts[lang].title}</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{ background: "#4caf50", padding: "0.7rem 1.5rem", borderRadius: "8px", border: "none", color: "white" }}
          onClick={() => (window.location.href = "/qr.html")}
        >
          {texts[lang].yes}
        </button>
        <button
          style={{ background: "#f44336", padding: "0.7rem 1.5rem", borderRadius: "8px", border: "none", color: "white" }}
          onClick={() => (window.location.href = "https://gumroad.com/your_product_link")}
        >
          {texts[lang].no}
        </button>
      </div>
    </div>
  );
}
