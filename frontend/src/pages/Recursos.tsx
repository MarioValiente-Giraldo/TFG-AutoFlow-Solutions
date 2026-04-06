import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../components/Recursos/RecursosStyles';

const faqs = [
  {
    question: '¿Qué es N8N?',
    answer:
      'N8N es una plataforma de automatización de flujos de trabajo de código abierto. Permite conectar aplicaciones, APIs y servicios entre sí mediante nodos visuales, sin necesidad de programar. Es la herramienta sobre la que construimos todas nuestras automatizaciones.',
  },
  {
    question: '¿Cuánto tarda en estar lista una automatización?',
    answer:
      'Depende de la complejidad del flujo, pero la mayoría de automatizaciones estándar están listas en menos de 2 semanas desde que se aprueba el presupuesto. Proyectos más complejos con múltiples integraciones pueden llevar entre 3 y 5 semanas.',
  },
  {
    question: '¿Necesito conocimientos técnicos?',
    answer:
      'No. Nosotros nos encargamos de todo el diseño técnico e implementación. Solo necesitas explicarnos cómo funciona tu proceso actual y qué quieres conseguir. El resto lo hacemos nosotros.',
  },
  {
    question: '¿Cómo funciona el proceso de contratación?',
    answer:
      'Primero agendas una consultoría gratuita donde analizamos tu caso. Si decidimos seguir adelante, te enviamos una propuesta con el coste estimado. Una vez aceptada, pagas un anticipo del 50% para iniciar el desarrollo. Al entregar la automatización, se abona el 50% restante.',
  },
  {
    question: '¿Puedo cancelar una automatización en marcha?',
    answer:
      'Sí, puedes cancelar en cualquier momento antes de que el desarrollo esté terminado. En ese caso se factura únicamente el trabajo realizado hasta ese punto según el avance publicado.',
  },
];

const casos = [
  {
    color: 'cyan',
    sector: 'Ecommerce',
    title: 'Confirmaciones de pedido y control de stock',
    desc: 'Cada vez que se registra un nuevo pedido, N8N envía automáticamente un email de confirmación al cliente, actualiza el stock en el sistema y avisa al equipo de logística, todo sin intervención manual.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    color: 'violet',
    sector: 'Salud',
    title: 'Recordatorios automáticos de cita',
    desc: 'Cuando se agenda una cita en el sistema de la clínica, N8N envía un recordatorio por email al paciente 24 horas antes. Esto reduce las ausencias y libera al personal administrativo de llamadas manuales.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    color: 'blue',
    sector: 'Consultoría',
    title: 'Reportes semanales automáticos',
    desc: 'Cada lunes N8N recopila los datos de la semana anterior de distintas fuentes, genera un informe consolidado y lo envía por email a los responsables. Sin exportaciones manuales ni hojas de cálculo.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const Recursos = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={styles.page(theme)}>

      {/* Hero */}
      <section className={styles.hero(theme)}>
        <div className={styles.heroDecoration1(theme)} />
        <div className={styles.heroDecoration2(theme)} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge(theme)}>Recursos</span>
          <h1 className={styles.heroTitle(theme)}>
            Todo lo que necesitas{' '}
            <span className={styles.heroTitleGradient}>saber</span>
          </h1>
          <p className={styles.heroDesc(theme)}>
            Resolvemos las dudas más habituales y te mostramos ejemplos reales de lo que se puede
            conseguir con automatización.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq(theme)}>
        <div className={styles.faqInner}>
          <p className={styles.faqLabel(theme)}>Preguntas frecuentes</p>
          <h2 className={styles.faqTitle(theme)}>¿Tienes dudas?</h2>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <div key={i} className={styles.faqItem(theme)}>
                <button className={styles.faqButton(theme)} onClick={() => toggle(i)}>
                  <span className={styles.faqQuestion(theme)}>{f.question}</span>
                  <svg
                    className={styles.faqChevron(theme, openIndex === i)}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <p className={styles.faqAnswer(theme)}>{f.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className={styles.casos(theme)}>
        <div className={styles.casosInner}>
          <p className={styles.casosLabel(theme)}>Casos de uso</p>
          <h2 className={styles.casosTitle(theme)}>Ejemplos reales</h2>
          <p className={styles.casosDesc(theme)}>
            Estas son algunas de las automatizaciones más habituales que implementamos para
            nuestros clientes.
          </p>
          <div className={styles.casosGrid}>
            {casos.map((c) => (
              <div key={c.title} className={styles.casoCard(theme)}>
                <div className={styles.casoIconWrapper(theme, c.color)}>
                  <span className={styles.casoIconSvg(theme, c.color)}>{c.icon}</span>
                </div>
                <span className={styles.casoTag(theme, c.color)}>{c.sector}</span>
                <h3 className={styles.casoTitle(theme)}>{c.title}</h3>
                <p className={styles.casoDesc(theme)}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Recursos;
