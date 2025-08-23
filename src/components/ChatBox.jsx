import React from "react";

export default function ChatBox({ messages, onSend }) {
  const [val, setVal] = React.useState("");
  return (
    <div>
      <div className="chatBox" style={{display:"flex",flexDirection:"column"}}>
        {messages.map((m,i)=>(<div key={i} className={`msg ${m.role==="bot"?"bot":"user"}`}>{m.text}</div>))}
      </div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <input className="input" placeholder="Write..." value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ onSend(val); setVal("") } }} />
        <button className="btn btn-yes" onClick={()=>{ onSend(val); setVal(""); }}>Send</button>
      </div>
    </div>
  );
}
