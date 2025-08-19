document.addEventListener("DOMContentLoaded", function () {
  console.log("JS подключён ✅");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (yesBtn) {
    yesBtn.addEventListener("click", function () {
      alert("Нажата кнопка: Да");
      window.location.href = "chat.html"; 
    });
  } else {
    console.error("Кнопка Да не найдена!");
  }

  if (noBtn) {
    noBtn.addEventListener("click", function () {
      alert("Нажата кнопка: Нет");
      window.location.href = "https://gumroad.com/"; 
    });
  } else {
    console.error("Кнопка Нет не найдена!");
  }
});
