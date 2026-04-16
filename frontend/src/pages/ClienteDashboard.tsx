import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getMisAutomatizaciones } from '../services/automatizacionesAPI';
import { citasAPI } from '../services/citasAPI';
import AutomatizacionStatusCard from '../components/ClienteDashboard/AutomatizacionStatusCard';
import CitaCard from '../components/ClienteDashboard/CitaCard';
import type { Automatizacion, Cita } from '../types';
import { styles } from '../components/ClienteDashboard/ClienteDashboardStyles';
import ChatPanel from '../components/ChatPanel/ChatPanel';
import { useChat } from '../context/ChatContext';

type Tab = 'automatizaciones' | 'citas' | 'chat';

const ClienteDashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabActivo, setTabActivo] = useState<Tab>('automatizaciones');
  const [busqueda, setBusqueda] = useState('');
  const [busquedaDebounced, setBusquedaDebounced] = useState('');
  const [orden, setOrden] = useState<'desc' | 'asc'>('desc');
  const { unreadCount, refreshUnread } = useChat();

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [resAuto, resCitas] = await Promise.all([
        getMisAutomatizaciones(user.id),
        citasAPI.getMisCitas(user.email),
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

  return (
    <div className={styles.page(theme)}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle(theme)}>Mi Panel</h1>
        <p className={styles.pageSubtitle(theme)}>Revisa el estado de tus proyectos y citas</p>

        {loading && <p className={styles.loadingText(theme)}>Cargando...</p>}

        {!loading && (
          <>
            {/* Tabs */}
            <div className={styles.tabsWrapper}>
              <button
                className={styles.tab(tabActivo === 'automatizaciones', theme)}
                onClick={() => setTabActivo('automatizaciones')}
              >
                Automatizaciones
                <span className={styles.tabCount}>({automatizaciones.length})</span>
              </button>
              <button
                className={styles.tab(tabActivo === 'citas', theme)}
                onClick={() => setTabActivo('citas')}
              >
                Citas
                <span className={styles.tabCount}>({citas.length})</span>
              </button>
              <button
                className={styles.tab(tabActivo === 'chat', theme)}
                onClick={() => { setTabActivo('chat'); refreshUnread(); }}
              >
                Chat
                {unreadCount > 0 && (
                  <span className={styles.tabCount}>({unreadCount})</span>
                )}
              </button>
            </div>

            {/* Tab: Automatizaciones */}
            {tabActivo === 'automatizaciones' && (
              <>
                {automatizaciones.length === 0 ? (
                  <div className={styles.emptyWrapper(theme)}>
                    <p className={styles.emptyTitle(theme)}>Aún no tienes automatizaciones</p>
                    <p>Solicita una cita para empezar.</p>
                    <Link to="/agendar" className={styles.emptyLink}>Agendar cita</Link>
                  </div>
                ) : (
                  <>
                    {/* Búsqueda y orden */}
                    <div className={styles.searchRow}>
                      <input
                        type="text"
                        placeholder="Buscar por título o gestor..."
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

                    {(() => {
                      const resultado = automatizaciones
                        .filter(a => {
                          const q = busquedaDebounced.toLowerCase();
                          return (
                            a.titulo.toLowerCase().includes(q) ||
                            (a.nombre_admin ?? '').toLowerCase().includes(q)
                          );
                        })
                        .sort((a, b) => {
                          const diff = new Date(a.fecha_solicitud).getTime() - new Date(b.fecha_solicitud).getTime();
                          return orden === 'asc' ? diff : -diff;
                        });

                      if (resultado.length === 0) {
                        return <p className={styles.emptyTitle(theme)}>Sin resultados</p>;
                      }
                      return resultado.map(a => (
                        <AutomatizacionStatusCard
                          key={a.identificador_unico}
                          automatizacion={a}
                          onRefresh={fetchData}
                        />
                      ));
                    })()}
                  </>
                )}
              </>
            )}

            {/* Tab: Citas */}
            {tabActivo === 'citas' && (
              <>
                {citas.length === 0 ? (
                  <div className={styles.emptyWrapper(theme)}>
                    <p className={styles.emptyTitle(theme)}>No tienes citas agendadas</p>
                    <Link to="/agendar" className={styles.emptyLink}>Agendar cita</Link>
                  </div>
                ) : (
                  citas.map(c => (
                    <CitaCard key={c.identificador_unico_cita} cita={c} />
                  ))
                )}
              </>
            )}

            {/* Tab: Chat */}
            {tabActivo === 'chat' && (
              <ChatPanel titulo="Chat con AutoFlow" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClienteDashboard;
