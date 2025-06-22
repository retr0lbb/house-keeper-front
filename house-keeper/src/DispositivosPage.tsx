import { useState } from 'react';

interface Device {
  id: number;
  nome: string;
}

const mockDevices: Device[] = [
  { id: 1, nome: 'Lâmpada da Sala' },
  { id: 2, nome: 'Tomada Inteligente da Cozinha' },
  { id: 3, nome: 'Sensor de Porta da Entrada' },
];

export default function DispositivosPage() {
  const [devices, setDevices] = useState(mockDevices);

  return (
    <div>
      <h1>Meus Dispositivos</h1>
      <div className="device-list">
        {devices.map(device => (
          <div key={device.id} className="device-item">
            <span>{device.nome}</span>
            <div className="device-actions">
              <button>Editar</button>
              <button>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}