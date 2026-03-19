import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getAllAutomatizaciones } from '../services/automatizacionesAPI';
import AutomatizacionCardAdmin from '../components/AdminDashboard/AutomatizacionCardAdmin';
import NavBar from '../components/NavBar/NavBar';
import type { Automatizacion } from '../types';
import { styles } from '../components/AdminDashboard/AdminDashboardStyles';

const ESTADOS: Automatizacion['estado'][] = [
  'pendiente_revision',
  'aceptada_pendiente_cliente',
  'en_desarrollo',
  'terminada',
  'rechazada',
];

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <>
      <NavBar />
      <div className={styles.page(theme)}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle(theme)}>Panel de Administración</h1>
          <p className={styles.pageSubtitle(theme)}>Gestiona todas las automatizaciones de los clientes</p>

          {loading && <p className={styles.loadingText(theme)}>Cargando automatizaciones...</p>}
          {error && <p className={styles.errorText}>{error}</p>}

          {!loading && !error && ESTADOS.map(estado => {
            const lista = automatizaciones.filter(a => a.estado === estado);
            return (
              <div key={estado} className={styles.section}>
                <p className={styles.sectionTitle(theme)}>{styles.badgeLabel(estado)}</p>
                <div className={styles.sectionDivider(theme)} />
                {lista.length === 0
                  ? <p className={styles.emptySection(theme)}>Sin automatizaciones</p>
                  : lista.map(a => (
                    <AutomatizacionCardAdmin
                      key={a.identificador_unico}
                      automatizacion={a}
                      onRefresh={fetchData}
                    />
                  ))
                }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
