import type { Mensaje } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './ChatMessageStyles';

interface ChatMessageProps {
  mensaje: Mensaje;
  esPropio: boolean;
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const hoy = new Date();
  const esHoy =
    date.getDate() === hoy.getDate() &&
    date.getMonth() === hoy.getMonth() &&
    date.getFullYear() === hoy.getFullYear();

  if (esHoy) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

const ChatMessage = ({ mensaje, esPropio }: ChatMessageProps) => {
  const { theme } = useTheme();

  return (
    <div className={styles.wrapper(esPropio)}>
      <div className="max-w-[50%]">
        <div className={`${styles.bubble(esPropio, theme)} ${mensaje.contenido.length < 20 ? 'text-center' : ''}`}>
          {mensaje.contenido}
        </div>
        <p className={styles.meta(esPropio, theme)}>
          {formatTimestamp(mensaje.timestamp)}
          {esPropio && mensaje.leido && <span className="ml-1">✓</span>}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
