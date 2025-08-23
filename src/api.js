// src/api.js
const env = import.meta.env;

export const GUMROAD_URL = env.VITE_GUMROAD_URL || "https://gumroad.com/";
export const MAKE_VALIDATE_QR = env.VITE_MAKE_VALIDATE_QR_HOOK || "";
export const MAKE_CHAT = env.VITE_MAKE_CHAT_HOOK || "";
export const MAKE_LYRICS = env.VITE_MAKE_LYRICS_HOOK || "";
export const MAKE_OPENART = env.VITE_MAKE_OPENART_HOOK || "";
export const MAKE_KITS = env.VITE_MAKE_KITS_HOOK || "";

/**
 * Helpers that call Make webhooks
 * Each returns JSON (Make should return JSON).
 */

export async function validateQr(code) {
  if (!MAKE_VALIDATE_QR) throw new Error("Make validate hook not set");
  const res = await fetch(MAKE_VALIDATE_QR, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });
  return res.json();
}

export async function sendChatMessage(sessionId, message, lang) {
  if (!MAKE_CHAT) throw new Error("Make chat hook not set");
  const res = await fetch(MAKE_CHAT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, message, lang })
  });
  return res.json();
}

export async function generateLyrics(sessionId, outline, lang) {
  if (!MAKE_LYRICS) throw new Error("Make lyrics hook not set");
  const res = await fetch(MAKE_LYRICS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, outline, lang })
  });
  return res.json();
}

export async function generateImage(sessionId, prompt) {
  if (!MAKE_OPENART) throw new Error("Make openart hook not set");
  const res = await fetch(MAKE_OPENART, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, prompt })
  });
  return res.json();
}

export async function generateSongKits(sessionId, lyrics, lang, useUserVoice=false) {
  if (!MAKE_KITS) throw new Error("Make kits hook not set");
  const res = await fetch(MAKE_KITS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, lyrics, lang, useUserVoice })
  });
  return res.json();
}
