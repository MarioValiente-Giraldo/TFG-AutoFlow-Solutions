import React, { useState } from 'react';
import { styles } from './LoginFormStyles';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intento de login:', { email, password });
  };

  return (
    <div className={styles.loginContainer}>
      
      {/* Login Header */}
      <div className={styles.headerContent}>
        
        {/* LOGO PNG (Reemplazado el SVG) */}
        <img 
            src="/logo.png" 
            alt="AutoFlow Logo" 
            className={styles.logo}
        />
        
        <h2 className={styles.title}>Inicia sesión en tu cuenta</h2>
        <p className={styles.subtitle}>Bienvenido de nuevo a AutoFlow Solutions</p>
      </div>

      {/* Formulario */}
      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Campo Email */}
        <div className={styles.formField}>
          <div className={styles.labelWrapper}>
            <label className={styles.label}>Correo electrónico</label>
          </div>
          <input 
            className={styles.input}
            type="email"
            placeholder="nombre@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Botón Submit */}
        <button className={styles.submitButton} type="submit">
          <span>Iniciar sesión</span>
        </button>
      </form>

      {/* Enlace Registro */}
      <div className={styles.signupWrapper}>
        <p className={styles.signupText}>
          ¿No tienes una cuenta? {' '}
          <a className={styles.signupLink} href="#">Regístrate</a>
        </p>
      </div>
      
    </div>
  );
};

export default LoginForm;