import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Tipos de tema
export type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 2. Creación del Contexto
const ThemeContext = createContext<ThemeContextType | null>(null);

// 3. Componente Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    // Cargar tema desde localStorage al montar
    useEffect(() => {
        const storedTheme = localStorage.getItem('autoflow_theme') as Theme | null;
        if (storedTheme === 'light' || storedTheme === 'dark') {
            setTheme(storedTheme);
        }
    }, []);

    // Alternar tema
    const toggleTheme = () => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('autoflow_theme', newTheme);
    };

    const value: ThemeContextType = {
        theme,
        toggleTheme
    };

    return (
        <ThemeContext value={value}>
            {children}
        </ThemeContext>
    );
}

// 4. Hook personalizado para consumir el contexto
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe usarse dentro de un ThemeProvider');
    }
    return context;
}
