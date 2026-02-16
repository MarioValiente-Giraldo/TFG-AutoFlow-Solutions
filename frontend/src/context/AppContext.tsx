import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import type { ReactNode } from 'react';


export const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
              {children}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};