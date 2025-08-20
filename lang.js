// lang.js

const translations = {
  en: {
    index: {
      title: "Welcome to WishClip!",
      subtitle: "Do you want to create your personalized music video?",
      yes: "Yes",
      no: "No"
    },
    yes: {
      title: "Enter Your QR Code",
      placeholder: "Enter code here",
      submit: "Submit"
    },
    no: {
      title: "Maybe next time!",
      subtitle: "Come back when you are ready 🎵"
    }
  },
  ru: {
    index: {
      title: "Добро пожаловать в WishClip!",
      subtitle: "Хотите создать свой персональный музыкальный клип?",
      yes: "Да",
      no: "Нет"
    },
    yes: {
      title: "Введите ваш QR-код",
      placeholder: "Введите код здесь",
      submit: "Отправить"
    },
    no: {
      title: "Может в следующий раз!",
      subtitle: "Возвращайтесь, когда будете готовы 🎵"
    }
  },
  kk: {
    index: {
      title: "WishClip-ке қош келдіңіз!",
      subtitle: "Өзіңіздің жеке музыкалық клипті жасағыңыз келе ме?",
      yes: "Иә",
      no: "Жоқ"
    },
    yes: {
      title: "QR-кодты енгізіңіз",
      placeholder: "Кодты осында енгізіңіз",
      submit: "Жіберу"
    },
    no: {
      title: "Бәлкім, келесі жолы!",
      subtitle: "Дайын болғанда қайта оралыңыз 🎵"
    }
  }
};

function detectDefaultLanguage() {
  // если язык уже сохранён — используем его
  let savedLang = localStorage.getItem("lang");
  if (savedLang) return savedLang;

  // по умолчанию — английский
  let defaultLang = "en";

  // определяем язык браузера
  const browserLang = navigator.language.slice(0, 2).toLowerCase();

  if (["en", "ru", "kk"].includes(browserLang)) {
    defaultLang = browserLang;
  }

  // сохраняем выбор
  localStorage.setItem("lang", defaultLang);
  return defaultLang;
}

function applyLanguage(page) {
  const currentLang = detectDefaultLanguage();
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

function changeLanguage(page) {
  const lang = document.getElementById("language").value;
  localStorage.setItem("lang", lang);
  applyLanguage(page);
}
