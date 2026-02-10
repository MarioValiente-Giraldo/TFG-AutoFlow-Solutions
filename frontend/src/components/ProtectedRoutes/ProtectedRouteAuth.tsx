import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import type { ReactNode } from "react";

interface ProtectedRouteAuthProps{
    children: ReactNode
}

export const ProtectedRouteAuth = ({children}: ProtectedRouteAuthProps) => {
    const { isLoading, isAuthenticated } = useAuth();
    const location = useLocation(); // <--- Aquí obtenemos el objeto complejo

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>;
    }

    if (!isAuthenticated) {
        // CORRECCIÓN AQUÍ:
        // No pasamos 'location' entero. Pasamos un objeto simple creado a mano.
        const origin = { pathname: location.pathname };
        
        return <Navigate to="/login" state={{ from: origin }} replace />;
    }
    
    return <>{children}</>
}

export default ProtectedRouteAuth