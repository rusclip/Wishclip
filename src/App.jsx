import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to WishClip</h1>
      <div className="space-x-4">
        <Link
          to="/step1"
          className="px-6 py-3 bg-white text-purple-600 rounded-xl shadow hover:bg-gray-100"
        >
          Да
        </Link>
        <Link
          to="/step2"
          className="px-6 py-3 bg-white text-purple-600 rounded-xl shadow hover:bg-gray-100"
        >
          Нет
        </Link>
      </div>
    </div>
  );
}

function Step1() {
  return <h2 className="text-2xl text-center mt-20">Step 1 page</h2>;
}

function Step2() {
  return <h2 className="text-2xl text-center mt-20">Step 2 page</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
      </Routes>
    </Router>
  );
}
