import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Interfaces
interface User {
    id: string;
    email: string;
    nombre: string;
    rol: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// 2. Creación del Contexto
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Componente Provider 
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('autoflow_user');
        
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('autoflow_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('autoflow_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('autoflow_user');
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user, 
        isLoading
    };

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
}

// 4. Hook para consumir el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}