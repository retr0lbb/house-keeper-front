import { useState, useEffect } from 'react';

interface Device {
  id: number;
  nome: string;
}

export default function DispositivosPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/dispositivos');
        if (!response.ok) {
          throw new Error('Falha na comunicação com o backend. O servidor está no ar?');
        }
        const data: Device[] = await response.json();
        setDevices(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName.trim()) {
      alert('Por favor, digite um nome para o dispositivo.');
      return;
    }
    const newDevice: Device = {
      id: Date.now(),
      nome: newDeviceName,
    };
    setDevices([...devices, newDevice]);
    setNewDeviceName('');
  };

  const handleDeleteDevice = (idParaExcluir: number) => {
    const novaListaDeDevices = devices.filter(device => device.id !== idParaExcluir);
    setDevices(novaListaDeDevices);
  };

  if (loading) {
    return <div><h1>Meus Dispositivos</h1><p>Carregando dispositivos...</p></div>;
  }

  if (error) {
    return <div><h1>Meus Dispositivos</h1><p style={{ color: 'red' }}>Erro: {error}</p></div>;
  }

  return (
    <div>
      <h1>Meus Dispositivos</h1>
      <form onSubmit={handleAddDevice} className="add-device-form">
        <input
          type="text"
          placeholder="Nome do novo dispositivo"
          value={newDeviceName}
          onChange={(e) => setNewDeviceName(e.target.value)}
        />
        <button type="submit">Adicionar Dispositivo</button>
      </form>
      <hr />
      <div className="device-list">
        {devices.length === 0 ? (
          <p>Nenhum dispositivo encontrado.</p>
        ) : (
          devices.map(device => (
            <div key={device.id} className="device-item">
              <span>{device.nome}</span>
              <div className="device-actions">
                <button>Editar</button>
                <button onClick={() => handleDeleteDevice(device.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}