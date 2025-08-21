import Chat from "../components/Chat";

export default function ChatPage() {
  return (
    <Chat
      initialMessages={[
        { sender: "ai", text: "Привет! Я — ИИ-помощник. Давай создадим твой музыкальный клип!" }
      ]}
    />
  );
}
