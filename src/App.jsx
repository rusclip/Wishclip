import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import QRPage from "./pages/QRPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/qr" style={{ marginRight: "10px" }}>QR</Link>
        <Link to="/chat">Chat</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}
