import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { chatAPI } from '../../services/chatAPI';
import type { HiloResumen } from '../../types';
import { styles } from './ChatHilosListStyles';

interface ChatHilosListProps {
  clienteSeleccionado: string | null;
  onSeleccionar: (clienteId: string, nombre: string) => void;
}

const ChatHilosList = ({ clienteSeleccionado, onSeleccionar }: ChatHilosListProps) => {
  const { theme } = useTheme();
  const [hilos, setHilos] = useState<HiloResumen[]>([]);
  const [busqueda, setBusqueda] = useState('');

  const fetchHilos = useCallback(async () => {
    try {
      const data = await chatAPI.getHilos();
      setHilos(data);
    } catch {
      // Silencioso
    }
  }, []);

  useEffect(() => {
    fetchHilos();
    const id = setInterval(fetchHilos, 5000);
    return () => clearInterval(id);
  }, [fetchHilos]);

  const hilosFiltrados = busqueda.trim()
    ? hilos.filter(h => h.nombre_cliente.toLowerCase().includes(busqueda.toLowerCase()))
    : hilos;

  return (
    <div className={styles.wrapper(theme)}>
      <div className={styles.header(theme)}>Conversaciones</div>
      <div className={styles.searchWrapper(theme)}>
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className={styles.searchInput(theme)}
        />
      </div>
      <div className={styles.list}>
        {hilosFiltrados.length === 0 && (
          <p className={styles.empty(theme)}>
            {busqueda ? 'Sin resultados.' : 'Sin clientes.'}
          </p>
        )}
        {hilosFiltrados.map(h => (
          <div
            key={h.cliente_id}
            className={styles.item(clienteSeleccionado === h.cliente_id, theme)}
            onClick={() => onSeleccionar(h.cliente_id, h.nombre_cliente)}
          >
            <div className={styles.row}>
              <p className={styles.nombre(theme)}>{h.nombre_cliente}</p>
              {h.unread_count > 0 && (
                <span className={styles.badge}>{h.unread_count}</span>
              )}
            </div>
            <p className={styles.preview(theme)}>
              {h.ultimo_mensaje ?? <span className="italic opacity-50">Sin mensajes aun</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHilosList;
