document.addEventListener("DOMContentLoaded", function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (yesBtn) {
    yesBtn.addEventListener("click", function () {
      // Пользователь выбрал "Да, у меня есть QR"
      // (тут будет проверка QR, пока сделаем редирект для теста)
      window.location.href = "chat.html"; 
    });
  }

  if (noBtn) {
    noBtn.addEventListener("click", function () {
      // Пользователь выбрал "Нет, у меня нет QR"
      // (отправляем на оплату через Gumroad)
      window.location.href = "https://gumroad.com/"; 
    });
  }
});
