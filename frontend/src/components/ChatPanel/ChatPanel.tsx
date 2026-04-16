import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { chatAPI } from '../../services/chatAPI';
import type { Mensaje } from '../../types';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatInput from '../ChatInput/ChatInput';
import { styles } from './ChatPanelStyles';

interface ChatPanelProps {
  clienteId?: string;
  titulo?: string;
}

const POLL_INTERVAL = 3000;

const ChatPanel = ({ clienteId, titulo = 'Chat con AutoFlow' }: ChatPanelProps) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nombreAdmin, setNombreAdmin] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  const prevLengthRef = useRef(0);
  const esAdmin = user?.rol === 'admin' || user?.rol === 'superadmin';

  const fetchMensajes = useCallback(async () => {
    try {
      const data = await chatAPI.getMensajes(clienteId);
      if (mountedRef.current) {
        setMensajes(data);
        setError(false);
      }
    } catch {
      // Silencioso en polling
    }
  }, [clienteId]);

  // Carga inicial + marcar leidos
  useEffect(() => {
    mountedRef.current = true;
    const init = async () => {
      try {
        const data = await chatAPI.getMensajes(clienteId);
        if (mountedRef.current) setMensajes(data);
        await chatAPI.marcarLeidos(esAdmin ? clienteId : undefined);
      } catch {
        if (mountedRef.current) setError(true);
      }
    };
    init();

    if (!esAdmin) {
      chatAPI.getMiAdmin().then(nombre => {
        if (mountedRef.current) setNombreAdmin(nombre);
      });
    }

    return () => { mountedRef.current = false; };
  }, [clienteId, esAdmin]);

  // Polling
  useEffect(() => {
    const id = setInterval(fetchMensajes, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchMensajes]);

  // Scroll al ultimo mensaje — solo si el usuario esta cerca del final o es carga inicial
  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;
    const isInitialLoad = prevLengthRef.current === 0 && mensajes.length > 0;
    const hasNewMessages = mensajes.length > prevLengthRef.current;

    if (isInitialLoad) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    } else if (hasNewMessages && isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    prevLengthRef.current = mensajes.length;
  }, [mensajes]);

  const handleEnviar = async (contenido: string) => {
    setLoading(true);
    try {
      const nuevo = await chatAPI.enviarMensaje(contenido, esAdmin ? clienteId : undefined);
      setMensajes(prev => [...prev, nuevo]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper(theme)}>
      <div className={styles.header(theme)}>
        {titulo}
        {!esAdmin && nombreAdmin && (
          <span className="ml-2 text-xs font-normal opacity-60">· {nombreAdmin}</span>
        )}
      </div>
      <div className={styles.messages} ref={messagesRef}>
        {error && (
          <div className={styles.error}>
            No se pudo cargar el chat. Recarga la pagina.
          </div>
        )}
        {!error && mensajes.length === 0 && (
          <div className={styles.empty(theme)}>
            Aun no hay mensajes.<br />Escribe al equipo de AutoFlow.
          </div>
        )}
        {mensajes.map(m => (
          <ChatMessage
            key={m._id}
            mensaje={m}
            esPropio={esAdmin ? m.remitente === 'admin' : m.remitente === 'cliente'}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onEnviar={handleEnviar} loading={loading} />
    </div>
  );
};

export default ChatPanel;
