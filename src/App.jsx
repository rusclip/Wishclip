import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Привет! Хочешь создать свой клип?</h1>
      <div className="flex gap-4">
        <Link
          to="/step1"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Да
        </Link>
        <Link
          to="/no"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Нет
        </Link>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Шаг 1: Загрузи фото</h1>
      <Link to="/" className="mt-4 underline">
        ← Назад
      </Link>
    </div>
  );
}

function NoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Жаль! Может, в следующий раз 😊</h1>
      <Link to="/" className="mt-4 underline">
        ← Назад
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/step1" element={<Step1 />} />
      <Route path="/no" element={<NoPage />} />
    </Routes>
  );
}
