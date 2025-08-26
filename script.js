const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const result = document.getElementById("result");
const scanBtn = document.getElementById("scanBtn");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
  } catch (err) {
    console.error("Camera error:", err);
    result.textContent = "Camera not available";
  }
}

scanBtn.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Здесь можно подключить lib для сканирования QR, например jsQR
  result.textContent = "📷 Frame captured (QR scanning library required)";
});

startCamera();
