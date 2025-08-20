// lang.js
let translations = {};
let currentLang = "en";

// Загружаем JSON с переводами
async function loadTranslations() {
  const res = await fetch("/translations.json");
  translations = await res.json();
  currentLang = detectDefaultLanguage();
}

// Определяем язык
function detectDefaultLanguage() {
  let savedLang = localStorage.getItem("lang");
  if (savedLang) return savedLang;

  let defaultLang = "en";
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  if (translations[browserLang]) {
    defaultLang = browserLang;
  }

  localStorage.setItem("lang", defaultLang);
  return defaultLang;
}

// Применяем перевод
function applyLanguage(page) {
  const t = translations[currentLang][page];
  if (!t) return;

  if (document.getElementById("title")) document.getElementById("title").textContent = t.title;
  if (document.getElementById("subtitle")) document.getElementById("subtitle").textContent = t.subtitle;
  if (document.getElementById("yes")) document.getElementById("yes").textContent = t.yes;
  if (document.getElementById("no")) document.getElementById("no").textContent = t.no;
  if (document.getElementById("input")) document.getElementById("input").placeholder = t.placeholder;
  if (document.getElementById("submit")) document.getElementById("submit").textContent = t.submit;

  if (document.getElementById("language")) {
    document.getElementById("language").value = currentLang;
  }
}

// Смена языка
function changeLanguage(page) {
  const lang = document.getElementById("language").value;
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyLanguage(page);
}
