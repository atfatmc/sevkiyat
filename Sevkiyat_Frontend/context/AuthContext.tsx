import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Token varsa kullanıcı bilgilerini getir
      axios.get('http://localhost:8080/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);

      // Kullanıcı bilgilerini getir
      const userResponse = await axios.get('http://localhost:8080/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userResponse.data);

      Swal.fire({
        icon: 'success',
        title: 'Giriş Başarılı!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Giriş Başarısız',
        text: 'Kullanıcı adı veya şifre hatalı!'
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    Swal.fire({
      icon: 'success',
      title: 'Çıkış Yapıldı',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 