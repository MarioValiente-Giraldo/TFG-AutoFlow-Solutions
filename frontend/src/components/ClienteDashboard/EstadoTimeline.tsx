import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { Automatizacion } from '../../types';
import { styles } from './EstadoTimelineStyles';

interface EstadoTimelineProps {
  automatizacion: Automatizacion;
}

type StepStatus = 'done' | 'current' | 'future' | 'rejected';

const STEPS = [
  { key: 'solicitud',   label: 'Solicitud' },
  { key: 'revision',    label: 'Revisión' },
  { key: 'propuesta',   label: 'Propuesta' },
  { key: 'desarrollo',  label: 'Desarrollo' },
  { key: 'terminada',   label: 'Terminada' },
];

// Índice del paso "activo" según el estado de la automatización
const ESTADO_STEP: Record<string, number> = {
  pendiente_revision:          1,
  aceptada_pendiente_cliente:  2,
  pendiente_pago:              2,
  en_desarrollo:               3,
  terminada:                   4,
};

const getStepStatus = (
  stepIndex: number,
  activeIndex: number,
  rechazadoEnIndex: number | null,
): StepStatus => {
  if (rechazadoEnIndex !== null) {
    if (stepIndex < rechazadoEnIndex) return 'done';
    if (stepIndex === rechazadoEnIndex) return 'rejected';
    return 'future';
  }
  if (stepIndex < activeIndex) return 'done';
  if (stepIndex === activeIndex) return activeIndex === STEPS.length - 1 ? 'done' : 'current';
  return 'future';
};

const EstadoTimeline: React.FC<EstadoTimelineProps> = ({ automatizacion }) => {
  const { theme } = useTheme();
  const { estado, gasto_estimado } = automatizacion;

  const activeIndex = ESTADO_STEP[estado] ?? 0;

  // Si está rechazada, inferimos en qué paso ocurrió
  const rechazadoEnIndex: number | null = estado === 'rechazada'
    ? (gasto_estimado !== null ? 2 : 1)
    : null;

  return (
    <div className={styles.wrapper}>
      {STEPS.map((step, index) => {
        const status = getStepStatus(index, activeIndex, rechazadoEnIndex);
        const isLastStep = index === STEPS.length - 1;

        return (
          <React.Fragment key={step.key}>
            <div className={styles.step}>
              <div className={styles.circle(status)}>
                {status === 'done' && '✓'}
                {status === 'current' && '●'}
                {status === 'future' && String(index + 1)}
                {status === 'rejected' && '✕'}
              </div>
              <span className={styles.label(status, theme)}>{step.label}</span>
            </div>
            {!isLastStep && (
              <div className={styles.connector(status === 'done', theme)} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default EstadoTimeline;
