import type { CitaPayload } from '../types/index';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const citasAPI = {
  async agendarCita(payload: CitaPayload): Promise<void> {
    const response = await fetch(`${BASE_URL}/agendar-cita`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar la solicitud.');
    }
  },
};
