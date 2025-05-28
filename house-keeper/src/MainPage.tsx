import "./Home.css";

export default function MainPage() {
  return (
    <div className="main-container">
      <aside className="sidebar">
        <button className="icon-button">🏠</button>
        <button className="icon-button">📷</button>
        <button className="icon-button">💡</button>
        <button className="icon-button">🔒</button>
        <button className="icon-button">⚙️</button>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Welcome Home <strong>Henrique</strong></h1>
        </header>

        <section className="dashboard">
          <div className="card">
            <h2>Clima Local</h2>
            <p>28°C</p>
          </div>
          <div className="card">
            <h2>Consumo de Energia</h2>
            <p>18 Kwh</p>
          </div>
          <div className="card">
            <h2>Agenda de Hoje</h2>
            <p>24 de Janeiro</p>
          </div>
        </section>

        <section className="tasks">
          <div className="task">Sistema de irrigação da tarde – 14:30</div>
          <div className="task destaque">Sistema de limpeza de piscina – 16:12</div>
        </section>
      </main>
    </div>
  );
}

