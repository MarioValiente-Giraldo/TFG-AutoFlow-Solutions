import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './NavbarStyles';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  return (
    <nav className={styles.navbar(theme)}>
      <div className={styles.container}>
        <div className={styles.content}>
          
          {/* --- 1. LOGO --- */}
          <Link to="/" className={styles.logoContainer}>
            <img
              src="/logo.webp"
              alt="AutoFlow Logo"
              className={styles.logoImage}
            />
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoTitle(theme)}>AutoFlow</span>
              <span className={styles.logoSubtitle(theme)}>Solutions</span>
            </div>
          </Link>

          {/* --- 2. MENÚ CENTRAL --- */}
          <div className={styles.menuWrapper}>
            <div className={styles.menuList}>
              <Link className={styles.menuLink(theme)} to="/">Inicio</Link>
              <Link className={styles.menuLink(theme)} to="/servicios">Servicios</Link>
              <Link className={styles.menuLink(theme)} to="/nosotros">Nosotros</Link>
              <Link className={styles.menuLink(theme)} to="/recursos">Recursos</Link>
            </div>
          </div>
          
          {/* --- 3. BOTONES DE ACCIÓN (Derecha) --- */}
          <div className={styles.ctaWrapper}>

            {/* Botón Agendar (Siempre visible) */}
            <Link className={styles.ctaButton} to="/agendar">
                <span>Agenda una consultoría</span>
                {/* Flecha pequeña animada */}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>

            {/* Botón de Cambio de Tema (Sol/Luna) */}
            <button
              onClick={toggleTheme}
              className={styles.themeBtn(theme)}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? (
                // Icono Sol (Modo Claro)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Icono Luna (Modo Oscuro)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {isAuthenticated ? (
                // === SI ESTÁ LOGUEADO ===
                <>
                    {/* Botón Mi Espacio */}
                    <Link className={styles.ctaLoginBtn(theme)} to={user?.rol === 'admin' ? '/dashboard/admin' : '/dashboard/cliente'}>
                        <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Mi Espacio</span>
                    </Link>

                    {/* Botón Cerrar Sesión */}
                    <button
                        onClick={handleLogout}
                        className={styles.logoutBtn(theme)}
                        title={`Cerrar sesión de ${user?.nombre || ''}`}
                    >
                        {/* Icono Puerta/Salida */}
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </>
            ) : (
                // === NO ESTÁ LOGUEADO ===
                <Link className={styles.ctaLoginBtn(theme)} to="/login">
                    Identifíquese
                </Link>
            )}

          </div>
          
          {/* --- 4. BOTÓN MENÚ MÓVIL --- */}
          <div className={styles.mobileBtnWrapper}>
            {/* Botón de Tema en Móvil */}
            <button
              onClick={toggleTheme}
              className={styles.themeBtn(theme)}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className={styles.mobileBtn(theme)}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;