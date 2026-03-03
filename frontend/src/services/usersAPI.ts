import type { LoginPayload, RegisterPayload, User } from '../types/index';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const usersAPI = {
  async login(payload: LoginPayload): Promise<{ user: User }> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Credenciales incorrectas.');
    }

    return { user: data.user };
  },

  async register(payload: RegisterPayload): Promise<void> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar el usuario.');
    }
  },
};
