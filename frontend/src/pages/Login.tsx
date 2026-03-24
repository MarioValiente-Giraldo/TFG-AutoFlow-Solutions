import LoginForm from "../components/LoginForm/LoginForm";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { theme } = useTheme();

  const pageStyles = {
    pageWrapper: `
        min-h-screen flex flex-col
        ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-gray-100 text-gray-900'}
        transition-colors duration-300
    `,
    mainContent: `
        flex-grow flex items-center justify-center
        px-4 py-12
    `
  };

  return (
    <div className={pageStyles.pageWrapper}>
      <main className={pageStyles.mainContent}>
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;