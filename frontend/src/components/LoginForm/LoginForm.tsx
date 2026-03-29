import React, { useActionState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './LoginFormStyles';
import { usersAPI } from '../../services/usersAPI';

// 1. Definimos el tipo de estado del formulario
// Añadimos 'user' opcional para pasar los datos del backend al useEffect
type FormState = {
  success: boolean;
  message: string;
  user?: any; 
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { theme } = useTheme();

  // 2. Acción de Login
  const loginAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString();

    // Validación simple
    if (!email || !password) {
      return { success: false, message: "Por favor, introduce tu correo y contraseña." };
    }

    try {
      const { user } = await usersAPI.login({ email, password });
      return { success: true, message: "¡Bienvenido de nuevo! Entrando...", user };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error de conexión con el servidor.";
      return { success: false, message };
    }
  };

  // 3. Hook para gestionar el estado y la acción
  const [state, submitAction, isPending] = useActionState<FormState, FormData>(loginAction, {
    success: false,
    message: ''
  });

 // 4. Efecto: Sincronizar Contexto y Redirigir a HOME
  useEffect(() => {
    if (state.success && state.user) {
      
      // A) Actualizamos el contexto global
      login(state.user);

      // B) Redirigimos según el rol del usuario
      const destination = state.user.rol === 'admin' ? '/admin' : '/dashboard';
      const timer = setTimeout(() => {
        navigate(destination, { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.success, state.user, login, navigate]);

  return (
    <div className={styles.loginContainer(theme)}>

      {/* Login Header */}
      <div className={styles.headerContent}>
        <img
          src="/logo.webp"
          alt="AutoFlow Logo"
          className={styles.logo}
        />
        <h2 className={styles.title(theme)}>Inicia sesión en tu cuenta</h2>
        <p className={styles.subtitle(theme)}>Bienvenido de nuevo a AutoFlow Solutions</p>
      </div>

      {/* Formulario conectado a la acción */}
      <form className={styles.form} action={submitAction}>

        {/* Mensaje de Estado (Feedback) */}
        {state.message && (
            <div className={`p-3 rounded-lg text-sm text-center border transition-all duration-300 ${
                state.success
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {state.message}
            </div>
        )}

        {/* Campo Email */}
        <div className={styles.formField}>
          <div className={styles.labelWrapper}>
            <label className={styles.label(theme)}>Correo electrónico</label>
          </div>
          <input
            className={styles.input(theme)}
            type="email"
            name="email"
            placeholder="nombre@empresa.com"
            required
            disabled={isPending}
          />
        </div>

        {/* Campo Contraseña */}
        <div className={styles.formField}>
          <div className={styles.labelWrapper}>
            <label className={styles.label(theme)}>Contraseña</label>
            <a className={styles.forgotPasswordLink} href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <input
            className={styles.input(theme)}
            type="password"
            name="password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
        </div>

        {/* Botón Submit Dinámico */}
        <button
            className={`${styles.submitButton} ${isPending ? 'opacity-70 cursor-wait' : ''}`}
            type="submit"
            disabled={isPending}
        >
          {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Enlace Registro */}
      <div className={styles.signupWrapper(theme)}>
        <p className={styles.signupText(theme)}>
          ¿No tienes una cuenta? {' '}
        <Link className={styles.signupLink(theme)} to="/register">Regístrate</Link>
        </p>
      </div>

    </div>
  );
};

export default LoginForm;