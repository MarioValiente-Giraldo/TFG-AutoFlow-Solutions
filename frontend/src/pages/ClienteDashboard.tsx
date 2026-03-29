import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getMisAutomatizaciones } from '../services/automatizacionesAPI';
import { citasAPI } from '../services/citasAPI';
import AutomatizacionStatusCard from '../components/ClienteDashboard/AutomatizacionStatusCard';
import CitaCard from '../components/ClienteDashboard/CitaCard';
import type { Automatizacion, Cita } from '../types';
import { styles } from '../components/ClienteDashboard/ClienteDashboardStyles';

type Tab = 'automatizaciones' | 'citas';

const ClienteDashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabActivo, setTabActivo] = useState<Tab>('automatizaciones');

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const [resAuto, resCitas] = await Promise.all([
        getMisAutomatizaciones(user.id),
        citasAPI.getMisCitas(user.email),
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

  return (
    <div className={styles.page(theme)}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle(theme)}>Mi Panel</h1>
        <p className={styles.pageSubtitle(theme)}>Revisa el estado de tus proyectos y citas</p>

        {loading && <p className={styles.loadingText(theme)}>Cargando...</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && !error && (
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
                  automatizaciones.map(a => (
                    <AutomatizacionStatusCard
                      key={a.identificador_unico}
                      automatizacion={a}
                      onRefresh={fetchData}
                    />
                  ))
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
          </>
        )}
      </div>
    </div>
  );
};

export default ClienteDashboard;
