import type { CitaPayload, Cita } from '../types/index';
import { authFetch } from './apiClient';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const citasAPI = {
  /**
   * Envía una solicitud de cita al backend con los datos del formulario.
   * @param payload - Objeto con `nombre`, `email`, `telefono`, `empresa`, `tipoAutomatizacion`, `descripcion`, `fechaPreferida` y `franjaHoraria`.
   * @returns Void. Lanza error si la petición falla o faltan campos obligatorios.
   */
  async agendarCita(payload: CitaPayload): Promise<void> {
    const response = await authFetch(`${BASE_URL}/agendar-cita`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar la solicitud.');
    }
  },

  /**
   * Obtiene las citas de un cliente concreto filtradas por email.
   * @param email - Email del cliente propietario de las citas.
   * @returns Objeto con `data` (array de `Cita` del cliente).
   */
  async getMisCitas(email: string): Promise<{ data: Cita[] }> {
    const response = await authFetch(`${BASE_URL}/citas?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al obtener las citas.');
    return data;
  },

  /**
   * Obtiene todas las citas del sistema. Solo para uso del admin.
   * @returns Objeto con `data` (array de todas las `Cita`).
   */
  async getAllCitas(): Promise<{ data: Cita[] }> {
    const response = await authFetch(`${BASE_URL}/admin/citas`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al obtener las citas.');
    return data;
  },

  /**
   * Marca una cita como atendida. Solo disponible para el admin.
   * @param id - Identificador único de la cita.
   * @returns Void. Lanza error si la cita no existe o ya estaba atendida.
   */
  async marcarAtendida(id: string): Promise<void> {
    const response = await authFetch(`${BASE_URL}/citas/${id}/marcar-atendida`, { method: 'PATCH' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al marcar la cita.');
  },
};
