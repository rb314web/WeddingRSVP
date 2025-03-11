import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.withCredentials = true;

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/protected');
      setUser(response.data.user);
    } catch (error: any) {
      if (error.response?.status === 401) {
        await forceLogout();
      }
    }
  };

  const forceLogout = async () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } finally {
      await forceLogout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn) await checkAuth();
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);