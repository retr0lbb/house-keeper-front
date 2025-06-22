// src/App.tsx - TESTE DE ISOLAMENTO
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Vamos importar SOMENTE a página que sabemos que está 100% limpa agora
import DispositivosPage from "./DispositivosPage.tsx";

// As linhas abaixo foram desativadas para o teste
// import Login from "./Login";
// import Register from "./Register";
// import MainPage from "./MainPage";

import './App.css';

function App() {
  return (
    <BrowserRouter>
       {/* Adicionando um link direto para facilitar */}
       <Link to="/dispositivos">Ir para Dispositivos</Link>
       <hr/>
      <Routes>
        {/* Deixando SOMENTE a rota de dispositivos ativa */}
        <Route path="/dispositivos" element={<DispositivosPage />} />

        {/* Adicionando uma rota raiz para garantir que não caia em branco */}
        <Route path="/" element={<h1>Página raiz de teste. Clique no link acima.</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;