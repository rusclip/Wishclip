import React from "react";
import { useNavigate } from "react-router-dom";
import { GUMROAD_URL } from "../api";
import { detectLang, LANGS } from "../i18n";

export default function Home(){
  const nav = useNavigate();
  const lang = detectLang();
  const t = LANGS[lang];

  React.useEffect(()=>{ document.title = "WishClip"; },[]);

  return (
    <div className="center">
      <div className="card">
        <div className="header">
          <div>
            <div className="hero">
              <h1>{t.heroTitle}</h1>
              <p>Make a 60-second personalized song video — choose language, upload or clone voice, pick a character.</p>
            </div>
          </div>
        </div>

        <h3 style={{marginTop:12}}>{t.question}</h3>
        <div className="row" style={{marginTop:10}}>
          <button className="btn btn-yes" onClick={()=>nav("/qr")}>{t.yes}</button>
          <button className="btn btn-no" onClick={()=>window.location.href = GUMROAD_URL}>{t.no} — {t.buy}</button>
        </div>

        <p style={{marginTop:16,color:"#9aa4b2"}}>
          After buying or validating QR you will enter the AI assistant chat that helps to create lyrics, generate or upload voice, create character images and assemble the 1-minute clip.
        </p>
      </div>
    </div>
  );
}
