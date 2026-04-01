import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PagoCompletado = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
      <div className={`rounded-xl border p-10 max-w-md w-full text-center ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}`}>
        <div className="text-5xl mb-4">✓</div>
        <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}`}>
          Pago completado
        </h1>
        <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-500'}`}>
          Tu pago se ha procesado correctamente. El equipo comenzará a trabajar en tu automatización en breve.
        </p>
        <button
          onClick={() => navigate('/dashboard/cliente')}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-cyan-400 text-[#0f172a] hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer"
        >
          Ver mis automatizaciones
        </button>
      </div>
    </div>
  );
};

export default PagoCompletado;
