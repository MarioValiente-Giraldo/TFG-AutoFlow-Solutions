import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';

const ProtectedRouteAdmin = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user || user.rol !== 'admin') return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRouteAdmin;
