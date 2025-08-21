import { useState } from "react";

const questions = [
  "Кого вы хотите поздравить или на какую тему будет песня?",
  "Как его/её зовут?",
  "Сколько ему/ей лет?",
  "Хотите упомянуть профессию?",
  "Есть ли любимое хобби, приколы, смешные привычки?",
  "В каком стиле песня? (Юмористический, Торжественный, Романтический, Мотивационный)",
];

export default function ChatPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [song, setSong] = useState(null);

  const handleNext = async () => {
    if (!input.trim()) return;
    setAnswers({ ...answers, [step]: input });

    if (step < questions.length - 1) {
      setStep(step + 1);
      setInput("");
    } else {
      // Генерация текста песни через Kits.ai или свой GPT API
      const res = await fetch("/api/generate-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setSong(data.song);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {!song ? (
        <div>
          <h2>{questions[step]}</h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ padding: "10px", width: "100%", fontSize: "16px" }}
          />
          <button onClick={handleNext} style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
            Next
          </button>
        </div>
      ) : (
        <div>
          <h2>Сгенерированная песня:</h2>
          <pre style={{ background: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>{song}</pre>
          <button
            style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => window.location.href = "/voice"}
          >
            Следующий шаг: Добавить голос и изображение
          </button>
        </div>
      )}
    </div>
  );
}
