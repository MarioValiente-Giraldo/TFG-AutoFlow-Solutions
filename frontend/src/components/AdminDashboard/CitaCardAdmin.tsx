import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { citasAPI } from '../../services/citasAPI';
import { crearAutomatizacion } from '../../services/automatizacionesAPI';
import type { Cita } from '../../types';
import { styles } from './CitaCardAdminStyles';

interface CitaCardAdminProps {
  cita: Cita;
  onRefresh: () => void;
}

const CitaCardAdmin = ({ cita, onRefresh }: CitaCardAdminProps) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fecha = new Date(cita.fecha_preferida).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const handleMarcarAtendida = async () => {
    setLoading(true);
    setError('');
    try {
      await citasAPI.marcarAtendida(cita.identificador_unico_cita);
      onRefresh();
    } catch {
      setError('Error al marcar la cita como atendida');
    } finally {
      setLoading(false);
    }
  };

  const handleCrearAutomatizacion = async () => {
    setLoading(true);
    setError('');
    try {
      await crearAutomatizacion({
        titulo: cita.tipo_automatizacion,
        descripcion: cita.descripcion,
        tipo_automatizacion: cita.tipo_automatizacion,
        email_propietario: cita.email,
        nombre_propietario: cita.nombre,
      });
      onRefresh();
    } catch {
      setError('Error al crear la automatización');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card(theme)}>
      <div className={styles.header}>
        <div>
          <p className={styles.title(theme)}>{cita.nombre} — {cita.empresa}</p>
          <p className={styles.meta(theme)}>{cita.email} · {cita.telefono}</p>
        </div>
        <span className={styles.badge(cita.estado)}>
          {styles.badgeLabel(cita.estado)}
        </span>
      </div>

      <p className={styles.description(theme)}>{cita.descripcion}</p>

      <div className={styles.detailRow}>
        <span className={styles.detailItem(theme)}>
          Tipo: <span className={styles.detailValue(theme)}>{cita.tipo_automatizacion}</span>
        </span>
        <span className={styles.detailItem(theme)}>
          Fecha: <span className={styles.detailValue(theme)}>{fecha}</span>
        </span>
        <span className={styles.detailItem(theme)}>
          Franja: <span className={styles.detailValue(theme)}>{cita.franja_horaria}</span>
        </span>
      </div>

      {cita.estado === 'pendiente' && (
        <div className={styles.actionsRow}>
          <button className={styles.btnAtendida} onClick={handleMarcarAtendida} disabled={loading}>
            {loading ? 'Procesando...' : 'Marcar atendida'}
          </button>
        </div>
      )}

      {cita.estado === 'atendida' && (
        <div className={styles.actionsRow}>
          <button className={styles.btnCrearAuto} onClick={handleCrearAutomatizacion} disabled={loading}>
            {loading ? 'Procesando...' : 'Crear automatización'}
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default CitaCardAdmin;
