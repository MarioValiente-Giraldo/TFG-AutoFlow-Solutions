import type { AutomatizacionPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Crea una nueva automatización asociada al usuario autenticado.
 * @param payload - Datos de la automatización: título, descripción, tipo, email/nombre del propietario e id de cita origen (opcional).
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
 * Obtiene una automatización concreta por su identificador único.
 * @param id - Identificador único de la automatización.
 * @returns Objeto con `success` y `data` (la automatización).
 */
export async function getAutomatizacion(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}`);
  if (!res.ok) throw new Error('Error al obtener la automatización');
  return res.json();
}

/**
 * Obtiene todas las automatizaciones del sistema. Solo para uso del admin.
 * @returns Objeto con `success` y `data` (array de todas las automatizaciones).
 */
export async function getAllAutomatizaciones() {
  const res = await fetch(`${API_URL}/automatizaciones`);
  if (!res.ok) throw new Error('Error al obtener automatizaciones');
  return res.json();
}

/**
 * Obtiene las automatizaciones pertenecientes a un usuario concreto.
 * @param userId - Identificador único del usuario propietario.
 * @returns Objeto con `success` y `data` (array de automatizaciones del usuario).
 */
export async function getMisAutomatizaciones(userId: string) {
  const res = await fetch(`${API_URL}/automatizaciones/mis-automatizaciones?userId=${userId}`);
  if (!res.ok) throw new Error('Error al obtener tus automatizaciones');
  return res.json();
}

/**
 * Admin acepta una automatización en estado `pendiente_revision`, asigna el gasto estimado
 * y se la asigna a sí mismo. Pasa el estado a `pendiente_pago_anticipo`.
 * @param id - Identificador único de la automatización.
 * @param gastoEstimado - Coste total estimado en euros.
 * @param identificadorAdmin - ID del admin que acepta.
 * @param nombreAdmin - Nombre del admin que acepta.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function aceptarAdmin(id: string, gastoEstimado: number, identificadorAdmin: string, nombreAdmin: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/aceptar-admin`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      gasto_estimado: gastoEstimado,
      identificador_admin: identificadorAdmin,
      nombre_admin: nombreAdmin,
    }),
  });
  if (!res.ok) throw new Error('Error al aceptar');
  return res.json();
}

/**
 * Admin rechaza una automatización en estado `pendiente_revision` indicando el motivo.
 * Pasa el estado a `rechazada`.
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
 * Admin marca una automatización en `en_desarrollo` como terminada.
 * Pasa el estado a `pendiente_pago_final` para que el cliente realice el pago restante.
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

/**
 * Cancela una automatización. Permitido en estados: `pendiente_revision`,
 * `pendiente_pago_anticipo`, `en_desarrollo` y `pendiente_pago_final`.
 * @param id - Identificador único de la automatización.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function cancelarAutomatizacion(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/cancelar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al cancelar');
  return res.json();
}

/**
 * Crea una sesión de pago en Stripe para el anticipo (50% del gasto total).
 * Devuelve la URL de Stripe Checkout a la que redirigir al cliente.
 * @param id - Identificador único de la automatización en estado `pendiente_pago_anticipo`.
 * @returns Objeto con `success` y `url` (URL de Stripe Checkout).
 */
export async function crearSesionPagoAnticipo(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/crear-sesion-pago-anticipo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error al crear la sesión de pago');
  return res.json();
}

/**
 * Crea una sesión de pago en Stripe para el pago final (50% restante del gasto total).
 * Devuelve la URL de Stripe Checkout a la que redirigir al cliente.
 * @param id - Identificador único de la automatización en estado `pendiente_pago_final`.
 * @returns Objeto con `success` y `url` (URL de Stripe Checkout).
 */
export async function crearSesionPagoFinal(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/crear-sesion-pago-final`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error al crear la sesión de pago');
  return res.json();
}

/**
 * Envía la valoración del cliente para una automatización en estado `terminada`.
 * Solo se puede valorar una vez.
 * @param id - Identificador único de la automatización.
 * @param puntuacion - Entero del 1 al 5.
 * @param comentario - Texto opcional del cliente.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function valorarAutomatizacion(id: string, puntuacion: number, comentario: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/valorar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puntuacion, comentario }),
  });
  if (!res.ok) throw new Error('Error al enviar la valoración');
  return res.json();
}

/**
 * Admin publica una actualización de progreso en una automatización `en_desarrollo`.
 * El porcentaje debe ser mayor que el de la última actualización publicada.
 * @param id - Identificador único de la automatización.
 * @param mensaje - Descripción del avance realizado.
 * @param porcentaje - Porcentaje de completado (0–100), debe ser creciente.
 * @returns Respuesta del servidor con `success` y `message`.
 */
export async function publicarActualizacion(id: string, mensaje: string, porcentaje: number) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/actualizar-desarrollo`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje, porcentaje }),
  });
  if (!res.ok) throw new Error('Error al publicar la actualización');
  return res.json();
}
