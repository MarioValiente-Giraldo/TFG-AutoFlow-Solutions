import Footer from "../components/Footer/Footer";
import LoginForm from "../components/LoginForm/LoginForm";
import Navbar from "../components/NavBar/NavBar";

const pageStyles = {
    pageWrapper: `
        min-h-screen flex flex-col 
        bg-slate-950 dark 
        text-slate-200
    `,
    
    
    mainContent: `
        flex-grow flex items-center justify-center 
        px-4 py-12
    `
};

const Login = () => {
  return (
    <div className={pageStyles.pageWrapper}>
      <Navbar />
      <main className={pageStyles.mainContent}>
        <LoginForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;