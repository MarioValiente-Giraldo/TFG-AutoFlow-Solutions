import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './AuthContext';     
import type { ReactNode } from 'react';


export const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
            {children}
      </AuthProvider>
    </BrowserRouter>
  );
};