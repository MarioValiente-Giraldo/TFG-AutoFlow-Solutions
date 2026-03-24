import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { aceptarCliente, rechazarCliente } from '../../services/automatizacionesAPI';
import type { Automatizacion } from '../../types';
import { styles } from './ClienteDashboardStyles';

interface Props {
  automatizacion: Automatizacion;
  onRefresh: () => void;
}

const AutomatizacionStatusCard = ({ automatizacion, onRefresh }: Props) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { identificador_unico, titulo, tipo_automatizacion, descripcion,
    estado, gasto_estimado, motivo_rechazo, fecha_solicitud } = automatizacion;

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

  return (
    <div className={styles.card(theme)}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardTitle(theme)}>{titulo}</p>
          <p className={styles.cardMeta(theme)}>{tipo_automatizacion} · {fecha}</p>
        </div>
        <span className={styles.badge(estado)}>{styles.badgeLabel(estado)}</span>
      </div>

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
    </div>
  );
};

export default AutomatizacionStatusCard;
