import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  getAutomatizacion,
  aceptarAdmin, rechazarAdmin, marcarTerminada,
  publicarActualizacion, cancelarAutomatizacion,
  valorarAutomatizacion, crearSesionPagoAnticipo, crearSesionPagoFinal,
} from '../services/automatizacionesAPI';
import type { Automatizacion } from '../types';
import EstadoTimeline from '../components/ClienteDashboard/EstadoTimeline';
import StarRating from '../components/StarRating/StarRating';
import { styles } from '../components/AdminDashboard/AdminDashboardStyles';
import { detalleStyles as ds } from './AutomatizacionDetalleStyles';
import { getBadgeClass, ESTADO_LABELS_ADMIN } from '../utils/automatizacionesUtils';

type ActionMode = 'none' | 'aceptar' | 'rechazar';

const AutomatizacionDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();

  const [automatizacion, setAutomatizacion] = useState<Automatizacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [mode, setMode] = useState<ActionMode>('none');
  const [gasto, setGasto] = useState('');
  const [motivo, setMotivo] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [updatePct, setUpdatePct] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getAutomatizacion(id!);
      setAutomatizacion(res.data);
    } catch {
      setError('Error al cargar la automatización');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  if (loading) return <div className={styles.page(theme)}><div className={styles.container}><p className={styles.loadingText(theme)}>Cargando...</p></div></div>;
  if (error || !automatizacion) return <div className={styles.page(theme)}><div className={styles.container}><p className={styles.errorText}>{error || 'No encontrada'}</p></div></div>;

  const {
    identificador_unico, titulo, tipo_automatizacion, descripcion,
    estado, gasto_estimado, motivo_rechazo, nombre_admin,
    nombre_propietario, email_propietario,
    fecha_solicitud, actualizaciones_desarrollo, valoracion,
  } = automatizacion;

  const fecha = new Date(fecha_solicitud).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const updates = actualizaciones_desarrollo
    ? [...actualizaciones_desarrollo].reverse()
    : [];

  const isAdmin = user?.rol === 'admin';
  const anticipo = gasto_estimado !== null ? (gasto_estimado * 0.5).toFixed(2) : null;

  const handleAceptarAdmin = async () => {
    const gastoNum = parseFloat(gasto);
    if (isNaN(gastoNum) || gastoNum <= 0) { toast.error('Introduce un gasto válido'); return; }
    setActionLoading(true);
    try {
      await aceptarAdmin(identificador_unico, gastoNum, user!.id, user!.nombre);
      toast.success('Automatización aceptada');
      setMode('none'); setGasto(''); fetchData();
    } catch { toast.error('Error al aceptar'); }
    finally { setActionLoading(false); }
  };

  const handleRechazarAdmin = async () => {
    if (!motivo.trim()) { toast.error('Introduce el motivo'); return; }
    setActionLoading(true);
    try {
      await rechazarAdmin(identificador_unico, motivo.trim());
      toast.success('Automatización rechazada');
      setMode('none'); setMotivo(''); fetchData();
    } catch { toast.error('Error al rechazar'); }
    finally { setActionLoading(false); }
  };

  const handleMarcarTerminada = async () => {
    setActionLoading(true);
    try { await marcarTerminada(identificador_unico); toast.success('Marcada como terminada'); fetchData(); }
    catch { toast.error('Error al marcar terminada'); }
    finally { setActionLoading(false); }
  };

  const handlePublicarUpdate = async () => {
    if (!updateMsg.trim()) { toast.error('El mensaje no puede estar vacío'); return; }
    const pct = parseInt(updatePct);
    if (isNaN(pct) || pct < 0 || pct > 100) { toast.error('Porcentaje inválido'); return; }
    if (actualizaciones_desarrollo?.length) {
      const ultimo = actualizaciones_desarrollo[actualizaciones_desarrollo.length - 1].porcentaje;
      if (pct <= ultimo) { toast.error(`El porcentaje debe ser mayor que ${ultimo}%`); return; }
    }
    setActionLoading(true);
    try {
      await publicarActualizacion(identificador_unico, updateMsg.trim(), pct);
      toast.success('Actualización publicada');
      setUpdateMsg(''); setUpdatePct(''); fetchData();
    } catch { toast.error('Error al publicar'); }
    finally { setActionLoading(false); }
  };

  const handleCancelar = async () => {
    if (!confirm('¿Cancelar esta automatización?')) return;
    setActionLoading(true);
    try { await cancelarAutomatizacion(identificador_unico); toast.success('Automatización cancelada'); fetchData(); }
    catch { toast.error('Error al cancelar'); }
    finally { setActionLoading(false); }
  };

  const handlePagarAnticipo = async () => {
    setActionLoading(true);
    try {
      const res = await crearSesionPagoAnticipo(identificador_unico);
      window.location.href = res.url;
    } catch { toast.error('Error al iniciar el pago'); }
    finally { setActionLoading(false); }
  };

  const handlePagarFinal = async () => {
    setActionLoading(true);
    try {
      const res = await crearSesionPagoFinal(identificador_unico);
      window.location.href = res.url;
    } catch { toast.error('Error al iniciar el pago'); }
    finally { setActionLoading(false); }
  };

  return (
    <div className={styles.page(theme)}>
      <div className={ds.container}>

        {/* Botón volver */}
        <button onClick={() => navigate(-1)} className={ds.btnVolver(theme)}>
          ← Volver
        </button>

        {/* Header */}
        <div className={ds.header}>
          <div>
            <h1 className={styles.pageTitle(theme)}>{titulo}</h1>
            <p className={styles.cardMeta(theme)}>
              {tipo_automatizacion} · {fecha}
              {isAdmin && ` · ${nombre_propietario} (${email_propietario})`}
            </p>
          </div>
          <span className={getBadgeClass(estado)}>
            {ESTADO_LABELS_ADMIN[estado] ?? estado}
          </span>
        </div>

        {/* Timeline */}
        <div className={ds.timelineWrapper}>
          <EstadoTimeline automatizacion={automatizacion} />
        </div>

        {/* Descripción */}
        <div className={ds.section(theme)}>
          <p className={ds.sectionLabel(theme)}>Descripción</p>
          <p className={styles.cardDescription(theme)}>{descripcion}</p>

          {nombre_admin && (estado === 'pendiente_pago_anticipo' || estado === 'en_desarrollo' || estado === 'pendiente_pago_final' || estado === 'terminada') && (
            <p className={styles.cardMeta(theme)}>Gestor asignado: <strong>{nombre_admin}</strong></p>
          )}

          {gasto_estimado !== null && estado !== 'pendiente_revision' && (
            <p className={ds.gastoText(theme)}>Gasto total: {gasto_estimado} €</p>
          )}

          {estado === 'rechazada' && motivo_rechazo && (
            <p className={styles.motivoRechazo}>Motivo: {motivo_rechazo}</p>
          )}
        </div>

        {/* Acciones admin */}
        {isAdmin && (
          <div className={ds.section(theme)}>
            <p className={ds.sectionLabelMb3(theme)}>Acciones</p>

            {mode === 'none' && (
              <div className={styles.actionsRow}>
                {estado === 'pendiente_revision' && (
                  <>
                    <button className={styles.btnAccept} onClick={() => setMode('aceptar')}>Aceptar</button>
                    <button className={styles.btnReject} onClick={() => setMode('rechazar')}>Rechazar</button>
                  </>
                )}
                {estado === 'en_desarrollo' && (
                  <button className={styles.btnDone} onClick={handleMarcarTerminada} disabled={actionLoading}>
                    {actionLoading ? 'Guardando...' : 'Marcar terminada'}
                  </button>
                )}
                {(estado === 'pendiente_revision' || estado === 'pendiente_pago_anticipo' || estado === 'en_desarrollo' || estado === 'pendiente_pago_final') && (
                  <button className={styles.btnReject} onClick={handleCancelar} disabled={actionLoading}>Cancelar</button>
                )}
                {(estado === 'rechazada' || estado === 'cancelada' || estado === 'terminada') && (
                  <p className={styles.cardMeta(theme)}>No hay acciones disponibles</p>
                )}
              </div>
            )}

            {mode === 'aceptar' && (
              <div className={styles.inlineForm(theme)}>
                <label className={styles.inlineLabel(theme)}>Gasto estimado (€)</label>
                <input type="number" min="0" placeholder="Ej: 350" value={gasto}
                  onChange={e => setGasto(e.target.value)} className={styles.inlineInput(theme)} />
                <div className={styles.inlineActions}>
                  <button className={styles.btnConfirm} onClick={handleAceptarAdmin} disabled={actionLoading}>
                    {actionLoading ? 'Guardando...' : 'Confirmar'}
                  </button>
                  <button className={styles.btnCancel(theme)} onClick={() => { setMode('none'); setGasto(''); }}>Cancelar</button>
                </div>
              </div>
            )}

            {mode === 'rechazar' && (
              <div className={styles.inlineForm(theme)}>
                <label className={styles.inlineLabel(theme)}>Motivo del rechazo</label>
                <textarea rows={3} placeholder="Explica por qué se rechaza..." value={motivo}
                  onChange={e => setMotivo(e.target.value)} className={styles.inlineTextarea(theme)} />
                <div className={styles.inlineActions}>
                  <button className={styles.btnConfirm} onClick={handleRechazarAdmin} disabled={actionLoading}>
                    {actionLoading ? 'Guardando...' : 'Confirmar'}
                  </button>
                  <button className={styles.btnCancel(theme)} onClick={() => { setMode('none'); setMotivo(''); }}>Cancelar</button>
                </div>
              </div>
            )}

            {/* Publicar actualización */}
            {estado === 'en_desarrollo' && mode === 'none' && (
              <div className={styles.updateFormSection(theme)}>
                <p className={styles.updateFormTitle(theme)}>Publicar actualización</p>
                <div className={styles.updateFormRow}>
                  <input type="text" placeholder="Ej: He conectado el webhook" value={updateMsg}
                    onChange={e => setUpdateMsg(e.target.value)} className={styles.inlineInput(theme)} />
                  <input type="number" min="0" max="100" placeholder="% completado" value={updatePct}
                    onChange={e => setUpdatePct(e.target.value)} className={styles.updateFormPctInput(theme)} />
                </div>
                <button className={styles.btnPublish} onClick={handlePublicarUpdate} disabled={actionLoading}>
                  {actionLoading ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Acciones cliente — anticipo */}
        {!isAdmin && estado === 'pendiente_pago_anticipo' && anticipo !== null && (
          <div className={ds.propuestaBox(theme)}>
            <p className={ds.propuestaLabel(theme)}>Anticipo para iniciar el desarrollo</p>
            <p className={ds.propuestaGasto(theme)}>
              {anticipo} € <span className="text-xs opacity-60">(50% del total: {gasto_estimado} €)</span>
            </p>
            <button className={ds.btnAceptarPropuesta} onClick={handlePagarAnticipo} disabled={actionLoading}>
              {actionLoading ? 'Redirigiendo...' : 'Pagar anticipo'}
            </button>
          </div>
        )}

        {/* Acciones cliente — pago final */}
        {!isAdmin && estado === 'pendiente_pago_final' && anticipo !== null && (
          <div className={ds.propuestaBox(theme)}>
            <p className={ds.propuestaLabel(theme)}>Pago final — trabajo completado</p>
            <p className={ds.propuestaGasto(theme)}>
              {anticipo} € <span className="text-xs opacity-60">(50% restante del total: {gasto_estimado} €)</span>
            </p>
            <button className={ds.btnAceptarPropuesta} onClick={handlePagarFinal} disabled={actionLoading}>
              {actionLoading ? 'Redirigiendo...' : 'Pagar resto'}
            </button>
          </div>
        )}

        {/* Cancelar (cliente) */}
        {!isAdmin && (estado === 'pendiente_revision' || estado === 'pendiente_pago_anticipo' || estado === 'en_desarrollo' || estado === 'pendiente_pago_final') && (
          <div className={ds.cancelWrapper}>
            <button className={ds.btnRechazarPropuesta} onClick={handleCancelar} disabled={actionLoading}>
              {actionLoading ? 'Cancelando...' : 'Cancelar automatización'}
            </button>
          </div>
        )}

        {/* Actualizaciones */}
        {updates.length > 0 && (
          <div className={ds.section(theme)}>
            <p className={styles.updateHistoryTitle(theme)}>Actualizaciones del equipo</p>
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
                  <div className={styles.progressBarFill} style={{ width: `${u.porcentaje}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Valoración (solo cliente) */}
        {!isAdmin && estado === 'terminada' && (
          <div className={ds.section(theme)}>
            <StarRating
              idAutomatizacion={identificador_unico}
              valoracion={valoracion}
              onRefresh={fetchData}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default AutomatizacionDetalle;
