document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("btnYes");
  const noBtn = document.getElementById("btnNo");

  yesBtn.addEventListener("click", () => {
    const qr = prompt("Введите ваш QR-код:");
    if (qr && qr.trim().length > 3) {
      alert("QR-код принят ✅ (здесь будет проверка через API)");
      // Здесь позже подключим Make для проверки
    } else {
      alert("QR-код неверный ❌");
    }
  });

  noBtn.addEventListener("click", () => {
    window.location.href = "https://your-gumroad-link.com"; 
    // заменим ссылку на реальную
  });
});
