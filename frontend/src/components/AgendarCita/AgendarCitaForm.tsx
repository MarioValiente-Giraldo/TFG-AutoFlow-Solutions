import React, { useActionState, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './AgendarCitaFormStyles';
import { crearAutomatizacion } from '../../services/automatizacionesAPI';
import { citasAPI } from '../../services/citasAPI';
import { useAuth } from '../../context/AuthContext';

type FormState = {
  success: boolean;
  message: string;
  submittedEmail?: string;
};

const TIPOS_AUTOMATIZACION = [
  'Integración entre apps (N8N / Zapier)',
  'Automatización de emails y notificaciones',
  'Scraping y extracción de datos',
  'Flujos de aprobación internos',
  'CRM / ERP automatizado',
  'Otro',
];

const FRANJAS = [
  { value: 'manana', label: 'Mañana', sub: '9 – 13h' },
  { value: 'tarde', label: 'Tarde', sub: '15 – 19h' },
  { value: 'indiferente', label: 'Indiferente', sub: '' },
];

const AgendarCitaForm: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [charCount, setCharCount] = useState(0);
  const [franja, setFranja] = useState('');

  const agendarAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const tipoAutomatizacion = formData.get('tipoAutomatizacion')?.toString();
    const descripcion = formData.get('descripcion')?.toString().trim();
    const fechaPreferida = formData.get('fechaPreferida')?.toString();
    const franjaHoraria = formData.get('franjaHoraria')?.toString();
    const aceptaPrivacidad = formData.get('aceptaPrivacidad');

    if (!tipoAutomatizacion || !descripcion || !fechaPreferida || !franjaHoraria) {
      return { success: false, message: 'Por favor completa todos los campos obligatorios.' };
    }

    if (!aceptaPrivacidad) {
      return { success: false, message: 'Debes aceptar la política de privacidad para continuar.' };
    }

    try {
      await Promise.all([
        crearAutomatizacion({
          titulo: tipoAutomatizacion,
          descripcion: descripcion,
          tipo_automatizacion: tipoAutomatizacion,
          identificador_propietario: user!.id,
          email_propietario: user!.email,
          nombre_propietario: user!.nombre,
        }),
        citasAPI.agendarCita({
          nombre: user!.nombre,
          email: user!.email,
          telefono: user!.telefono || '',
          empresa: user!.empresa || '',
          tipoAutomatizacion: tipoAutomatizacion,
          descripcion: descripcion,
          fechaPreferida: fechaPreferida,
          franjaHoraria: franjaHoraria,
        }),
      ]);
      return { success: true, message: '', submittedEmail: user!.email };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error de conexión con el servidor.';
      toast.error(message);
      return { success: false, message: '' };
    }
  };

  const [state, submitAction, isPending] = useActionState<FormState, FormData>(agendarAction, {
    success: false,
    message: '',
  });

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.card(theme)}>

      {/* Header */}
      <div className="mb-8">
        <h1 className={styles.title(theme)}>Agenda tu Consultoría</h1>
        <p className={styles.subtitle(theme)}>
          Cuéntanos tu caso y diseñamos juntos la automatización ideal para tu negocio.
        </p>
      </div>

      {state.success ? (

        /* ---- SUCCESS STATE ---- */
        <div className={styles.successWrapper}>
          <div className={styles.successIconWrapper}>
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className={styles.successTitle(theme)}>Consulta recibida</h2>
          </div>
          <p className={styles.successText(theme)}>
            Te contactaremos en menos de 24h al correo{' '}
            <span className="text-cyan-400 font-medium">{state.submittedEmail}</span>.
          </p>
          <Link to="/" className={styles.backButton}>Volver al inicio</Link>
          <Link to="/dashboard/cliente" className={styles.backButton}>Ver mi espacio</Link>
        </div>

      ) : (

        /* ---- FORM ---- */
        <form className={styles.form} action={submitAction}>

          {/* Mensaje de validación */}
          {state.message && (
            <div className={styles.statusMessage(false)}>
              {state.message}
            </div>
          )}

          {/* SECCIÓN 1: Tu proyecto */}
          <div className={styles.sectionDivider(theme)}>
            <div className={styles.sectionTitle(theme)}>Tu proyecto</div>

            {/* Tipo de automatización */}
            <div className={styles.formField}>
              <label className={styles.label(theme)}>
                Tipo de automatización <span className={styles.required}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select(theme)}
                  name="tipoAutomatizacion"
                  required
                  disabled={isPending}
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {TIPOS_AUTOMATIZACION.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <svg
                  className={styles.selectArrow(theme)}
                  width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Descripción */}
            <div className={styles.formField}>
              <label className={styles.label(theme)}>
                Describe el proceso que quieres automatizar <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea(theme)}
                name="descripcion"
                rows={5}
                maxLength={750}
                placeholder="Actualmente hacemos X manualmente cada semana. Necesitamos que cuando ocurra Y, se dispare Z automáticamente..."
                required
                disabled={isPending}
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <span className={styles.charCount(theme)}>{charCount} / 750</span>
            </div>

          </div>

          {/* SECCIÓN 3: Disponibilidad */}
          <div className={styles.sectionDivider(theme)}>
            <div className={styles.sectionTitle(theme)}>Disponibilidad</div>

            {/* Fecha preferida */}
            <div className={styles.formField}>
              <label className={styles.label(theme)}>
                Fecha preferida <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input(theme)}
                type="date"
                name="fechaPreferida"
                min={today}
                required
                disabled={isPending}
              />
              <p className="mt-1.5 text-xs text-amber-400">
                Elige bien la fecha y franja horaria. Una vez enviada la solicitud no podrás modificarla.
              </p>
            </div>

            {/* Franja horaria */}
            <div className={styles.formField}>
              <label className={styles.label(theme)}>
                Franja horaria <span className={styles.required}>*</span>
              </label>
              <input type="hidden" name="franjaHoraria" value={franja} />
              <div className={styles.radioGroup}>
                {FRANJAS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    className={styles.radioButton(theme, franja === f.value)}
                    onClick={() => setFranja(f.value)}
                    disabled={isPending}
                  >
                    <span className="block font-semibold">{f.label}</span>
                    {f.sub && <span className="block text-xs opacity-70">{f.sub}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Info videollamada */}
            <div className={styles.videoInfo(theme)}>
              <svg className={styles.videoIcon} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <span>
                La consultoría se realizará por <strong>videollamada</strong>. Recibirás el enlace de acceso en tu correo.
              </span>
            </div>
          </div>

          {/* Privacidad */}
          <div className={styles.checkboxWrapper}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="aceptaPrivacidad"
              name="aceptaPrivacidad"
              value="true"
              disabled={isPending}
            />
            <label htmlFor="aceptaPrivacidad" className={styles.checkboxLabel(theme)}>
              He leído y acepto la{' '}
              <a href="#" className="text-cyan-400 hover:underline">política de privacidad</a>
            </label>
          </div>

          {/* Submit */}
          <button
            className={`${styles.submitButton} ${isPending ? 'opacity-70 cursor-wait' : ''}`}
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Enviando solicitud...' : 'Solicitar consultoría'}
          </button>

        </form>
      )}

    </div>
  );
};

export default AgendarCitaForm;
