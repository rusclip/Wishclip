import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    try {
      // Загрузка голосового файла
      const voiceData = fs.readFileSync(files.voice.filepath);
      const { data: voiceUpload } = await supabase.storage
        .from("voice-samples")
        .upload(`voice-${Date.now()}.mp3`, voiceData, { upsert: true });

      // Загрузка изображения
      const imageData = fs.readFileSync(files.image.filepath);
      const { data: imageUpload } = await supabase.storage
        .from("character-images")
        .upload(`image-${Date.now()}.png`, imageData, { upsert: true });

      // Отправка в Make webhook
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voice_sample_url: supabase.storage.from("voice-samples").getPublicUrl(voiceUpload.path).publicURL,
          character_image_url: supabase.storage.from("character-images").getPublicUrl(imageUpload.path).publicURL,
        }),
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
