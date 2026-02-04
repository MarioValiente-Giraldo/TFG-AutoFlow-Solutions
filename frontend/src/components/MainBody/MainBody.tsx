import { styles } from './MainBodyStyles';

const Main = () => {
  return (
    <main>
      {/* Sección Hero */}
      <section className={styles.heroSection}>
        {/* Decoraciones de fondo */}
        <div className={styles.heroDecoration1}></div>
        <div className={styles.heroDecoration2}></div>
        
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            
            {/* Columna de texto */}
            <div className={styles.textColumn}>
              <h1 className={styles.heroTitle}>
                Automatización Empresarial, <br className="hidden lg:block"/>
                <span className={styles.heroTitleGradient}>Simplificada.</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Impulsado por n8n.
              </p>
              <p className={styles.heroDescription}>
                Flujos de trabajo personalizados en n8n, integración de backend en Python y soluciones robustas con MongoDB. Transforma tus operaciones con una infraestructura de automatización escalable.
              </p>
              
              {/* Botones */}
              <div className={styles.buttonGroup}>
                <a className={styles.ctaPrimary} href="#">
                  Agenda una consultoría
                </a>
                <a className={styles.ctaSecondary} href="#">
                  <span className={`material-symbols-outlined ${styles.ctaIcon}`}>play_circle</span>
                  Ver demo
                </a>
              </div>
            </div>
            
            {/* Columna de imagen */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
                <img 
                  className={styles.heroImage}
                  src="https://placehold.co/800x600/png?text=Panel+de+Automatización"
                  alt="Visualización futurista de automatización de red"
                />
                <div className={styles.imageOverlay}></div>
                
                {/* Badges flotantes */}
                <div className={`${styles.floatingBadge} ${styles.badge1}`}>
                  <span className="material-symbols-outlined text-cyan-500 text-sm">api</span>
                  <span className={styles.badgeText}>Pasarela API</span>
                </div>
                <div className={`${styles.floatingBadge} ${styles.badge2}`}>
                  <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                  <span className={styles.badgeText}>Flujo Activo</span>
                </div>
                <div className={`${styles.floatingBadge} ${styles.badge3}`}>
                  <span className="material-symbols-outlined text-blue-500 text-sm">storage</span>
                  <span className={styles.badgeText}>Sincronización MongoDB</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Sección de características */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresGrid}>
            
            {/* Tarjeta de característica 1 */}
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.iconCyan}`}>
                <span className={styles.featureIcon}><img src='../public/acctreeMainBody.png' /></span>
              </div>
              <h3 className={styles.featureTitle}>Diseño de Flujos Personalizados</h3>
              <p className={styles.featureDesc}>
                Flujos de trabajo en n8n diseñados a medida para automatizar la lógica específica de tu negocio, eliminando tareas manuales repetitivas y reduciendo errores.
              </p>
            </div>
            
            {/* Tarjeta de característica 2 */}
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                <span className={styles.featureIcon}>< img src='../public/trendingUpMainBody.png' /></span>
              </div>
              <h3 className={styles.featureTitle}>Infraestructura Escalable</h3>
              <p className={styles.featureDesc}>
                Construido sobre backends robustos en Python y arquitectura cloud escalable, asegurando que tu automatización crezca junto a tu empresa.
              </p>
            </div>
            
            {/* Tarjeta de característica 3 */}
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.iconTeal}`}>
                <span className={styles.featureIcon}>< img src='../public/shieldSecurityMainBody.png' /></span>
              </div>
              <h3 className={styles.featureTitle}>Mantenimiento Proactivo</h3>
              <p className={styles.featureDesc}>
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
