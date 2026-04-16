import { authFetch } from './apiClient';
import type { Mensaje, HiloResumen } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const chatAPI = {
  async enviarMensaje(contenido: string, clienteId?: string): Promise<Mensaje> {
    const body: Record<string, string> = { contenido };
    if (clienteId) body.cliente_id = clienteId;

    const res = await authFetch(`${BASE_URL}/chat/mensaje`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al enviar mensaje');
    return data.mensaje as Mensaje;
  },

  async getMensajes(clienteId?: string, limit = 50, before?: string): Promise<Mensaje[]> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (clienteId) params.set('cliente_id', clienteId);
    if (before) params.set('before', before);

    const res = await authFetch(`${BASE_URL}/chat/mensajes?${params}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener mensajes');
    return data.mensajes as Mensaje[];
  },

  async getUnreadCount(): Promise<{ count: number; clientes_con_mensajes?: number }> {
    const res = await authFetch(`${BASE_URL}/chat/unread-count`);
    if (!res.ok) return { count: 0 };
    const data = await res.json();
    return { count: data.count, clientes_con_mensajes: data.clientes_con_mensajes };
  },

  async marcarLeidos(clienteId?: string): Promise<void> {
    const body: Record<string, string> = {};
    if (clienteId) body.cliente_id = clienteId;

    await authFetch(`${BASE_URL}/chat/marcar-leidos`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  async getHilos(): Promise<HiloResumen[]> {
    const res = await authFetch(`${BASE_URL}/chat/hilos`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener hilos');
    return data.hilos as HiloResumen[];
  },

  async getMiAdmin(): Promise<string | null> {
    const res = await authFetch(`${BASE_URL}/chat/mi-admin`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.nombre_admin ?? null;
  },
};
