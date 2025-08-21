import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { message } = req.body;

  try {
    // Отправка текста пользователя в Kits.ai
    const kitsResponse = await fetch("https://api.kits.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.KITS_API_KEY}`
      },
      body: JSON.stringify({
        prompt: message,
        // Можно добавить дополнительные параметры
        max_tokens: 300
      })
    });

    const kitsData = await kitsResponse.json();
    const reply = kitsData.reply || "Извини, я пока не могу ответить.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Произошла ошибка на сервере." });
  }
}
