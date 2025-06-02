import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface User {
  id?: number;
  username: string;
  email?: string;
  name?: string;
  company?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: User) => Promise<void>;
  updateUser: (id: number, user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });
      
      const { token, user: userData } = response.data;
      if (token && userData) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        throw new Error('No token or user data received');
      }
    } catch (error) {
      console.error('Login error:', error);
      handleLogout();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout();
    }
  };

  const register = async (userData: User) => {
    try {
      await api.post('/auth/register', userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const updateUser = async (id: number, userData: User) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      const updatedUser = response.data;
      if (id === user?.id) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return updatedUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      if (id === user?.id) {
        handleLogout();
      }
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  };

  const getUserById = async (id: number) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get user by id error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        register,
        updateUser,
        deleteUser,
        getAllUsers,
        getUserById
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 