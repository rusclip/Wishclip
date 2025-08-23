import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ valid: false, error: 'QR code not provided' });
  }

  const { data, error } = await supabase
    .from('qrcodes')
    .select('status')
    .eq('qr_code', code)
    .single();

  if (error || !data || data.status !== 'paid') {
    return res.json({ valid: false });
  }

  res.json({ valid: true });
}
