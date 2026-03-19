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

export async function aceptarAdmin(id: string, gastoEstimado: number) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/aceptar-admin`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gasto_estimado: gastoEstimado }),
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

export async function aceptarCliente(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/aceptar-cliente`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al aceptar propuesta');
  return res.json();
}

export async function marcarDesarrollo(id: string) {
  const res = await fetch(`${API_URL}/automatizaciones/${id}/marcar-desarrollo`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Error al marcar en desarrollo');
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
