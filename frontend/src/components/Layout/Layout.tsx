import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { ChatProvider } from '../../context/ChatContext';

const Layout = () => {
  return (
    <ChatProvider>
      <Toaster richColors position="top-center" />
      <NavBar />
      <Outlet />
      <Footer />
    </ChatProvider>
  );
};

export default Layout;
