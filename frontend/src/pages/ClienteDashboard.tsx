import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getMisAutomatizaciones } from '../services/automatizacionesAPI';
import AutomatizacionStatusCard from '../components/ClienteDashboard/AutomatizacionStatusCard';
import type { Automatizacion } from '../types';
import { styles } from '../components/ClienteDashboard/ClienteDashboardStyles';

const ClienteDashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const res = await getMisAutomatizaciones(user.id);
      setAutomatizaciones(res.data);
    } catch {
      setError('Error al cargar tus automatizaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.page(theme)}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle(theme)}>Mis Automatizaciones</h1>
          <p className={styles.pageSubtitle(theme)}>Revisa el estado de tus proyectos</p>

          {loading && <p className={styles.loadingText(theme)}>Cargando...</p>}
          {error && <p className={styles.errorText}>{error}</p>}

          {!loading && !error && automatizaciones.length === 0 && (
            <div className={styles.emptyWrapper(theme)}>
              <p className={styles.emptyTitle(theme)}>Aún no tienes automatizaciones</p>
              <p>Solicita una cita para empezar.</p>
              <Link to="/agendar" className={styles.emptyLink}>Agendar cita</Link>
            </div>
          )}

          {!loading && !error && automatizaciones.map(a => (
            <AutomatizacionStatusCard
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

export default ClienteDashboard;
