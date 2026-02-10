import React, { useActionState, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './RegisterFormStyles';

const VITE_API_URL = import.meta.env.VITE_API_URL
type FormState = {
  success: boolean;
  message: string;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. Estado para la barra de progreso (0 a 100)
  const [progress, setProgress] = useState(0);

  // 2. Función para calcular el progreso en tiempo real
  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // Usamos FormData para leer los valores actuales del formulario fácilmente
    const data = new FormData(form);
    
    const fullName = data.get('fullName')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const company = data.get('company')?.toString().trim();
    const password = data.get('password')?.toString().trim();
    const acceptTerms = data.get('acceptTerms');

    // Campos requeridos para el 100%
    let completedSteps = 0;
    const totalSteps = 5; // Nombre, Email, Empresa, Pass, Términos

    if (fullName) completedSteps++;
    if (email) completedSteps++;
    if (company) completedSteps++;
    if (password) completedSteps++;
    if (acceptTerms) completedSteps++;

    // Calculamos porcentaje
    const currentProgress = (completedSteps / totalSteps) * 100;
    setProgress(currentProgress);
  };

 const registerAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    // 1. Extraer los datos del FormData
    const fullName = formData.get('fullName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const company = formData.get('company')?.toString().trim();
    const password = formData.get('password')?.toString();
    const acceptTerms = formData.get('acceptTerms');

    // 2. Validación Básica en Frontend
    if (!fullName || !email || !company || !password || !acceptTerms) {
      return { 
        success: false, 
        message: "Faltan campos obligatorios o no has aceptado los términos." 
      };
    }

    try {
      // 3. Petición al Backend (Flask)
      const response = await fetch(`${VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convertimos los datos a JSON para enviarlos
        body: JSON.stringify({
            fullName,
            email,
            phone,   
            company,
            password,
            acceptTerms: acceptTerms === 'on' 
        })
      });

      // 4. Leer la respuesta del servidor
      const data = await response.json();

      // 5. Verificar si el servidor devolvió un error (ej: 400, 409, 500)
      if (!response.ok) {
        return { 
            success: false, 
            message: data.message || "Error al registrar el usuario." 
        };
      }

      // 6. Éxito total
      return { 
        success: true, 
        message: "¡Cuenta creada con éxito! Redirigiendo..." 
      };

    } catch (error) {
      console.error("Error de red:", error);
      return { 
        success: false, 
        message: "Error de conexión con el servidor. Inténtalo más tarde." 
      };
    }
  };

  const [state, submitAction, isPending] = useActionState<FormState, FormData>(registerAction, {
    success: false,
    message: ''
  });

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, navigate]);

  return (
    <div className={styles.registerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Crea tu cuenta</h1>
        <p className={styles.subtitle}>Únete a la agencia líder en automatización empresarial</p>
      </div>

      {/* Barra de Progreso Dinámica */}
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <p className={styles.progressStep}>
             {/* Texto dinámico según porcentaje */}
             {progress === 100 ? "¡Todo listo!" : `Completado: ${Math.round(progress)}%`}
          </p>
          <p className={styles.progressLabel}>Información de Perfil</p>
        </div>
        <div className={styles.progressBarBg}>
          {/* 3. Aplicamos el ancho dinámico aquí */}
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }} 
          ></div>
        </div>
      </div>

      {/* 4. Añadimos onChange={handleFormChange} al formulario */}
      <form action={submitAction} onChange={handleFormChange} className={styles.form}>
        
        {state.message && (
            <div className={`p-3 rounded-lg text-sm text-center border ${
                state.success ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {state.message}
            </div>
        )}

        <div className={styles.formField}>
          <label className={styles.label}>Nombre completo</label>
          <input className={styles.input} type="text" name="fullName" placeholder="Nombre y apellidos" required disabled={isPending} />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Correo electrónico</label>
          <input className={styles.input} type="email" name="email" placeholder="nombre@empresa.com" required disabled={isPending} />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Teléfono de contacto</label>
          <input className={styles.input} type="tel" name="phone" placeholder="+34 600 000 000" disabled={isPending} />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Nombre de la empresa</label>
          <input className={styles.input} type="text" name="company" placeholder="Ej: Tech SL" required disabled={isPending} />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Contraseña</label>
          <input className={styles.input} type="password" name="password" placeholder="Crea una contraseña segura" required disabled={isPending} />
        </div>

        <div className={styles.termsWrapper}>
          <input className={styles.checkbox} id="terms" type="checkbox" name="acceptTerms" required disabled={isPending} />
          <label className={styles.termsLabel} htmlFor="terms">
            Acepto los <a className={styles.termsLink} href="#">Términos y Condiciones</a>.
          </label>
        </div>

        <button 
          className={`${styles.submitButton} ${isPending ? 'opacity-70 cursor-wait' : ''} ${progress === 100 ? 'ring-2 ring-offset-2 ring-cyan-400 ring-offset-slate-900' : ''}`} 
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <div className={styles.loginLinkWrapper}>
        <p className={styles.loginText}>
          ¿Ya tienes una cuenta? <Link className={styles.loginLink} to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;