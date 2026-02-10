import React from 'react';
import Footer from '../components/Footer/Footer';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Navbar from '../components/NavBar/NavBar';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-100 overflow-hidden">
      
        <Navbar />
      <main className="grow flex items-center justify-center px-4 py-12 relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-125 h-125 rounded-full blur-3xl opacity-20 bg-cyan-900/40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-100 h-100 rounded-full blur-3xl opacity-20 bg-blue-900/40 pointer-events-none"></div>

        <div className="relative z-10 w-full flex justify-center">
            <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;