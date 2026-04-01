import type { Automatizacion } from '../types';

// Colores de badge compartidos por admin y cliente
const BADGE_COLOR_MAP: Record<string, string> = {
  pendiente_revision:     'bg-amber-400/10 border-amber-400/30 text-amber-400',
  pendiente_pago_anticipo:'bg-blue-500/10 border-blue-500/30 text-blue-400',
  en_desarrollo:          'bg-violet-400/10 border-violet-400/30 text-violet-400',
  pendiente_pago_final:   'bg-cyan-400/10 border-cyan-400/30 text-cyan-400',
  terminada:              'bg-green-500/10 border-green-500/30 text-green-400',
  rechazada:              'bg-red-500/10 border-red-500/30 text-red-400',
  cancelada:              'bg-orange-500/10 border-orange-500/30 text-orange-400',
};

/**
 * Devuelve las clases Tailwind completas para el badge de estado de una automatización.
 * Incluye color de fondo, borde y texto según el estado.
 * @param estado - Estado actual de la automatización.
 * @returns String de clases Tailwind listo para usar en `className`.
 */
export const getBadgeClass = (estado: string): string =>
  `text-xs font-medium px-2.5 py-1 rounded-full border ${BADGE_COLOR_MAP[estado] ?? 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`;

/** Labels de estado desde la perspectiva del admin. */
export const ESTADO_LABELS_ADMIN: Record<string, string> = {
  pendiente_revision:      'Pendiente revisión',
  pendiente_pago_anticipo: 'Pendiente anticipo',
  en_desarrollo:           'En desarrollo',
  pendiente_pago_final:    'Pendiente pago final',
  terminada:               'Terminada',
  rechazada:               'Rechazada',
  cancelada:               'Cancelada',
};

/** Labels de estado desde la perspectiva del cliente. */
export const ESTADO_LABELS_CLIENTE: Record<string, string> = {
  pendiente_revision:      'Pendiente revisión',
  pendiente_pago_anticipo: 'Pagar anticipo (50%)',
  en_desarrollo:           'En desarrollo',
  pendiente_pago_final:    'Pagar resto (50%)',
  terminada:               'Terminada',
  rechazada:               'Rechazada',
  cancelada:               'Cancelada',
};

/** Tipo para las pestañas de filtrado del panel admin. */
export type TabEstado = 'todos' | Automatizacion['estado'];

/** Definición de pestañas del panel admin con su clave de estado y label visible. */
export const TABS_ADMIN: { key: TabEstado; label: string }[] = [
  { key: 'todos',                label: 'Todos' },
  { key: 'pendiente_revision',   label: 'Pendiente revisión' },
  { key: 'pendiente_pago_anticipo', label: 'Pendiente anticipo' },
  { key: 'en_desarrollo',        label: 'En desarrollo' },
  { key: 'pendiente_pago_final', label: 'Pendiente pago final' },
  { key: 'terminada',            label: 'Terminada' },
  { key: 'rechazada',            label: 'Rechazada' },
  { key: 'cancelada',            label: 'Cancelada' },
];
