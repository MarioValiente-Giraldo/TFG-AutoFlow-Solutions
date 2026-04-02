import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
