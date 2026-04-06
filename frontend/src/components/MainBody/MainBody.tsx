import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './MainBodyStyles';
import N8nWorkflowPlayer from '../N8nAnimation/N8nWorkflowPlayer';

const Main = () => {
  const { theme } = useTheme();

  return (
    <main>
      {/* Sección Hero */}
      <section className={styles.heroSection(theme)}>
        {/* Decoraciones de fondo */}
        <div className={styles.heroDecoration1(theme)}></div>
        <div className={styles.heroDecoration2(theme)}></div>

        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>

            {/* Columna de texto */}
            <div className={styles.textColumn}>
              <h1 className={styles.heroTitle(theme)}>
                Automatización Empresarial, <br className="hidden lg:block"/>
                <span className={styles.heroTitleGradient}>Simplificada.</span>
              </h1>
              <p className={styles.heroSubtitle(theme)}>
                Impulsado por n8n.
              </p>
              <p className={styles.heroDescription(theme)}>
                Flujos de trabajo personalizados en n8n, conecté sus herramientas y eliminé las tareas manuales para escalar su negocio. Transforma tus operaciones con una infraestructura de automatización escalable.
              </p>

              {/* Botones */}
              <div className={styles.buttonGroup}>
                <Link className={styles.ctaPrimary} to="/agendar">
                  Agenda una consultoría
                </Link>
              </div>
            </div>

            {/* Columna de animación — workflow N8N montándose */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper(theme)}>
                <N8nWorkflowPlayer />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section className={styles.featuresSection(theme)}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresGrid}>

            {/* Tarjeta 1 */}
            <div className={styles.featureCard(theme)}>
              <div className={`${styles.iconWrapper} ${styles.iconCyan(theme)}`}>
                <svg className={`${styles.featureIcon} ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className={styles.featureTitle(theme)}>Diseño de Flujos Personalizados</h3>
              <p className={styles.featureDesc(theme)}>
                Flujos de trabajo en n8n diseñados a medida para automatizar la lógica específica de tu negocio, eliminando tareas manuales repetitivas y reduciendo errores.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className={styles.featureCard(theme)}>
              <div className={`${styles.iconWrapper} ${styles.iconBlue(theme)}`}>
                <svg className={`${styles.featureIcon} ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className={styles.featureTitle(theme)}>Infraestructura Escalable</h3>
              <p className={styles.featureDesc(theme)}>
                Construido sobre backends robustos en Python y arquitectura cloud escalable, asegurando que tu automatización crezca junto a tu empresa.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className={styles.featureCard(theme)}>
              <div className={`${styles.iconWrapper} ${styles.iconTeal(theme)}`}>
                <svg className={`${styles.featureIconLarge} ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle(theme)}>Mantenimiento Proactivo</h3>
              <p className={styles.featureDesc(theme)}>
                Monitoreo 24/7 y mantenimiento proactivo para garantizar que tus flujos se mantengan operativos, seguros y optimizados en todo momento.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;