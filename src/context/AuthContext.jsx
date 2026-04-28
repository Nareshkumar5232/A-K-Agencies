import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ak_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ak_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ak_user');
    }
  }, [user]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ak_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser({ name: foundUser.name, email: foundUser.email });
      toast.success('Login Successful!');
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('ak_users') || '[]');
    if (users.find(u => u.email === email)) {
      toast.error('Email already exists');
      return false;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('ak_users', JSON.stringify(users));
    
    setUser({ name, email });
    toast.success('Registration Successful!');
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
