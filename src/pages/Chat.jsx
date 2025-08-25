import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I’ll help you craft lyrics. Who is the song for?" }
  ]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input }]);
    setInput("");
    // здесь позже подключим DeepSeek/Kits flow.
    setTimeout(() => {
      setMessages(m => [...m, { role: "assistant", text: "Great. What’s the occasion and preferred music style?" }]);
    }, 500);
  };

  return (
    <div className="container">
      <h2>Song Assistant</h2>
      <div className="card" style={{background:"#111", color:"#fff", minHeight:240}}>
        {messages.map((m,i)=>(
          <div key={i} style={{textAlign: m.role==="user"?"right":"left", margin:"8px 0"}}>
            <span style={{display:"inline-block", padding:"8px 12px", borderRadius:10, background: m.role==="user"?"#6b4eff":"#23242d"}}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="row mt" style={{justifyContent:"flex-start"}}>
        <input className="input" placeholder="Type your message…" value={input} onChange={e=>setInput(e.target.value)} />
        <button className="btn btn-primary" onClick={send}>Send</button>
      </div>
    </div>
  );
}
