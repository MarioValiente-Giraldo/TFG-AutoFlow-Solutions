import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';


interface AuthContextType {
    user: User | null;
    login: (userData: User, accessToken: string, refreshToken: string) => void;
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

    const login = (userData: User, accessToken: string, refreshToken: string) => {
        setUser(userData);
        localStorage.setItem('autoflow_user', JSON.stringify(userData));
        localStorage.setItem('autoflow_access_token', accessToken);
        localStorage.setItem('autoflow_refresh_token', refreshToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('autoflow_user');
        localStorage.removeItem('autoflow_access_token');
        localStorage.removeItem('autoflow_refresh_token');
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