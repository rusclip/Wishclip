export const LANGS = {
  en: { name: "English", heroTitle: "Create a personalized musical video greeting", question: "Do you have a QR code?", yes: "Yes", no: "No", enterQr: "Enter your QR code", check: "Check", invalid: "Invalid or unpaid QR code", buy: "Buy access ($30)" },
  ru: { name: "Русский", heroTitle: "Создайте персональный музыкальный клип", question: "У вас есть QR-код?", yes: "Да", no: "Нет", enterQr: "Введите QR-код", check: "Проверить", invalid: "Неверный или неоплаченный QR-код", buy: "Купить доступ ($30)" },
  es: { name: "Español", heroTitle: "Crea un videoclip musical personalizado", question: "¿Tienes un código QR?", yes:"Sí", no:"No", enterQr:"Introduce tu QR", check:"Verificar", invalid:"QR inválido", buy:"Comprar acceso ($30)" },
  fr: { name:"Français", heroTitle:"Créez un clip musical personnalisé", question:"Avez-vous un QR ?", yes:"Oui", no:"Non", enterQr:"Saisissez votre QR", check:"Vérifier", invalid:"QR invalide", buy:"Acheter l'accès ($30)" },
  de: { name:"Deutsch", heroTitle:"Erstelle ein persönliches Musikvideo", question:"Hast du einen QR-Code?", yes:"Ja", no:"Nein", enterQr:"QR eingeben", check:"Prüfen", invalid:"Ungültiger QR", buy:"Zugang kaufen ($30)" },
  it: { name:"Italiano", heroTitle:"Crea un videoclip musicale personalizzato", question:"Hai un codice QR?", yes:"Sì", no:"No", enterQr:"Inserisci QR", check:"Verifica", invalid:"QR non valido", buy:"Compra accesso ($30)" },
  ka: { name:"ქართული", heroTitle:"...", question:"QR გაქვთ?", yes:"დიახ", no:"არა", enterQr:"QR შეიყვანეთ", check:"შემოწმება", invalid:"არასწორი QR", buy:"გაყიდვა ($30)" },
  hy: { name:"Հայերեն", heroTitle:"...", question:"QR ունեք?", yes:"Այո", no:"Ոչ", enterQr:"QR մուտքագրեք", check:"Ստուգել", invalid:"Սխալ QR", buy:"Գնել ($30)" },
  az: { name:"Azərbaycanca", heroTitle:"...", question:"QR var?", yes:"Bəli", no:"Xeyr", enterQr:"QR daxil et", check:"Yoxla", invalid:"Yanlış QR", buy:"Al ($30)" },
  uk: { name:"Українська", heroTitle:"...", question:"Чи маєте QR?", yes:"Так", no:"Ні", enterQr:"Введіть QR", check:"Перевірити", invalid:"Невірний QR", buy:"Купити ($30)" },
  uz: { name:"O‘zbekcha", heroTitle:"...", question:"QR bormi?", yes:"Ha", no:"Yoʻq", enterQr:"QR kiriting", check:"Tekshirish", invalid:"Notoʻgʻri QR", buy:"Sotib olish ($30)" }
};

export function detectLang() {
  const saved = localStorage.getItem("wishclip_lang");
  if (saved && LANGS[saved]) return saved;
  const nav = (navigator.language || 'en').slice(0,2).toLowerCase();
  if (LANGS[nav]) return nav;
  return 'en';
}
