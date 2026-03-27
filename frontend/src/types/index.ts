export interface User {
  id: string;
  email: string;
  nombre: string;
  empresa: string;
  telefono: string;
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

export interface ActualizacionDesarrollo {
  mensaje: string;
  porcentaje: number;
  fecha: string;
}

export interface Automatizacion {
  identificador_unico: string;
  identificador_propietario: string;
  email_propietario: string;
  nombre_propietario: string;
  titulo: string;
  descripcion: string;
  tipo_automatizacion: string;
  estado: 'pendiente_revision' | 'aceptada_pendiente_cliente' | 'en_desarrollo' | 'terminada' | 'rechazada';
  gasto_estimado: number | null;
  motivo_rechazo: string | null;
  fecha_solicitud: string;
  fecha_actualizacion: string;
  actualizaciones_desarrollo?: ActualizacionDesarrollo[];
}
