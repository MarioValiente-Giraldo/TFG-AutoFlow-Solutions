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

export interface Cita {
  identificador_unico_cita: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  tipo_automatizacion: string;
  descripcion: string;
  fecha_preferida: string;
  franja_horaria: string;
  estado: 'pendiente' | 'atendida';
  fecha_solicitud: string;
}

export interface AutomatizacionPayload {
  titulo: string;
  descripcion: string;
  tipo_automatizacion: string;
  email_propietario: string;
  nombre_propietario: string;
  id_cita_origen?: string;
}

export interface Valoracion {
  puntuacion: number;
  comentario: string;
  fecha: string;
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
  estado: 'pendiente_revision' | 'pendiente_pago_anticipo' | 'en_desarrollo' | 'pendiente_pago_final' | 'terminada' | 'rechazada' | 'cancelada';
  gasto_estimado: number | null;
  motivo_rechazo: string | null;
  identificador_admin: string | null;
  nombre_admin: string | null;
  fecha_solicitud: string;
  fecha_actualizacion: string;
  actualizaciones_desarrollo?: ActualizacionDesarrollo[];
  id_cita_origen?: string;
  valoracion?: Valoracion;
  stripe_session_anticipo_id?: string;
  stripe_session_final_id?: string;
  fecha_pago_anticipo?: string;
  fecha_pago_final?: string;
}
