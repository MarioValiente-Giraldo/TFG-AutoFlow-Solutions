import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getAllAutomatizaciones } from '../services/automatizacionesAPI';
import { citasAPI } from '../services/citasAPI';
import AutomatizacionCardAdmin from '../components/AdminDashboard/AutomatizacionCardAdmin';
import CitaCardAdmin from '../components/AdminDashboard/CitaCardAdmin';
import StatsCards from '../components/AdminDashboard/StatsCards';
import type { Automatizacion, Cita } from '../types';
import { styles } from '../components/AdminDashboard/AdminDashboardStyles';
import { TABS_ADMIN, type TabEstado } from '../utils/automatizacionesUtils';

type SeccionActiva = 'automatizaciones' | 'citas';
type TabCitas = 'pendiente' | 'atendida';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [seccion, setSeccion] = useState<SeccionActiva>('automatizaciones');
  const [tabActivo, setTabActivo] = useState<TabEstado>('todos');
  const [tabCitas, setTabCitas] = useState<TabCitas>('pendiente');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [resAuto, resCitas] = await Promise.all([
        getAllAutomatizaciones(),
        citasAPI.getAllCitas(),
      ]);
      setAutomatizaciones(resAuto.data);
      setCitas(resCitas.data);
    } catch {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtradas = tabActivo === 'todos'
    ? automatizaciones
    : automatizaciones.filter(a => a.estado === tabActivo);

  const countFor = (key: TabEstado) =>
    key === 'todos'
      ? automatizaciones.length
      : automatizaciones.filter(a => a.estado === key).length;

  const citasFiltradas = citas.filter(c => c.estado === tabCitas);

  return (
    <div className={styles.page(theme)}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle(theme)}>Panel de Administración</h1>
        <p className={styles.pageSubtitle(theme)}>Gestiona todas las automatizaciones y citas de los clientes</p>

        {loading && <p className={styles.loadingText(theme)}>Cargando...</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && !error && (
          <>
            <StatsCards automatizaciones={automatizaciones} />

            {/* Sección principal */}
            <div className={styles.tabsWrapper}>
              <button
                className={styles.tab(seccion === 'automatizaciones', theme)}
                onClick={() => setSeccion('automatizaciones')}
              >
                Automatizaciones
                <span className={styles.tabCount}>({automatizaciones.length})</span>
              </button>
              <button
                className={styles.tab(seccion === 'citas', theme)}
                onClick={() => setSeccion('citas')}
              >
                Citas
                <span className={styles.tabCount}>({citas.length})</span>
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

                {filtradas.length === 0 && (
                  <p className={styles.emptySection(theme)}>Sin automatizaciones en este estado</p>
                )}

                {filtradas.map(a => (
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
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
