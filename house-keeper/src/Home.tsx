import "./Home.css";

export function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem-vindo(a), Usuário</h1>
        <button className="logout-button">Sair</button>
      </header>

      <main className="dashboard">
        <section className="card">
          <h2>Dispositivos</h2>
          <p>10 dispositivos conectados</p>
        </section>

        <section className="card">
          <h2>Alertas</h2>
          <p>2 alertas ativos</p>
        </section>

        <section className="card">
          <h2>Última Atividade</h2>
          <p>Hoje às 08:30</p>
        </section>
      </main>
    </div>
  );
}