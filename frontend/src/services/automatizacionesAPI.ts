import type { AutomatizacionPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Crea una nueva automatización asociada al usuario autenticado.
 * @param payload - Objeto con `titulo`, `descripcion`, `tipo_automatizacion`, `identificador_propietario`, `email_propietario` y `nombre_propietario`.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function crearAutomatizacion(payload: AutomatizacionPayload) {
  const res = await fetch(`${API_URL}/automatizaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al crear la automatización');
  return res.json();
}

/**
 * Obtiene todas las automatizaciones del sistema. Solo para uso del admin.
 * @returns Objeto con `success` y `data` (array de `Automatizacion`).
 */
export async function getAllAutomatizaciones() {
  const res = await fetch(`${API_URL}/automatizaciones`);
  if (!res.ok) throw new Error('Error al obtener automatizaciones');
  return res.json();
}

/**
 * Obtiene las automatizaciones pertenecientes a un usuario concreto.
 * @param userId - Identificador único del usuario propietario.
 * @returns Objeto con `success` y `data` (array de `Automatizacion` del usuario).
 */
export async function getMisAutomatizaciones(userId: string) {
  const res = await fetch(`${API_URL}/automatizaciones/mis-automatizaciones?userId=${userId}`);
  if (!res.ok) throw new Error('Error al obtener tus automatizaciones');
  return res.json();
}

/**
 * Admin acepta una automatización en estado `pendiente_revision` y establece el gasto estimado.
 * @param id - Identificador único de la automatización.
 * @param gastoEstimado - Coste estimado en euros para realizar la automatización.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function aceptarAdmin(id: string, gastoEstimado: number) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/aceptar-admin`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gasto_estimado: gastoEstimado }),
  });
  if (!res.ok) throw new Error('Error al aceptar');
  return res.json();
}

/**
 * Admin rechaza una automatización en estado `pendiente_revision` indicando el motivo.
 * @param id - Identificador único de la automatización.
 * @param motivoRechazo - Texto explicando el motivo del rechazo.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function rechazarAdmin(id: string, motivoRechazo: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/rechazar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ motivo_rechazo: motivoRechazo }),
  });
  if (!res.ok) throw new Error('Error al rechazar');
  return res.json();
}

/**
 * Cliente acepta la propuesta económica, pasando la automatización a estado `en_desarrollo`.
 * @param id - Identificador único de la automatización.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function aceptarCliente(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/aceptar-cliente`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al aceptar propuesta');
  return res.json();
}

/**
 * Admin marca una automatización como `en_desarrollo` desde `aceptada_pendiente_cliente`.
 * @param id - Identificador único de la automatización.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function marcarDesarrollo(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/marcar-desarrollo`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al marcar en desarrollo');
  return res.json();
}

/**
 * Admin marca una automatización en estado `en_desarrollo` como `terminada`.
 * @param id - Identificador único de la automatización.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function marcarTerminada(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/marcar-terminada`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al marcar terminada');
  return res.json();
}
