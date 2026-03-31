import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  getAutomatizacion,
  aceptarAdmin, rechazarAdmin, marcarTerminada,
  publicarActualizacion, cancelarAutomatizacion,
  aceptarCliente, rechazarCliente, valorarAutomatizacion,
} from '../services/automatizacionesAPI';
import type { Automatizacion } from '../types';
import EstadoTimeline from '../components/ClienteDashboard/EstadoTimeline';
import StarRating from '../components/StarRating/StarRating';
import { styles } from '../components/AdminDashboard/AdminDashboardStyles';
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
  const [actionError, setActionError] = useState('');

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

  const handleAceptarAdmin = async () => {
    const gastoNum = parseFloat(gasto);
    if (isNaN(gastoNum) || gastoNum <= 0) { setActionError('Introduce un gasto válido'); return; }
    setActionLoading(true); setActionError('');
    try {
      await aceptarAdmin(identificador_unico, gastoNum, user!.id, user!.nombre);
      setMode('none'); setGasto(''); fetchData();
    } catch { setActionError('Error al aceptar'); }
    finally { setActionLoading(false); }
  };

  const handleRechazarAdmin = async () => {
    if (!motivo.trim()) { setActionError('Introduce el motivo'); return; }
    setActionLoading(true); setActionError('');
    try {
      await rechazarAdmin(identificador_unico, motivo.trim());
      setMode('none'); setMotivo(''); fetchData();
    } catch { setActionError('Error al rechazar'); }
    finally { setActionLoading(false); }
  };

  const handleMarcarTerminada = async () => {
    setActionLoading(true); setActionError('');
    try { await marcarTerminada(identificador_unico); fetchData(); }
    catch { setActionError('Error al marcar terminada'); }
    finally { setActionLoading(false); }
  };

  const handlePublicarUpdate = async () => {
    if (!updateMsg.trim()) { setActionError('El mensaje no puede estar vacío'); return; }
    const pct = parseInt(updatePct);
    if (isNaN(pct) || pct < 0 || pct > 100) { setActionError('Porcentaje inválido'); return; }
    if (actualizaciones_desarrollo?.length) {
      const ultimo = actualizaciones_desarrollo[actualizaciones_desarrollo.length - 1].porcentaje;
      if (pct <= ultimo) { setActionError(`El porcentaje debe ser mayor que ${ultimo}%`); return; }
    }
    setActionLoading(true); setActionError('');
    try {
      await publicarActualizacion(identificador_unico, updateMsg.trim(), pct);
      setUpdateMsg(''); setUpdatePct(''); fetchData();
    } catch { setActionError('Error al publicar'); }
    finally { setActionLoading(false); }
  };

  const handleCancelar = async () => {
    if (!confirm('¿Cancelar esta automatización?')) return;
    setActionLoading(true); setActionError('');
    try { await cancelarAutomatizacion(identificador_unico); fetchData(); }
    catch { setActionError('Error al cancelar'); }
    finally { setActionLoading(false); }
  };

  const handleAceptarCliente = async () => {
    setActionLoading(true); setActionError('');
    try { await aceptarCliente(identificador_unico); fetchData(); }
    catch { setActionError('Error al aceptar propuesta'); }
    finally { setActionLoading(false); }
  };

  const handleRechazarCliente = async () => {
    setActionLoading(true); setActionError('');
    try { await rechazarCliente(identificador_unico); fetchData(); }
    catch { setActionError('Error al rechazar propuesta'); }
    finally { setActionLoading(false); }
  };

  return (
    <div className={styles.page(theme)}>
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 flex items-center gap-2 text-sm font-medium transition-colors duration-200 cursor-pointer
            ${theme === 'dark' ? 'text-[#64748b] hover:text-[#94a3b8]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          ← Volver
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
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
        <div className="mb-6">
          <EstadoTimeline automatizacion={automatizacion} />
        </div>

        {/* Descripción */}
        <div className={`rounded-xl border p-5 mb-4 ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}`}>Descripción</p>
          <p className={styles.cardDescription(theme)}>{descripcion}</p>

          {nombre_admin && (estado === 'en_desarrollo' || estado === 'aceptada_pendiente_cliente' || estado === 'terminada') && (
            <p className={styles.cardMeta(theme)}>Gestor asignado: <strong>{nombre_admin}</strong></p>
          )}

          {gasto_estimado !== null && estado !== 'pendiente_revision' && (
            <p className={`mt-2 text-sm font-semibold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Gasto estimado: {gasto_estimado} €
            </p>
          )}

          {estado === 'rechazada' && motivo_rechazo && (
            <p className={styles.motivoRechazo}>Motivo: {motivo_rechazo}</p>
          )}
        </div>

        {/* Acciones admin */}
        {isAdmin && (
          <div className={`rounded-xl border p-5 mb-4 ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}`}>Acciones</p>

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
                {(estado === 'pendiente_revision' || estado === 'en_desarrollo' || estado === 'aceptada_pendiente_cliente') && (
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
                {actionError && <p className="text-xs text-red-400 mt-1">{actionError}</p>}
                <div className={styles.inlineActions}>
                  <button className={styles.btnConfirm} onClick={handleAceptarAdmin} disabled={actionLoading}>
                    {actionLoading ? 'Guardando...' : 'Confirmar'}
                  </button>
                  <button className={styles.btnCancel(theme)} onClick={() => { setMode('none'); setGasto(''); setActionError(''); }}>Cancelar</button>
                </div>
              </div>
            )}

            {mode === 'rechazar' && (
              <div className={styles.inlineForm(theme)}>
                <label className={styles.inlineLabel(theme)}>Motivo del rechazo</label>
                <textarea rows={3} placeholder="Explica por qué se rechaza..." value={motivo}
                  onChange={e => setMotivo(e.target.value)} className={styles.inlineTextarea(theme)} />
                {actionError && <p className="text-xs text-red-400 mt-1">{actionError}</p>}
                <div className={styles.inlineActions}>
                  <button className={styles.btnConfirm} onClick={handleRechazarAdmin} disabled={actionLoading}>
                    {actionLoading ? 'Guardando...' : 'Confirmar'}
                  </button>
                  <button className={styles.btnCancel(theme)} onClick={() => { setMode('none'); setMotivo(''); setActionError(''); }}>Cancelar</button>
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
                {actionError && <p className="text-xs text-red-400 mb-2">{actionError}</p>}
                <button className={styles.btnPublish} onClick={handlePublicarUpdate} disabled={actionLoading}>
                  {actionLoading ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Acciones cliente */}
        {!isAdmin && estado === 'aceptada_pendiente_cliente' && gasto_estimado !== null && (
          <div className={`rounded-xl border p-5 mb-4 ${theme === 'dark' ? 'bg-cyan-400/5 border-cyan-400/20' : 'bg-cyan-50 border-cyan-200'}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>Propuesta recibida</p>
            <p className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}`}>{gasto_estimado} €</p>
            <div className="flex gap-3">
              <button className={`px-4 py-2 rounded-lg text-sm font-semibold bg-cyan-400 text-[#0f172a] hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer`}
                onClick={handleAceptarCliente} disabled={actionLoading}>
                {actionLoading ? 'Procesando...' : 'Aceptar propuesta'}
              </button>
              <button className={`px-4 py-2 rounded-lg text-sm font-semibold border border-red-400/50 text-red-400 hover:bg-red-400/10 transition-colors duration-200 cursor-pointer`}
                onClick={handleRechazarCliente} disabled={actionLoading}>
                Rechazar
              </button>
            </div>
            {actionError && <p className="text-xs text-red-400 mt-2">{actionError}</p>}
          </div>
        )}

        {!isAdmin && (estado === 'en_desarrollo' || estado === 'aceptada_pendiente_cliente' || estado === 'pendiente_revision') && (
          <div className="mb-4">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold border border-red-400/50 text-red-400 hover:bg-red-400/10 transition-colors duration-200 cursor-pointer`}
              onClick={handleCancelar} disabled={actionLoading}>
              {actionLoading ? 'Cancelando...' : 'Cancelar automatización'}
            </button>
            {actionError && <p className="text-xs text-red-400 mt-2">{actionError}</p>}
          </div>
        )}

        {/* Actualizaciones */}
        {updates.length > 0 && (
          <div className={`rounded-xl border p-5 mb-4 ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
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
          <div className={`rounded-xl border p-5 mb-4 ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
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
