import React, { useActionState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './LoginFormStyles';

// 1. Definimos el tipo de estado del formulario
type FormState = {
  success: boolean;
  message: string;
};
const API_URL = import.meta.env.VITE_API_URL

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

 // 2. Acción de Login 
const loginAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString();

    // Validación simple
    if (!email || !password) {
      return { success: false, message: "Por favor, introduce tu correo y contraseña." };
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { 
            success: false, 
            message: data.message || "Credenciales incorrectas." 
        };
      }

      // AQUÍ ES DONDE GUARDARÍAMOS EL TOKEN (JWT) EN EL FUTURO
      // localStorage.setItem('token', data.token);
      console.log("Login exitoso:", data.user);

      return { 
        success: true, 
        message: "¡Bienvenido de nuevo! Redirigiendo..." 
      };

    } catch (error) {
      console.error("Error de login:", error);
      return { success: false, message: "Error de conexión con el servidor." };
    }
};

  // 3. Hook para gestionar el estado y la acción
  const [state, submitAction, isPending] = useActionState<FormState, FormData>(loginAction, {
    success: false,
    message: ''
  });

  // 4. Efecto para redirigir tras login exitoso
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        navigate('/'); 
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, navigate]);

  return (
    <div className={styles.loginContainer}>
      
      {/* Login Header */}
      <div className={styles.headerContent}>
        <img 
            src="/logo.png" 
            alt="AutoFlow Logo" 
            className={styles.logo}
        />
        <h2 className={styles.title}>Inicia sesión en tu cuenta</h2>
        <p className={styles.subtitle}>Bienvenido de nuevo a AutoFlow Solutions</p>
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
            <label className={styles.label}>Correo electrónico</label>
          </div>
          <input 
            className={styles.input}
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
            <label className={styles.label}>Contraseña</label>
            <a className={styles.forgotPasswordLink} href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <input 
            className={styles.input}
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
      <div className={styles.signupWrapper}>
        <p className={styles.signupText}>
          ¿No tienes una cuenta? {' '}
        <Link className={styles.signupLink} to="/register">Regístrate</Link>
        </p>
      </div>
      
    </div>
  );
};

export default LoginForm;