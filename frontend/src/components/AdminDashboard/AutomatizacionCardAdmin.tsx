import { useState } from 'react';
import { toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { aceptarAdmin, rechazarAdmin, marcarTerminada, publicarActualizacion, cancelarAutomatizacion } from '../../services/automatizacionesAPI';
import type { Automatizacion } from '../../types';
import { styles } from './AdminDashboardStyles';

interface Props {
  automatizacion: Automatizacion;
  onRefresh: () => void;
}

type ActionMode = 'none' | 'aceptar' | 'rechazar';

const AutomatizacionCardAdmin = ({ automatizacion, onRefresh }: Props) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ActionMode>('none');
  const [gasto, setGasto] = useState('');
  const [motivo, setMotivo] = useState('');
  const [loading, setLoading] = useState(false);

  const [updateMsg, setUpdateMsg] = useState('');
  const [updatePct, setUpdatePct] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const { identificador_unico, titulo, nombre_propietario, email_propietario,
    tipo_automatizacion, descripcion, estado, gasto_estimado, motivo_rechazo,
    fecha_solicitud, actualizaciones_desarrollo, valoracion } = automatizacion;

  const fecha = new Date(fecha_solicitud).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const handleAceptar = async () => {
    const gastoNum = parseFloat(gasto);
    if (isNaN(gastoNum) || gastoNum <= 0) {
      toast.error('Introduce un gasto estimado válido');
      return;
    }
    setLoading(true);
    try {
      await aceptarAdmin(identificador_unico, gastoNum, user!.id, user!.nombre);
      toast.success('Automatización aceptada');
      setMode('none');
      setGasto('');
      onRefresh();
    } catch {
      toast.error('Error al aceptar la automatización');
    } finally {
      setLoading(false);
    }
  };

  const handleRechazar = async () => {
    if (!motivo.trim()) {
      toast.error('Introduce el motivo del rechazo');
      return;
    }
    setLoading(true);
    try {
      await rechazarAdmin(identificador_unico, motivo.trim());
      toast.success('Automatización rechazada');
      setMode('none');
      setMotivo('');
      onRefresh();
    } catch {
      toast.error('Error al rechazar la automatización');
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarTerminada = async () => {
    setLoading(true);
    try {
      await marcarTerminada(identificador_unico);
      toast.success('Automatización marcada como terminada');
      onRefresh();
    } catch {
      toast.error('Error al marcar como terminada');
    } finally {
      setLoading(false);
    }
  };

  const handlePublicarUpdate = async () => {
    if (!updateMsg.trim()) {
      toast.error('El mensaje no puede estar vacío');
      return;
    }
    const pct = parseInt(updatePct);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      toast.error('El porcentaje debe ser un número entre 0 y 100');
      return;
    }
    if (actualizaciones_desarrollo && actualizaciones_desarrollo.length > 0) {
      const ultimoPct = actualizaciones_desarrollo[actualizaciones_desarrollo.length - 1].porcentaje;
      if (pct <= ultimoPct) {
        toast.error(`El porcentaje debe ser mayor que el anterior (${ultimoPct}%)`);
        return;
      }
    }
    setUpdateLoading(true);
    try {
      await publicarActualizacion(identificador_unico, updateMsg.trim(), pct);
      toast.success('Actualización publicada');
      setUpdateMsg('');
      setUpdatePct('');
      onRefresh();
    } catch {
      toast.error('Error al publicar la actualización');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelar = async () => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta automatización?')) return;
    setLoading(true);
    try {
      await cancelarAutomatizacion(identificador_unico);
      toast.success('Automatización cancelada');
      onRefresh();
    } catch {
      toast.error('Error al cancelar la automatización');
    } finally {
      setLoading(false);
    }
  };

  const cancelMode = () => {
    setMode('none');
    setGasto('');
    setMotivo('');
  };

  const updates = actualizaciones_desarrollo
    ? [...actualizaciones_desarrollo].reverse()
    : [];

  return (
    <div className={styles.card(theme)}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardTitle(theme)}>{titulo}</p>
          <p className={styles.cardMeta(theme)}>{nombre_propietario} · {email_propietario}</p>
          <p className={styles.cardMeta(theme)}>{tipo_automatizacion} · {fecha}</p>
        </div>
        <span className={styles.badge(estado)}>{styles.badgeLabel(estado)}</span>
      </div>

      <p className={styles.cardDescription(theme)}>{descripcion}</p>

      <button
        onClick={() => navigate(`/automatizacion/${identificador_unico}`)}
        className={`mb-3 text-xs font-medium transition-colors duration-200 cursor-pointer ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
      >
        Ver detalle →
      </button>

      {estado === 'aceptada_pendiente_cliente' && gasto_estimado !== null && (
        <p className={styles.cardMeta(theme)}>Gasto estimado: <strong>{gasto_estimado} €</strong></p>
      )}

      {estado === 'rechazada' && motivo_rechazo && (
        <p className={styles.motivoRechazo}>Motivo: {motivo_rechazo}</p>
      )}

      {/* Acciones según estado */}
      {mode === 'none' && (
        <div className={styles.actionsRow}>
          {estado === 'pendiente_revision' && (
            <>
              <button className={styles.btnAccept} onClick={() => setMode('aceptar')}>Aceptar</button>
              <button className={styles.btnReject} onClick={() => setMode('rechazar')}>Rechazar</button>
            </>
          )}
          {estado === 'en_desarrollo' && (
            <button className={styles.btnDone} onClick={handleMarcarTerminada} disabled={loading}>
              {loading ? 'Guardando...' : 'Marcar terminada'}
            </button>
          )}
          {(estado === 'pendiente_revision' || estado === 'en_desarrollo' || estado === 'aceptada_pendiente_cliente') && (
            <button className={styles.btnReject} onClick={handleCancelar} disabled={loading}>Cancelar</button>
          )}
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
          <div className={styles.inlineActions}>
            <button className={styles.btnConfirm} onClick={handleRechazar} disabled={loading}>
              {loading ? 'Guardando...' : 'Confirmar'}
            </button>
            <button className={styles.btnCancel(theme)} onClick={cancelMode}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Formulario publicar actualización */}
      {estado === 'en_desarrollo' && (
        <div className={styles.updateFormSection(theme)}>
          <p className={styles.updateFormTitle(theme)}>Publicar actualización</p>
          <div className={styles.updateFormRow}>
            <input
              type="text"
              placeholder="Ej: He conectado el webhook de entrada"
              value={updateMsg}
              onChange={e => setUpdateMsg(e.target.value)}
              className={styles.inlineInput(theme)}
            />
            <input
              type="number"
              min="0"
              max="100"
              placeholder="% completado"
              value={updatePct}
              onChange={e => setUpdatePct(e.target.value)}
              className={styles.updateFormPctInput(theme)}
            />
          </div>
          <button
            className={styles.btnPublish}
            onClick={handlePublicarUpdate}
            disabled={updateLoading}
          >
            {updateLoading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      )}

      {/* Historial de actualizaciones */}
      {updates.length > 0 && (
        <div className={styles.updateHistorySection(theme)}>
          <p className={styles.updateHistoryTitle(theme)}>Historial de actualizaciones</p>
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
      {estado === 'terminada' && valoracion && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Valoración del cliente</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} className={`text-lg ${n <= valoracion.puntuacion ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
            ))}
          </div>
          {valoracion.comentario && <p className={`text-xs mt-1 opacity-70 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{valoracion.comentario}</p>}
        </div>
      )}
    </div>
  );
};

export default AutomatizacionCardAdmin;
