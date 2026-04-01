import type { AutomatizacionPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function crearAutomatizacion(payload: AutomatizacionPayload) {
  const res = await fetch(`${API_URL}/automatizaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al crear la automatización');
  return res.json();
}

export async function getAutomatizacion(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}`);
  if (!res.ok) throw new Error('Error al obtener la automatización');
  return res.json();
}

export async function getAllAutomatizaciones() {
  const res = await fetch(`${API_URL}/automatizaciones`);
  if (!res.ok) throw new Error('Error al obtener automatizaciones');
  return res.json();
}

export async function getMisAutomatizaciones(userId: string) {
  const res = await fetch(`${API_URL}/automatizaciones/mis-automatizaciones?userId=${userId}`);
  if (!res.ok) throw new Error('Error al obtener tus automatizaciones');
  return res.json();
}

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

export async function rechazarAdmin(id: string, motivoRechazo: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/rechazar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ motivo_rechazo: motivoRechazo }),
  });
  if (!res.ok) throw new Error('Error al rechazar');
  return res.json();
}

export async function marcarTerminada(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/marcar-terminada`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al marcar terminada');
  return res.json();
}

export async function cancelarAutomatizacion(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/cancelar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al cancelar');
  return res.json();
}

export async function crearSesionPagoAnticipo(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/crear-sesion-pago-anticipo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error al crear la sesión de pago');
  return res.json();
}

export async function crearSesionPagoFinal(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/crear-sesion-pago-final`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error al crear la sesión de pago');
  return res.json();
}

export async function valorarAutomatizacion(id: string, puntuacion: number, comentario: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/valorar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puntuacion, comentario }),
  });
  if (!res.ok) throw new Error('Error al enviar la valoración');
  return res.json();
}

export async function publicarActualizacion(id: string, mensaje: string, porcentaje: number) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/actualizar-desarrollo`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje, porcentaje }),
  });
  if (!res.ok) throw new Error('Error al publicar la actualización');
  return res.json();
}
