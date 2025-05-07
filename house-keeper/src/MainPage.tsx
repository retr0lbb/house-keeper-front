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
          <div className="card">🌞 28°C<br /><small>Clima local</small></div>
          <div className="card">⚡ 18 Kwh<br /><small>Consumo de energia</small></div>
          <div className="card">📅 24 de Janeiro<br /><small>Agenda de hoje</small></div>
        </section>

        <section className="tasks">
          <div className="task">Sistema de irrigação da tarde – 14:30</div>
          <div className="task destaque">Sistema de limpeza de piscina – 16:12</div>
        </section>
      </main>
    </div>
  );
}
