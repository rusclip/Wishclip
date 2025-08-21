import { useState } from "react";

export default function VoiceImagePage() {
  const [voiceFile, setVoiceFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!voiceFile || !imageFile) {
      alert("Пожалуйста, загрузите и голос, и изображение.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("voice", voiceFile);
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/upload-files", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Файлы успешно загружены! Скоро будет создан клип.");
      } else {
        setMessage("Произошла ошибка при загрузке.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Произошла ошибка при загрузке.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Добавьте голос и изображение персонажа</h2>
      <p>Голос: надиктуйте или напойте короткий текст (~5 секунд).</p>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setVoiceFile(e.target.files[0])}
        style={{ display: "block", margin: "10px 0" }}
      />
      <p>Изображение: полноростовое лицо, смотрящее вперёд, без посторонних предметов.</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{ display: "block", margin: "10px 0" }}
      />
      <button onClick={handleUpload} disabled={loading} style={{ padding: "10px 20px", marginTop: "10px" }}>
        {loading ? "Загрузка..." : "Загрузить и создать клип"}
      </button>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
