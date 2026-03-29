import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { Cita } from '../../types';
import { styles } from './CitaCardStyles';

interface CitaCardProps {
  cita: Cita;
}

const CitaCard: React.FC<CitaCardProps> = ({ cita }) => {
  const { theme } = useTheme();

  const fecha = new Date(cita.fecha_preferida).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <div className={styles.card(theme)}>
      <div className={styles.header}>
        <div>
          <p className={styles.title(theme)}>{cita.tipo_automatizacion}</p>
          <p className={styles.meta(theme)}>{cita.empresa} · {cita.telefono}</p>
        </div>
        <span className={styles.badge(cita.estado)}>
          {styles.badgeLabel(cita.estado)}
        </span>
      </div>

      <p className={styles.description(theme)}>{cita.descripcion}</p>

      <div className={styles.detailRow}>
        <span className={styles.detailItem(theme)}>
          Fecha: <span className={styles.detailValue(theme)}>{fecha}</span>
        </span>
        <span className={styles.detailItem(theme)}>
          Franja: <span className={styles.detailValue(theme)}>{cita.franja_horaria}</span>
        </span>
      </div>

      {cita.estado === 'pendiente' && (
        <button className={styles.btnEditar}>
          Editar cita
        </button>
      )}
    </div>
  );
};

export default CitaCard;
