import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../helpers/LocalStorage';
import { IUser } from '../interfaces/IUser';

interface IAuth {
  id: string;
  name: string;
  email: string;
  token: string;
  user: IUser;
}

interface AuthContextType {
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(
    getLocalStorage<IAuth>('auth')?.user || null
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = getLocalStorage<IAuth>('auth')?.user || null;
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData: IUser) => {
    setLocalStorage('auth', { user: userData, isAuthenticated: true });
    setUser(userData);
  };

  const logout = () => {
    removeLocalStorage('auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro do AuthProvider');
  }
  return context;
};
