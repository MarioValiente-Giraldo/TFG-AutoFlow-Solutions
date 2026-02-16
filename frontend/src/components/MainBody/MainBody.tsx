import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './MainBodyStyles';

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

            {/* Columna de imagen */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper(theme)}>
                <img
                  className={styles.heroImage}
                  src="/heroBannerMainBody.png"
                  alt="Visualización futurista de automatización"
                />
                <div className={styles.imageOverlay(theme)}></div>
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
                <img className={styles.featureIcon} src='/acctreeMainBody.png' alt="Diseño de flujos" />
              </div>
              <h3 className={styles.featureTitle(theme)}>Diseño de Flujos Personalizados</h3>
              <p className={styles.featureDesc(theme)}>
                Flujos de trabajo en n8n diseñados a medida para automatizar la lógica específica de tu negocio, eliminando tareas manuales repetitivas y reduciendo errores.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className={styles.featureCard(theme)}>
              <div className={`${styles.iconWrapper} ${styles.iconBlue(theme)}`}>
                <img className={styles.featureIcon} src='/trendingUpMainBody.png' alt="Infraestructura escalable" />
              </div>
              <h3 className={styles.featureTitle(theme)}>Infraestructura Escalable</h3>
              <p className={styles.featureDesc(theme)}>
                Construido sobre backends robustos en Python y arquitectura cloud escalable, asegurando que tu automatización crezca junto a tu empresa.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className={styles.featureCard(theme)}>
              <div className={`${styles.iconWrapper} ${styles.iconTeal(theme)}`}>
                <img className={styles.featureIconLarge} src='/shieldSecurityMainBody.png' alt="Seguridad y mantenimiento" />
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