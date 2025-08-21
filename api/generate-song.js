export default async function handler(req, res) {
  const answers = req.body;

  // Здесь делаем вызов Kits.ai API или GPT
  // Для примера просто формируем текст песни на основе ответов
  const song = `🎵 Текст песни по вашим ответам:\nТема: ${answers[0]}\nИмя: ${answers[1]}\nВозраст: ${answers[2]}\nСтиль: ${answers[5]}`;

  res.status(200).json({ song });
}
