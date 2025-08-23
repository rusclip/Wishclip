import React from "react";
import ChatBox from "../components/ChatBox";
import { sendChatMessage, generateLyrics } from "../api";
import { detectLang } from "../i18n";
import { useNavigate } from "react-router-dom";

export default function Chat(){
  const nav = useNavigate();
  const lang = detectLang();
  const sessionId = localStorage.getItem("wishclip_session") || ("sess-" + Math.random().toString(36).slice(2,8));
  const [messages, setMessages] = React.useState([{ role:"bot", text:"Привет! Я — ИИ помощник. Для кого будет песня? (имя, повод)" }]);
  const [lyrics, setLyrics] = React.useState("");

  async function onSend(text){
    if (!text || !text.trim()) return;
    setMessages(prev=>[...prev,{role:"user", text}]);
    // call Make chat hook
    try{
      const res = await sendChatMessage(sessionId, text, lang);
      const reply = res?.reply || "Sorry, no reply.";
      setMessages(prev=>[...prev,{role:"bot", text: reply}]);
    }catch(e){
      setMessages(prev=>[...prev,{role:"bot", text:"Server error"}]);
    }
  }

  async function onGenerateLyrics(){
    try{
      const outline = messages;
      const res = await generateLyrics(sessionId, outline, lang);
      if (res?.lyrics) setLyrics(res.lyrics);
    }catch(e){
      alert("Error generating lyrics");
    }
  }

  return (
    <div className="center">
      <div style={{width:"100%",maxWidth:1000}}>
        <div className="card">
          <h2>Chat — AI assistant</h2>
          <ChatBox messages={messages} onSend={onSend} />
          <div style={{marginTop:12}}>
            <button className="btn" onClick={onGenerateLyrics}>Generate lyrics</button>
            <button className="btn" style={{marginLeft:8}} onClick={()=>nav("/")} >Home</button>
            <button className="btn" style={{marginLeft:8}} onClick={()=>nav("/payment")}>Buy more</button>
          </div>

          <div style={{marginTop:16}}>
            <h3>Lyrics preview</h3>
            <textarea className="input" style={{minHeight:140}} value={lyrics} onChange={e=>setLyrics(e.target.value)} />
            <div style={{marginTop:8}}>
              <button className="btn btn-yes" onClick={()=>nav("/")} >Save & Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
