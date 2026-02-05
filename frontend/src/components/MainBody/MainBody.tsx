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
                Flujos de trabajo personalizados en n8n, conecté sus herramientas y eliminé las tareas manuales para escalar su negocio. Transforma tus operaciones con una infraestructura de automatización escalable.
              </p>
              
              {/* Botones */}
              <div className={styles.buttonGroup}>
                <a className={styles.ctaPrimary} href="#">
                  Agenda una consultoría
                </a>
              </div>
            </div>
            
            {/* Columna de imagen */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
                {/* CAMBIO: Ruta correcta en /public y efecto zoom aplicado vía styles.heroImage */}
                <img 
                  className={styles.heroImage}
                  src="/heroBannerMainBody.png"
                  alt="Visualización futurista de automatización"
                />
                <div className={styles.imageOverlay}></div>
                
                
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Sección de características */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresGrid}>
            
            {/* Tarjeta 1 (Standard Icon) */}
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.iconCyan}`}>
                <img className={styles.featureIcon} src='/acctreeMainBody.png' alt="Diseño de flujos" />
              </div>
              <h3 className={styles.featureTitle}>Diseño de Flujos Personalizados</h3>
              <p className={styles.featureDesc}>
                Flujos de trabajo en n8n diseñados a medida para automatizar la lógica específica de tu negocio, eliminando tareas manuales repetitivas y reduciendo errores.
              </p>
            </div>
            
            {/* Tarjeta 2 (Standard Icon) */}
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                <img className={styles.featureIcon} src='/trendingUpMainBody.png' alt="Infraestructura escalable" />
              </div>
              <h3 className={styles.featureTitle}>Infraestructura Escalable</h3>
              <p className={styles.featureDesc}>
                Construido sobre backends robustos en Python y arquitectura cloud escalable, asegurando que tu automatización crezca junto a tu empresa.
              </p>
            </div>
            
            {/* Tarjeta 3 (ESCUDO - Icono GRANDE) */}
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.iconTeal}`}>
                <img className={styles.featureIconLarge} src='/shieldSecurityMainBody.png' alt="Seguridad y mantenimiento" />
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