import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’ll help write your song. Who is it for?" }
  ]);
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;
    const next = [...messages, { from: "user", text }];
    setMessages(next);
    setText("");
    // Заглушка ответа
    setTimeout(() => {
      setMessages((cur) => [
        ...next,
        { from: "bot", text: "Got it. How old is the person?" }
      ]);
    }, 600);
  };

  return (
    <div className="page">
      <h2>Song Assistant</h2>
      <div className="chatbox">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <div className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your answer…"
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
