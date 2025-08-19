document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    // сообщение пользователя
    addMessage("user", text);
    userInput.value = "";

    // имитация ответа GPT
    setTimeout(() => {
      addMessage("bot", "Спасибо! Расскажите, для кого песня — сколько лет имениннику?");
    }, 800);
  });
});
