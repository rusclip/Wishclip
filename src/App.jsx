import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import QR from "./pages/QR.jsx";
import Chat from "./pages/Chat.jsx";

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home onYes={() => navigate("/qr")} />} />
      <Route path="/qr" element={<QR onValidated={() => navigate("/chat")} />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Home onYes={() => navigate("/qr")} />} />
    </Routes>
  );
}
