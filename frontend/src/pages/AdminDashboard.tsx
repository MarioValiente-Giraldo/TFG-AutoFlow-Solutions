import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getAllAutomatizaciones } from '../services/automatizacionesAPI';
import AutomatizacionCardAdmin from '../components/AdminDashboard/AutomatizacionCardAdmin';
import StatsCards from '../components/AdminDashboard/StatsCards';
import type { Automatizacion } from '../types';
import { styles } from '../components/AdminDashboard/AdminDashboardStyles';

type TabEstado = 'todos' | Automatizacion['estado'];

const TABS: { key: TabEstado; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendiente_revision', label: 'Pendiente revisión' },
  { key: 'aceptada_pendiente_cliente', label: 'Esperando cliente' },
  { key: 'en_desarrollo', label: 'En desarrollo' },
  { key: 'terminada', label: 'Terminada' },
  { key: 'rechazada', label: 'Rechazada' },
];

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabActivo, setTabActivo] = useState<TabEstado>('todos');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllAutomatizaciones();
      setAutomatizaciones(res.data);
    } catch {
      setError('Error al cargar las automatizaciones');
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

  return (
    <>
      <div className={styles.page(theme)}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle(theme)}>Panel de Administración</h1>
          <p className={styles.pageSubtitle(theme)}>Gestiona todas las automatizaciones de los clientes</p>

          {loading && <p className={styles.loadingText(theme)}>Cargando automatizaciones...</p>}
          {error && <p className={styles.errorText}>{error}</p>}

          {!loading && !error && <StatsCards automatizaciones={automatizaciones} />}

          {!loading && !error && (
            <div className={styles.tabsWrapper}>
              {TABS.map(tab => (
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
          )}

          {!loading && !error && filtradas.length === 0 && (
            <p className={styles.emptySection(theme)}>Sin automatizaciones en este estado</p>
          )}

          {!loading && !error && filtradas.map(a => (
            <AutomatizacionCardAdmin
              key={a.identificador_unico}
              automatizacion={a}
              onRefresh={fetchData}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
