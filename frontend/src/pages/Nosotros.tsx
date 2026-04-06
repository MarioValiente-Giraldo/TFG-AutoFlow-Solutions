import { useTheme } from '../context/ThemeContext';
import { styles } from '../components/Nosotros/NosotrosStyles';

const valores = [
  {
    color: 'cyan',
    title: 'Rapidez',
    desc: 'Entregamos soluciones en el menor tiempo posible sin sacrificar calidad. Sabemos que cada día de proceso manual tiene un coste para tu empresa.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    color: 'blue',
    title: 'Transparencia',
    desc: 'Comunicamos el progreso en todo momento. Nuestros clientes siempre saben en qué estado está su proyecto y cuánto van a pagar antes de comprometerse.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    color: 'violet',
    title: 'Personalización',
    desc: 'No vendemos plantillas. Cada automatización se diseña desde cero para adaptarse a los procesos reales de tu negocio, no al revés.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
];

const Nosotros = () => {
  const { theme } = useTheme();

  return (
    <div className={styles.page(theme)}>

      {/* Hero */}
      <section className={styles.hero(theme)}>
        <div className={styles.heroDecoration1(theme)} />
        <div className={styles.heroDecoration2(theme)} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge(theme)}>Quiénes somos</span>
          <h1 className={styles.heroTitle(theme)}>
            La automatización al alcance de{' '}
            <span className={styles.heroTitleGradient}>cualquier empresa</span>
          </h1>
          <p className={styles.heroDesc(theme)}>
            AutoFlow Solutions nació con una idea clara: que las pequeñas y medianas empresas
            puedan acceder a la misma eficiencia operativa que las grandes corporaciones, sin
            necesidad de grandes equipos técnicos ni inversiones desproporcionadas.
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className={styles.mision(theme)}>
        <div className={styles.misionInner}>
          <p className={styles.misionLabel(theme)}>Nuestra misión</p>
          <p className={styles.misionQuote(theme)}>
            "Eliminar la fricción operativa de las empresas mediante{' '}
            <span className={styles.misionQuoteAccent}>automatizaciones inteligentes</span>
            {' '}que liberen a las personas para centrarse en lo que realmente importa."
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className={styles.valores(theme)}>
        <div className={styles.valoresInner}>
          <p className={styles.valoresLabel(theme)}>Cómo trabajamos</p>
          <h2 className={styles.valoresTitle(theme)}>Nuestros valores</h2>
          <div className={styles.valoresGrid}>
            {valores.map((v) => (
              <div key={v.title} className={styles.valorCard(theme)}>
                <div className={styles.valorIconWrapper(theme, v.color)}>
                  <span className={styles.valorIconSvg(theme, v.color)}>{v.icon}</span>
                </div>
                <h3 className={styles.valorTitle(theme)}>{v.title}</h3>
                <p className={styles.valorDesc(theme)}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className={styles.contacto(theme)}>
        <div className={styles.contactoInner}>
          <p className={styles.contactoLabel(theme)}>Contacto</p>
          <h2 className={styles.contactoTitle(theme)}>¿Hablamos?</h2>
          <p className={styles.contactoDesc(theme)}>
            Si tienes alguna pregunta o quieres saber más sobre nosotros antes de agendar una
            consultoría, escríbenos directamente.
          </p>
          <div className={styles.contactoBox(theme)}>
            <div className={styles.contactoIconWrapper(theme)}>
              <svg className={styles.contactoIconSvg(theme)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <a href="mailto:tech@autoflow.com" className={styles.contactoEmail(theme)}>
              tech@autoflow.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nosotros;
