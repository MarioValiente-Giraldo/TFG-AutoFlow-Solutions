import React from 'react';
import Footer from '../components/Footer/Footer';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Navbar from '../components/NavBar/NavBar';
import { useTheme } from '../context/ThemeContext';

const Register: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-gray-100 text-gray-900'
    }`}>

        <Navbar />
      <main className="grow flex items-center justify-center px-4 py-12 relative">
        {/* Decoraciones de fondo - adaptadas al tema */}
        <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-125 h-125 rounded-full blur-3xl opacity-20 pointer-events-none ${
          theme === 'dark' ? 'bg-cyan-900/40' : 'bg-cyan-300/30'
        }`}></div>
        <div className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-100 h-100 rounded-full blur-3xl opacity-20 pointer-events-none ${
          theme === 'dark' ? 'bg-blue-900/40' : 'bg-blue-300/30'
        }`}></div>

        <div className="relative z-10 w-full flex justify-center">
            <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;