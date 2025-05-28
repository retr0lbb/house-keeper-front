import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}





