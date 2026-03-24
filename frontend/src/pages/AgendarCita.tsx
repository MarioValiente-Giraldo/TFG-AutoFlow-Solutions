import AgendarCitaForm from '../components/AgendarCita/AgendarCitaForm';
import { useTheme } from '../context/ThemeContext';

const AgendarCita = () => {
  const { theme } = useTheme();

  const pageWrapper = `
    min-h-screen flex flex-col
    ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-gray-100 text-gray-900'}
    transition-colors duration-300
  `;

  return (
    <div className={pageWrapper}>
      <main className="flex-grow flex items-start justify-center px-4 py-12">
        <AgendarCitaForm />
      </main>
    </div>
  );
};

export default AgendarCita;
