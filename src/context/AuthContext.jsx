import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.user);
          localStorage.setItem('ak_user', JSON.stringify(response.data.user));
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('ak_user');
          setUser(null);
        }
      } else {
        // Check for local mock fallback (optional, could be removed later)
        const savedUser = localStorage.getItem('ak_user');
        if (savedUser) setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('ak_user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Login Successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('ak_user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Registration Successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ak_user');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
