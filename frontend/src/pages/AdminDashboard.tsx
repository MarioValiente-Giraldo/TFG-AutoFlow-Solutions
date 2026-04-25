import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ChatPanel from '../components/ChatPanel/ChatPanel';
import ChatHilosList from '../components/ChatHilosList/ChatHilosList';
import { useChat } from '../context/ChatContext';
import { getAllAutomatizaciones } from '../services/automatizacionesAPI';
import { citasAPI } from '../services/citasAPI';
import AutomatizacionCardAdmin from '../components/AdminDashboard/AutomatizacionCardAdmin';
import CitaCardAdmin from '../components/AdminDashboard/CitaCardAdmin';
import StatsCards from '../components/AdminDashboard/StatsCards';
import StatsCharts from '../components/AdminDashboard/StatsCharts';
import type { Automatizacion, Cita } from '../types';
import { styles } from '../components/AdminDashboard/AdminDashboardStyles';
import { TABS_ADMIN, type TabEstado } from '../utils/automatizacionesUtils';

type SeccionActiva = 'automatizaciones' | 'citas' | 'chat';
type TabCitas = 'pendiente' | 'atendida';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { unreadCount, refreshUnread } = useChat();
  const [clienteChat, setClienteChat] = useState<string | null>(null);
  const [nombreClienteChat, setNombreClienteChat] = useState('');
  const isSuperAdmin = user?.rol === 'superadmin';
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [seccion, setSeccion] = useState<SeccionActiva>('automatizaciones');
  const [tabActivo, setTabActivo] = useState<TabEstado>('todos');
  const [tabCitas, setTabCitas] = useState<TabCitas>('pendiente');
  const [busqueda, setBusqueda] = useState('');
  const [busquedaDebounced, setBusquedaDebounced] = useState('');
  const [orden, setOrden] = useState<'desc' | 'asc'>('desc');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resAuto, resCitas] = await Promise.all([
        getAllAutomatizaciones(),
        citasAPI.getAllCitas(),
      ]);
      setAutomatizaciones(resAuto.data);
      setCitas(resCitas.data);
    } catch {
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBusquedaDebounced(busqueda), 3000);
    return () => clearTimeout(timer);
  }, [busqueda]);

  // Superadmin ve todo; admin solo ve sin asignar + las suyas
  const automatizacionesVisibles = isSuperAdmin
    ? automatizaciones
    : automatizaciones.filter(a =>
        !a.identificador_admin || a.identificador_admin === user?.id
      );

  const filtradas = tabActivo === 'todos'
    ? automatizacionesVisibles
    : automatizacionesVisibles.filter(a => a.estado === tabActivo);

  const countFor = (key: TabEstado) =>
    key === 'todos'
      ? automatizacionesVisibles.length
      : automatizacionesVisibles.filter(a => a.estado === key).length;

  const citasFiltradas = citas.filter(c => c.estado === tabCitas);

  const automatizacionesFiltradas = filtradas
    .filter(a => {
      const q = busquedaDebounced.toLowerCase();
      return (
        a.titulo.toLowerCase().includes(q) ||
        a.nombre_propietario.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const diff = new Date(a.fecha_solicitud).getTime() - new Date(b.fecha_solicitud).getTime();
      return orden === 'asc' ? diff : -diff;
    });

  return (
    <div className={styles.page(theme)}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle(theme)}>Panel de Administración</h1>
        <p className={styles.pageSubtitle(theme)}>Gestiona todas las automatizaciones y citas de los clientes</p>

        {loading && <p className={styles.loadingText(theme)}>Cargando...</p>}

        {!loading && (
          <>
            <StatsCards automatizaciones={automatizacionesVisibles} citas={citas} />
            <StatsCharts automatizaciones={automatizacionesVisibles} />

            {/* Sección principal */}
            <div className={styles.tabsWrapper}>
              <button
                className={styles.tab(seccion === 'automatizaciones', theme)}
                onClick={() => setSeccion('automatizaciones')}
              >
                Automatizaciones
                <span className={styles.tabCount}>({automatizacionesVisibles.length})</span>
              </button>
              <button
                className={styles.tab(seccion === 'citas', theme)}
                onClick={() => setSeccion('citas')}
              >
                Citas
                <span className={styles.tabCount}>({citas.length})</span>
              </button>
              <button
                className={styles.tab(seccion === 'chat', theme)}
                onClick={() => { setSeccion('chat'); refreshUnread(); }}
              >
                Chat
                {unreadCount > 0 && (
                  <span className={styles.tabCount}>({unreadCount})</span>
                )}
              </button>
            </div>

            {/* Sección: Automatizaciones */}
            {seccion === 'automatizaciones' && (
              <>
                <div className={styles.tabsWrapper}>
                  {TABS_ADMIN.map(tab => (
                    <button
                      key={tab.key}
                      className={styles.tab(tabActivo === tab.key, theme)}
                      onClick={() => setTabActivo(tab.key)}
                    >
                      {tab.label}
                      <span className={styles.tabCount}>({countFor(tab.key)})</span>
                    </button>
                  ))}
                </div>

                {/* Búsqueda y orden */}
                <div className={styles.searchRow}>
                  <input
                    type="text"
                    placeholder="Buscar por título o nombre del cliente..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className={styles.searchInput(theme)}
                  />
                  <button
                    onClick={() => setOrden(o => o === 'desc' ? 'asc' : 'desc')}
                    className={styles.searchBtn(theme)}
                  >
                    {orden === 'desc' ? 'Más reciente primero' : 'Más antiguo primero'}
                  </button>
                </div>

                {automatizacionesFiltradas.length === 0 && (
                  <p className={styles.emptySection(theme)}>Sin resultados</p>
                )}

                {automatizacionesFiltradas.map(a => (
                  <AutomatizacionCardAdmin
                    key={a.identificador_unico}
                    automatizacion={a}
                    onRefresh={fetchData}
                  />
                ))}
              </>
            )}

            {/* Sección: Citas */}
            {seccion === 'citas' && (
              <>
                <div className={styles.tabsWrapper}>
                  <button
                    className={styles.tab(tabCitas === 'pendiente', theme)}
                    onClick={() => setTabCitas('pendiente')}
                  >
                    Pendientes
                    <span className={styles.tabCount}>({citas.filter(c => c.estado === 'pendiente').length})</span>
                  </button>
                  <button
                    className={styles.tab(tabCitas === 'atendida', theme)}
                    onClick={() => setTabCitas('atendida')}
                  >
                    Atendidas
                    <span className={styles.tabCount}>({citas.filter(c => c.estado === 'atendida').length})</span>
                  </button>
                </div>

                {citasFiltradas.length === 0 && (
                  <p className={styles.emptySection(theme)}>Sin citas en este estado</p>
                )}

                {citasFiltradas.map(c => (
                  <CitaCardAdmin
                    key={c.identificador_unico_cita}
                    cita={c}
                    onRefresh={fetchData}
                    tieneAutomatizacion={automatizaciones.some(a => a.id_cita_origen === c.identificador_unico_cita)}
                  />
                ))}
              </>
            )}
            {/* Sección: Chat */}
            {seccion === 'chat' && (
              <div className="flex h-[500px] rounded-xl border overflow-hidden border-[#334155] mt-4">
                <ChatHilosList
                  clienteSeleccionado={clienteChat}
                  onSeleccionar={(id, nombre) => {
                    setClienteChat(id);
                    setNombreClienteChat(nombre);
                  }}
                />
                <div className="flex-1">
                  {clienteChat ? (
                    <ChatPanel
                      clienteId={clienteChat}
                      titulo={`Chat con ${nombreClienteChat}`}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-sm text-[#475569]">
                      Selecciona una conversacion
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
