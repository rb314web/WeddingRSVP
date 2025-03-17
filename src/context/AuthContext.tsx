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
  refreshAccessToken: () => Promise<void>;
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
        await refreshAccessToken();
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      await axios.post('/api/refresh-token');
      await checkAuth();
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('Błąd wylogowania', error);
    }
  };

  useEffect(() => {
    checkAuth().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login: setUser, logout, checkAuth, refreshAccessToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);