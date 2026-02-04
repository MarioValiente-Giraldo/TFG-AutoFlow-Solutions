import { styles } from './NavbarStyles';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          
          {/* Logo con imagen */}
          <div className={styles.logoContainer}>
            <img 
              src="/logo.png" 
              alt="Logotipo de AutoFlow" 
              className={styles.logoImage} 
            />
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoTitle}>AutoFlow</span>
              <span className={styles.logoSubtitle}>Solutions</span>
            </div>
          </div>
          
          {/* Menú de escritorio */}
          <div className={styles.menuWrapper}>
            <div className={styles.menuList}>
              <a className={styles.menuLink} href="#">Inicio</a>
              <a className={styles.menuLink} href="#">Nosotros</a>
              <a className={styles.menuLink} href="#">Recursos</a>
              <a className={styles.menuLink} href="#">Contacto</a>
            </div>
          </div>
          
          {/* Botón CTA (sin toggle) */}
          <div className={styles.ctaWrapper}>
            <a className={styles.ctaButton} href="#">
                  Agenda una consultoría
            </a>
          </div>
          
          {/* Botón del menú móvil */}
          <div className={styles.mobileBtnWrapper}>
            <button 
              type="button"
              className={styles.mobileBtn}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono hamburguesa (SVG nativo para no depender de fuentes externas) */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
