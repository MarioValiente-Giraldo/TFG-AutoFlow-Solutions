import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../components/Servicios/ServiciosStyles';

const servicios = [
  {
    color: 'cyan',
    title: 'Automatización de Procesos',
    desc: 'Diseñamos flujos de trabajo en N8N a medida para conectar tus herramientas (CRM, email, hojas de cálculo) y eliminar tareas manuales repetitivas que frenan tu equipo.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    color: 'blue',
    title: 'Automatización de Notificaciones',
    desc: 'Configura alertas y emails automáticos que se disparan según eventos de tu negocio: nuevos pedidos, cambios de estado, vencimientos o cualquier condición que definas.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    color: 'violet',
    title: 'Integración de APIs',
    desc: 'Conectamos plataformas que de forma nativa no se hablan entre sí. Integramos cualquier servicio con API REST para que tus datos fluyan de forma continua y sin intervención humana.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    color: 'teal',
    title: 'Tareas Repetitivas y Reportes',
    desc: 'Automatizamos la extracción, transformación y envío de datos: reportes diarios, sincronización entre bases de datos, scraping programado y cualquier tarea que se repita en el tiempo.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    color: 'blue',
    title: 'Consultoría Personalizada',
    desc: 'Analizamos los flujos de trabajo actuales de tu empresa e identificamos qué se puede automatizar y con qué impacto. Te entregamos una propuesta clara y adaptada a tu presupuesto.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    color: 'cyan',
    title: 'Mantenimiento y Soporte',
    desc: 'Una vez desplegada tu automatización, la monitorizamos y mantenemos operativa. Ajustamos los flujos cuando cambien tus herramientas o necesidades, sin que tengas que preocuparte.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const Servicios = () => {
  const { theme } = useTheme();

  return (
    <div className={styles.page(theme)}>

      {/* Hero */}
      <section className={styles.hero(theme)}>
        <div className={styles.heroDecoration1(theme)} />
        <div className={styles.heroDecoration2(theme)} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge(theme)}>Nuestros servicios</span>
          <h1 className={styles.heroTitle(theme)}>
            Automatización a medida para{' '}
            <span className={styles.heroTitleGradient}>tu negocio</span>
          </h1>
          <p className={styles.heroSubtitle(theme)}>
            Impulsado por N8N, diseñamos, integramos y mantenemos flujos de trabajo que eliminan la
            fricción operativa y permiten a tu equipo centrarse en lo que importa.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className={styles.section(theme)}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel(theme)}>¿Qué hacemos?</p>
          <h2 className={styles.sectionTitle(theme)}>Todo lo que necesitas para automatizar</h2>
          <p className={styles.sectionDesc(theme)}>
            Desde la consultoría inicial hasta el mantenimiento continuo, cubrimos cada etapa del
            proceso para que tu inversión en automatización sea un éxito.
          </p>

          <div className={styles.grid}>
            {servicios.map((s) => (
              <div key={s.title} className={styles.card(theme)}>
                <div className={styles.cardIconWrapper(theme, s.color)}>
                  <span className={styles.cardIconSvg(theme, s.color)}>{s.icon}</span>
                </div>
                <h3 className={styles.cardTitle(theme)}>{s.title}</h3>
                <p className={styles.cardDesc(theme)}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta(theme)}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaBox(theme)}>
            <div className={styles.ctaGlow(theme)} />
            <h2 className={styles.ctaTitle(theme)}>¿No sabes cuál necesitas?</h2>
            <p className={styles.ctaDesc(theme)}>
              Agenda una consultoría gratuita. Analizamos tu caso y te recomendamos el servicio más
              adecuado sin ningún compromiso.
            </p>
            <Link to="/agendar" className={styles.ctaButton}>
              Agenda una consultoría
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Servicios;
