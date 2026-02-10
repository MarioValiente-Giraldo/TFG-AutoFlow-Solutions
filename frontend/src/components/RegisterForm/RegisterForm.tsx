import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from './RegisterFormStyles';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log('Intento de registro:', formData);
  };

  return (
    <div className={styles.registerContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Crea tu cuenta</h1>
        <p className={styles.subtitle}>Únete a la agencia líder en automatización empresarial</p>
      </div>

      {/* Barra de Progreso */}
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <p className={styles.progressStep}>Paso 1 de 2</p>
          <p className={styles.progressLabel}>Detalles de la cuenta</p>
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: '50%' }}></div>
        </div>
      </div>

      {/* Formulario */}
      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Nombre Completo */}
        <div className={styles.formField}>
          <label className={styles.label}>Nombre completo</label>
          <input
            className={styles.input}
            type="text"
            name="fullName"
            placeholder="Ingresa tu nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Correo Corporativo */}
        <div className={styles.formField}>
          <label className={styles.label}>Correo corporativo</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="nombre@empresa.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nombre de la Empresa */}
        <div className={styles.formField}>
          <label className={styles.label}>Nombre de la empresa</label>
          <input
            className={styles.input}
            type="text"
            name="company"
            placeholder="Ingresa el nombre de tu empresa"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contraseña */}
        <div className={styles.formField}>
          <label className={styles.label}>Contraseña</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Crea una contraseña segura"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Checkbox Términos */}
        <div className={styles.termsWrapper}>
          <input
            className={styles.checkbox}
            id="terms"
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <label className={styles.termsLabel} htmlFor="terms">
            Acepto los{' '}
            <a className={styles.termsLink} href="#">Términos y Condiciones</a>
            {' '}y la{' '}
            <a className={styles.termsLink} href="#">Política de Privacidad</a>.
          </label>
        </div>

        {/* Botón Submit */}
        <button className={styles.submitButton} type="submit">
          Crear cuenta
        </button>
      </form>

      {/* Link al Login */}
      <div className={styles.loginLinkWrapper}>
        <p className={styles.loginText}>
          ¿Ya tienes una cuenta?{' '}
          <Link className={styles.loginLink} to="/login">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;