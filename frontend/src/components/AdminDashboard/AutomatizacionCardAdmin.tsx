import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { aceptarAdmin, rechazarAdmin, marcarTerminada } from '../../services/automatizacionesAPI';
import type { Automatizacion } from '../../types';
import { styles } from './AdminDashboardStyles';

interface Props {
  automatizacion: Automatizacion;
  onRefresh: () => void;
}

type ActionMode = 'none' | 'aceptar' | 'rechazar';

const AutomatizacionCardAdmin = ({ automatizacion, onRefresh }: Props) => {
  const { theme } = useTheme();
  const [mode, setMode] = useState<ActionMode>('none');
  const [gasto, setGasto] = useState('');
  const [motivo, setMotivo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { identificador_unico, titulo, nombre_propietario, email_propietario,
    tipo_automatizacion, descripcion, estado, gasto_estimado, motivo_rechazo, fecha_solicitud } = automatizacion;

  const fecha = new Date(fecha_solicitud).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const handleAceptar = async () => {
    const gastoNum = parseFloat(gasto);
    if (isNaN(gastoNum) || gastoNum <= 0) {
      setError('Introduce un gasto estimado válido');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await aceptarAdmin(identificador_unico, gastoNum);
      setMode('none');
      setGasto('');
      onRefresh();
    } catch {
      setError('Error al aceptar la automatización');
    } finally {
      setLoading(false);
    }
  };

  const handleRechazar = async () => {
    if (!motivo.trim()) {
      setError('Introduce el motivo del rechazo');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await rechazarAdmin(identificador_unico, motivo.trim());
      setMode('none');
      setMotivo('');
      onRefresh();
    } catch {
      setError('Error al rechazar la automatización');
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarTerminada = async () => {
    setLoading(true);
    setError('');
    try {
      await marcarTerminada(identificador_unico);
      onRefresh();
    } catch {
      setError('Error al marcar como terminada');
    } finally {
      setLoading(false);
    }
  };

  const cancelMode = () => {
    setMode('none');
    setGasto('');
    setMotivo('');
    setError('');
  };

  return (
    <div className={styles.card(theme)}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardTitle(theme)}>{titulo}</p>
          <p className={styles.cardMeta(theme)}>
            {nombre_propietario} · {email_propietario} · {tipo_automatizacion} · {fecha}
          </p>
        </div>
        <span className={styles.badge(estado)}>{styles.badgeLabel(estado)}</span>
      </div>

      <p className={styles.cardDescription(theme)}>{descripcion}</p>

      {estado === 'aceptada_pendiente_cliente' && gasto_estimado !== null && (
        <p className={styles.cardMeta(theme)}>Gasto estimado: <strong>{gasto_estimado} €</strong></p>
      )}

      {estado === 'rechazada' && motivo_rechazo && (
        <p className={styles.motivoRechazo}>Motivo: {motivo_rechazo}</p>
      )}

      {/* Acciones según estado */}
      {estado === 'pendiente_revision' && mode === 'none' && (
        <div className={styles.actionsRow}>
          <button className={styles.btnAccept} onClick={() => setMode('aceptar')}>Aceptar</button>
          <button className={styles.btnReject} onClick={() => setMode('rechazar')}>Rechazar</button>
        </div>
      )}

      {estado === 'en_desarrollo' && mode === 'none' && (
        <div className={styles.actionsRow}>
          <button className={styles.btnDone} onClick={handleMarcarTerminada} disabled={loading}>
            {loading ? 'Guardando...' : 'Marcar terminada'}
          </button>
        </div>
      )}

      {/* Formulario inline aceptar */}
      {mode === 'aceptar' && (
        <div className={styles.inlineForm(theme)}>
          <label className={styles.inlineLabel(theme)}>Gasto estimado (€)</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 350"
            value={gasto}
            onChange={e => setGasto(e.target.value)}
            className={styles.inlineInput(theme)}
          />
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          <div className={styles.inlineActions}>
            <button className={styles.btnConfirm} onClick={handleAceptar} disabled={loading}>
              {loading ? 'Guardando...' : 'Confirmar'}
            </button>
            <button className={styles.btnCancel(theme)} onClick={cancelMode}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Formulario inline rechazar */}
      {mode === 'rechazar' && (
        <div className={styles.inlineForm(theme)}>
          <label className={styles.inlineLabel(theme)}>Motivo del rechazo</label>
          <textarea
            rows={3}
            placeholder="Explica por qué se rechaza..."
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            className={styles.inlineTextarea(theme)}
          />
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          <div className={styles.inlineActions}>
            <button className={styles.btnConfirm} onClick={handleRechazar} disabled={loading}>
              {loading ? 'Guardando...' : 'Confirmar'}
            </button>
            <button className={styles.btnCancel(theme)} onClick={cancelMode}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatizacionCardAdmin;
