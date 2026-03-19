import type { AutomatizacionPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function crearAutomatizacion(payload: AutomatizacionPayload) {
  const response = await fetch(`${API_URL}/automatizaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Error al crear la automatización');
  return response.json();
}
