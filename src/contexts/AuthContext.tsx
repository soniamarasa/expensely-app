import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../helpers/LocalStorage';
import { IUser } from '../interfaces/IUser';

interface IAuth {
  access_token: string;
  token_type: string;
  user: IUser;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: IUser | null;
  login: (userData: IUser, access_token: string, token_type: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(
    getLocalStorage<IAuth>('auth')?.user || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = getLocalStorage<IAuth>('auth');
    if (authData?.user) {
      setUser(authData.user);
    }
    setLoading(false);
  }, []);

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

  const login = (userData: IUser, access_token: string, token_type: string) => {
    const authData: IAuth = {
      user: userData,
      access_token,
      token_type,
      isAuthenticated: true,
    };
    setLocalStorage('auth', authData);
    setUser(userData);
  };

  const logout = () => {
    removeLocalStorage('auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
