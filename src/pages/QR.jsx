import React from "react";
import { useNavigate } from "react-router-dom";
import { validateQr } from "../api";
import { detectLang, LANGS } from "../i18n";

export default function QR(){
  const nav = useNavigate();
  const lang = detectLang();
  const t = LANGS[lang];
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState("");

  async function onCheck(){
    setErr("");
    try{
      const data = await validateQr(code);
      // Expect Make to return { valid: true, sessionId: "..." } or { valid:false }
      if (data?.valid){
        // store sessionId in localStorage and navigate to chat
        if (data.sessionId) localStorage.setItem("wishclip_session", data.sessionId);
        localStorage.setItem("wishclip_qr", code);
        nav(`/chat`);
      } else {
        setErr(t.invalid);
      }
    }catch(e){
      console.error(e);
      setErr("Server error");
    }
  }

  return (
    <div className="center">
      <div className="card" style={{maxWidth:600}}>
        <h2>{t.enterQr}</h2>
        <input className="input" placeholder="WISH-XXXX-XXXX" value={code} onChange={e=>setCode(e.target.value)} />
        <div className="row" style={{marginTop:12}}>
          <button className="btn btn-yes" onClick={onCheck}>{t.check}</button>
          <button className="btn" onClick={()=>nav("/")}>Back</button>
        </div>
        {err && <div style={{marginTop:10,color:"#ff8b8b"}}>{err}</div>}
      </div>
    </div>
  );
}
