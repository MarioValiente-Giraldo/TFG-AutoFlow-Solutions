export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  password: string;
  acceptTerms: boolean;
}

export interface CitaPayload {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoAutomatizacion: string;
  descripcion: string;
  fechaPreferida: string;
  franjaHoraria: string;
}

export interface AutomatizacionPayload {
  titulo: string;
  descripcion: string;
  tipo_automatizacion: string;
  identificador_propietario: string;
  email_propietario: string;
  nombre_propietario: string;
}
