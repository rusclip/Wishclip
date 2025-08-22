// api/validate-qr.js
// Vercel Serverless Function для проверки валидности QR-кода

import { createClient } from '@supabase/supabase-js';

// Инициализация клиента Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  // Проверяем метод запроса
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  // Получаем код из query-параметра
  const { code } = req.query;

  // Проверяем, передан ли код
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ valid: false, error: 'QR-код не указан или имеет неверный формат' });
  }

  try {
    // Запрос к Supabase: ищем QR-код со статусом 'paid'
    const { data, error } = await supabase
      .from('qrcodes')
      .select('status')
      .eq('qr_code', code.trim())
      .single(); // single() — ожидаем одну запись

    // Если ошибка или запись не найдена, или статус не 'paid'
    if (error || !data || data.status !== 'paid') {
      return res.json({ valid: false });
    }

    // QR-код валиден
    return res.json({ valid: true });

  } catch (err) {
    // Обработка ошибок (например, проблемы с подключением к Supabase)
    console.error('Ошибка при проверке QR-кода:', err);
    return res.status(500).json({ valid: false, error: 'Внутренняя ошибка сервера' });
  }
}
