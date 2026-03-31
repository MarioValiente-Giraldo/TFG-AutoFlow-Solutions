import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { aceptarCliente, rechazarCliente, cancelarAutomatizacion } from '../../services/automatizacionesAPI';
import type { Automatizacion } from '../../types';
import { styles } from './ClienteDashboardStyles';
import EstadoTimeline from './EstadoTimeline';
import StarRating from '../StarRating/StarRating';

interface Props {
  automatizacion: Automatizacion;
  onRefresh: () => void;
}

const AutomatizacionStatusCard = ({ automatizacion, onRefresh }: Props) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { identificador_unico, titulo, tipo_automatizacion, descripcion,
    estado, gasto_estimado, motivo_rechazo, nombre_admin, fecha_solicitud,
    actualizaciones_desarrollo, valoracion } = automatizacion;

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

  const handleCancelar = async () => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta automatización?')) return;
    setLoading(true);
    setError('');
    try {
      await cancelarAutomatizacion(identificador_unico);
      onRefresh();
    } catch {
      setError('Error al cancelar la automatización');
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

      <button
        onClick={() => navigate(`/automatizacion/${identificador_unico}`)}
        className={`mb-3 text-xs font-medium transition-colors duration-200 cursor-pointer ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
      >
        Ver detalle →
      </button>

      {nombre_admin && (estado === 'en_desarrollo' || estado === 'aceptada_pendiente_cliente' || estado === 'terminada') && (
        <p className={styles.cardMeta(theme)}>Tu gestor: <strong>{nombre_admin}</strong></p>
      )}

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

      {(estado === 'en_desarrollo' || estado === 'aceptada_pendiente_cliente' || estado === 'pendiente_revision') && (
        <div className="mt-3">
          <button className={styles.btnRechazar} onClick={handleCancelar} disabled={loading}>
            {loading ? 'Cancelando...' : 'Cancelar automatización'}
          </button>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        </div>
      )}

      {estado === 'rechazada' && motivo_rechazo && (
        <p className={styles.motivoRechazo}>Motivo: {motivo_rechazo}</p>
      )}

      {(estado === 'en_desarrollo' || estado === 'terminada') && updates.length > 0 && (
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
      {estado === 'terminada' && (
        <StarRating
          idAutomatizacion={identificador_unico}
          valoracion={valoracion}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

export default AutomatizacionStatusCard;
