import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { Automatizacion } from '../../types';
import { styles } from './StatsCardsStyles';

interface StatsCardsProps {
  automatizaciones: Automatizacion[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ automatizaciones }) => {
  const { theme } = useTheme();

  const total = automatizaciones.length;
  const pendientes = automatizaciones.filter(a => a.estado === 'pendiente_revision').length;
  const enDesarrollo = automatizaciones.filter(a => a.estado === 'en_desarrollo').length;
  const terminadas = automatizaciones.filter(a => a.estado === 'terminada').length;
  const ingresos = automatizaciones
    .filter(a => a.gasto_estimado !== null && ['aceptada_pendiente_cliente', 'pendiente_pago', 'en_desarrollo', 'terminada'].includes(a.estado))
    .reduce((sum, a) => sum + (a.gasto_estimado ?? 0), 0);

  const stats = [
    { label: 'Total', value: total, color: 'text-cyan-400' },
    { label: 'Pendientes de revisión', value: pendientes, color: 'text-amber-400' },
    { label: 'En desarrollo', value: enDesarrollo, color: 'text-violet-400' },
    { label: 'Terminadas', value: terminadas, color: 'text-green-400' },
    { label: 'Ingresos estimados', value: `${ingresos.toLocaleString('es-ES')} €`, color: 'text-cyan-400' },
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
