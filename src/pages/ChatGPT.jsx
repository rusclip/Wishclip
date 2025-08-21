import React, { useState } from "react";

export default function ChatGPT() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привет! Я — ИИ-помощник. Давай создадим твой музыкальный клип!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Отправляем текст на сервер, который общается с Kits.ai
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();

    setMessages([...newMessages, { from: "bot", text: data.reply }]);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Создание песни</h2>
      <div style={{ border: "1px solid #ccc", padding: "1rem", minHeight: "300px", marginBottom: "1rem" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === "bot" ? "left" : "right", margin: "0.5rem 0" }}>
            <span style={{ background: msg.from === "bot" ? "#eee" : "#d0f0c0", padding: "0.5rem", borderRadius: "5px" }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Напиши ответ..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: "0.5rem" }}
      />
      <button onClick={sendMessage} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>Отправить</button>
    </div>
  );
}
