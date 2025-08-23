import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QR from "./pages/QR";
import Chat from "./pages/Chat";
import Payment from "./pages/Payment";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/qr" element={<QR />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
