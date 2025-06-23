import { useState, useEffect } from 'react';

interface Device {
  id: string;
  deviceSlug: string;
  deviceSerial: string;
  roomId: string | null;
}

interface UpsertDeviceDto {
  deviceSlug: string;
  deviceSerial: string;
  roomId: string | null;
}

const API_URL = 'http://localhost:8080/devices';

export default function DispositivosPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceSlug, setDeviceSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL); // GET para /devices
      if (!response.ok) throw new Error('Falha ao buscar dispositivos do backend.');
      const data: Device[] = await response.json();
      setDevices(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceSlug.trim()) return;
    const newDevice: UpsertDeviceDto = {
      deviceSlug: deviceSlug,
      deviceSerial: `serial-${Date.now()}`,
      roomId: null,
    };
    try {
      const response = await fetch(API_URL, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDevice),
      });
      if (!response.ok) throw new Error('Falha ao criar o dispositivo.');
      setDeviceSlug('');
      fetchDevices();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao deletar o dispositivo.');
      fetchDevices();
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleUpdateDevice = async (id: string) => {
    const deviceToUpdate = devices.find(d => d.id === id);
    if (!deviceToUpdate || !editText.trim()) return;
    const updatedDevice: UpsertDeviceDto = {
      deviceSlug: editText,
      deviceSerial: deviceToUpdate.deviceSerial,
      roomId: deviceToUpdate.roomId
    };
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDevice)
        });
        if(!response.ok) throw new Error('Falha ao atualizar o dispositivo.');
        setEditingId(null);
        setEditText('');
        fetchDevices();
    } catch (err: any) {
        setError(err.message);
    }
  };

  const startEditing = (device: Device) => {
    setEditingId(device.id);
    setEditText(device.deviceSlug);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  if (loading) return <div><h1>Meus Dispositivos</h1><p>Carregando...</p></div>;
  if (error) return <div><h1>Meus Dispositivos</h1><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div>
      <h1>Meus Dispositivos</h1>
      <form onSubmit={handleAddDevice}>
        <input
          type="text"
          placeholder="Nome do novo dispositivo"
          value={deviceSlug}
          onChange={(e) => setDeviceSlug(e.target.value)}
        />
        <button type="submit">Adicionar Dispositivo</button>
      </form>
      <hr />
      <div className="device-list">
        {devices.length === 0 ? (<p>Nenhum dispositivo encontrado.</p>) : (
          devices.map(device => (
            <div key={device.id} className="device-item">
              {editingId === device.id ? (
                <>
                  <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <div className="device-actions">
                    <button onClick={() => handleUpdateDevice(device.id)}>Salvar</button>
                    <button onClick={cancelEditing}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{device.deviceSlug} (Serial: {device.deviceSerial})</span>
                  <div className="device-actions">
                    <button onClick={() => startEditing(device)}>Editar</button>
                    <button onClick={() => handleDeleteDevice(device.id)}>Excluir</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}