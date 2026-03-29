import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { aceptarCliente, rechazarCliente } from '../../services/automatizacionesAPI';
import type { Automatizacion } from '../../types';
import { styles } from './ClienteDashboardStyles';
import EstadoTimeline from './EstadoTimeline';

interface Props {
  automatizacion: Automatizacion;
  onRefresh: () => void;
}

const AutomatizacionStatusCard = ({ automatizacion, onRefresh }: Props) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { identificador_unico, titulo, tipo_automatizacion, descripcion,
    estado, gasto_estimado, motivo_rechazo, fecha_solicitud,
    actualizaciones_desarrollo } = automatizacion;

  const fecha = new Date(fecha_solicitud).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const handleAceptarPropuesta = async () => {
    setLoading(true);
    setError('');
    try {
      await aceptarCliente(identificador_unico);
      onRefresh();
    } catch {
      setError('Error al aceptar la propuesta');
    } finally {
      setLoading(false);
    }
  };

  const handleRechazarPropuesta = async () => {
    setLoading(true);
    setError('');
    try {
      await rechazarCliente(identificador_unico);
      onRefresh();
    } catch {
      setError('Error al rechazar la propuesta');
    } finally {
      setLoading(false);
    }
  };

  const updates = actualizaciones_desarrollo
    ? [...actualizaciones_desarrollo].reverse()
    : [];

  return (
    <div className={styles.card(theme)}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardTitle(theme)}>{titulo}</p>
          <p className={styles.cardMeta(theme)}>{tipo_automatizacion} · {fecha}</p>
        </div>
        <span className={styles.badge(estado)}>{styles.badgeLabel(estado)}</span>
      </div>

      <EstadoTimeline automatizacion={automatizacion} />

      <p className={styles.cardDescription(theme)}>{descripcion}</p>

      {estado === 'aceptada_pendiente_cliente' && gasto_estimado !== null && (
        <div className={styles.propuestaBox(theme)}>
          <p className={styles.propuestaLabel(theme)}>Propuesta recibida</p>
          <p className={styles.propuestaGasto(theme)}>{gasto_estimado} €</p>
          <div className="flex gap-3">
            <button className={styles.btnAceptar} onClick={handleAceptarPropuesta} disabled={loading}>
              {loading ? 'Procesando...' : 'Aceptar propuesta'}
            </button>
            <button className={styles.btnRechazar} onClick={handleRechazarPropuesta} disabled={loading}>
              Rechazar
            </button>
          </div>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        </div>
      )}

      {estado === 'rechazada' && motivo_rechazo && (
        <p className={styles.motivoRechazo}>Motivo: {motivo_rechazo}</p>
      )}

      {estado === 'en_desarrollo' && updates.length > 0 && (
        <div className={styles.updatesSection(theme)}>
          <p className={styles.updatesSectionTitle(theme)}>Actualizaciones del equipo</p>
          {updates.map((u, i) => (
            <div key={i} className={styles.updateItem(theme)}>
              <div className={styles.updateItemHeader}>
                <span className={styles.updateItemMsg(theme)}>{u.mensaje}</span>
                <span className={styles.updateItemPct}>{u.porcentaje}%</span>
              </div>
              <p className={styles.updateItemDate(theme)}>
                {new Date(u.fecha).toLocaleDateString('es-ES', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </p>
              <div className={styles.progressBarTrack(theme)}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${u.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomatizacionStatusCard;
