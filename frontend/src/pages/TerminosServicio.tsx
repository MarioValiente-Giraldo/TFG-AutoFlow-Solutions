import { useTheme } from '../context/ThemeContext';

const secciones = [
  {
    titulo: '1. Objeto del contrato',
    contenido:
      'AutoFlow Solutions (en adelante, "la Agencia") presta servicios de automatización de procesos empresariales mediante herramientas de software. El presente documento regula las condiciones de uso de la plataforma y la contratación de dichos servicios.',
  },
  {
    titulo: '2. Registro y cuenta de usuario',
    contenido:
      'Para acceder a los servicios, el usuario debe crear una cuenta proporcionando información veraz y actualizada. El usuario es responsable de mantener la confidencialidad de sus credenciales y de cualquier actividad realizada desde su cuenta.',
  },
  {
    titulo: '3. Servicios contratados',
    contenido:
      'Los servicios se definen en cada proyecto acordado individualmente entre la Agencia y el cliente. El alcance, plazo y precio se establecen previamente a través de una consultoría inicial y quedan recogidos en una propuesta formal.',
  },
  {
    titulo: '4. Pagos y facturación',
    contenido:
      'Los precios de los servicios se indicarán en la propuesta comercial correspondiente. Los pagos se realizan a través de los medios habilitados en la plataforma y se consideran definitivos salvo error técnico demostrable.',
  },
  {
    titulo: '5. Propiedad intelectual',
    contenido:
      'Los flujos de automatización, integraciones y desarrollos entregados al cliente pasan a ser propiedad del cliente una vez completado el pago íntegro del proyecto. AutoFlow Solutions se reserva el derecho de utilizar capturas de pantalla genéricas o descripciones del tipo de solución en su portfolio, sin revelar datos confidenciales del cliente.',
  },
  {
    titulo: '6. Protección de datos',
    contenido:
      'AutoFlow Solutions trata los datos personales de los usuarios conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPDGDD). Los datos recogidos se utilizan exclusivamente para la prestación del servicio y no se ceden a terceros sin consentimiento expreso.',
  },
  {
    titulo: '7. Limitación de responsabilidad',
    contenido:
      'La Agencia no será responsable de pérdidas de datos, interrupciones de negocio u otros daños indirectos derivados del uso de los servicios, salvo dolo o negligencia grave imputable directamente a AutoFlow Solutions.',
  },
  {
    titulo: '8. Modificaciones',
    contenido:
      'AutoFlow Solutions se reserva el derecho de modificar estos términos en cualquier momento. Los cambios se comunicarán con un mínimo de 15 días de antelación a través de la plataforma o por correo electrónico.',
  },
  {
    titulo: '9. Legislación aplicable',
    contenido:
      'Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de la ciudad de Málaga, salvo que la normativa vigente establezca otro fuero imperativo.',
  },
];

const TerminosServicio = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* Hero */}
      <section className={`relative py-20 px-4 ${isDark ? 'bg-slate-900' : 'bg-white'} border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>
            Legal
          </span>
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Términos y Condiciones
          </h1>
          <p className={`text-base ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Última actualización: abril de 2025
          </p>
          <p className={`mt-4 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Al crear una cuenta o contratar nuestros servicios, aceptas las condiciones descritas a continuación. Te recomendamos leerlas detenidamente.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        {secciones.map((s) => (
          <div key={s.titulo}>
            <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {s.titulo}
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              {s.contenido}
            </p>
          </div>
        ))}

        {/* Contacto */}
        <div className={`rounded-xl p-6 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ¿Tienes alguna duda legal?
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Puedes contactarnos en{' '}
            <a href="mailto:tech@autoflow.com" className="text-cyan-500 hover:underline">
              tech@autoflow.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default TerminosServicio;
