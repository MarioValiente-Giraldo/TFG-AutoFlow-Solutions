import type { CitaPayload, Cita } from '../types/index';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const citasAPI = {
  /**
   * Envía una solicitud de cita al backend con los datos del formulario.
   * @param payload - Objeto con `nombre`, `email`, `telefono`, `empresa`, `tipoAutomatizacion`, `descripcion`, `fechaPreferida` y `franjaHoraria`.
   * @returns Void. Lanza error si la petición falla o faltan campos obligatorios.
   */
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

  async getMisCitas(email: string): Promise<{ data: Cita[] }> {
    const response = await fetch(`${BASE_URL}/citas?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al obtener las citas.');
    return data;
  },

  async getAllCitas(): Promise<{ data: Cita[] }> {
    const response = await fetch(`${BASE_URL}/admin/citas`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al obtener las citas.');
    return data;
  },

  async marcarAtendida(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/citas/${id}/marcar-atendida`, { method: 'PATCH' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al marcar la cita.');
  },
};
