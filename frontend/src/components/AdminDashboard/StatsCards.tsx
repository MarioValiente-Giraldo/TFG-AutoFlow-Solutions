import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { Automatizacion, Cita } from '../../types';
import { styles } from './StatsCardsStyles';

interface StatsCardsProps {
  automatizaciones: Automatizacion[];
  citas: Cita[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ automatizaciones, citas }) => {
  const { theme } = useTheme();

  const total = automatizaciones.length;
  const pendientes = automatizaciones.filter(a => a.estado === 'pendiente_revision').length;
  const enDesarrollo = automatizaciones.filter(a => a.estado === 'en_desarrollo').length;
  const terminadas = automatizaciones.filter(a => a.estado === 'terminada').length;
  const ingresos = automatizaciones
    .filter(a => a.gasto_estimado !== null && ['aceptada_pendiente_cliente', 'pendiente_pago', 'en_desarrollo', 'terminada'].includes(a.estado))
    .reduce((sum, a) => sum + (a.gasto_estimado ?? 0), 0);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const citasProximas = citas.filter(c => {
    if (c.estado !== 'pendiente') return false;
    const fecha = new Date(c.fecha_preferida);
    return fecha >= hoy;
  }).length;

  const stats = [
    { label: 'Total automatizaciones', value: total, color: 'text-cyan-400' },
    { label: 'Pendientes de revisión', value: pendientes, color: 'text-amber-400' },
    { label: 'En desarrollo', value: enDesarrollo, color: 'text-violet-400' },
    { label: 'Terminadas', value: terminadas, color: 'text-green-400' },
    { label: 'Ingresos estimados', value: `${ingresos.toLocaleString('es-ES')} €`, color: 'text-cyan-400' },
    { label: 'Citas próximas', value: citasProximas, color: 'text-blue-400' },
  ];

  return (
    <div className={styles.grid}>
      {stats.map(stat => (
        <div key={stat.label} className={styles.card(theme)}>
          <p className={styles.label(theme)}>{stat.label}</p>
          <p className={`${styles.value(theme)} ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
