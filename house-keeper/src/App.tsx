import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import DispositivosPage from "./DispositivosPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/dispositivos" element={<DispositivosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;