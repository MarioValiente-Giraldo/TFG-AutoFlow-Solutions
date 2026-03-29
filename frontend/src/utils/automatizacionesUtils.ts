import type { Automatizacion } from '../types';

// Colores de badge compartidos por admin y cliente
const BADGE_COLOR_MAP: Record<string, string> = {
  pendiente_revision: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
  aceptada_pendiente_cliente: 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400',
  en_desarrollo: 'bg-violet-400/10 border-violet-400/30 text-violet-400',
  terminada: 'bg-green-500/10 border-green-500/30 text-green-400',
  rechazada: 'bg-red-500/10 border-red-500/30 text-red-400',
};

export const getBadgeClass = (estado: string): string =>
  `text-xs font-medium px-2.5 py-1 rounded-full border ${BADGE_COLOR_MAP[estado] ?? 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`;

// Labels desde la perspectiva del admin
export const ESTADO_LABELS_ADMIN: Record<string, string> = {
  pendiente_revision: 'Pendiente revisión',
  aceptada_pendiente_cliente: 'Esperando cliente',
  en_desarrollo: 'En desarrollo',
  terminada: 'Terminada',
  rechazada: 'Rechazada',
};

// Labels desde la perspectiva del cliente
export const ESTADO_LABELS_CLIENTE: Record<string, string> = {
  pendiente_revision: 'Pendiente revisión',
  aceptada_pendiente_cliente: 'Propuesta recibida',
  en_desarrollo: 'En desarrollo',
  terminada: 'Terminada',
  rechazada: 'Rechazada',
};

// Tabs para el panel de admin
export type TabEstado = 'todos' | Automatizacion['estado'];

export const TABS_ADMIN: { key: TabEstado; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendiente_revision', label: 'Pendiente revisión' },
  { key: 'aceptada_pendiente_cliente', label: 'Esperando cliente' },
  { key: 'en_desarrollo', label: 'En desarrollo' },
  { key: 'terminada', label: 'Terminada' },
  { key: 'rechazada', label: 'Rechazada' },
];
