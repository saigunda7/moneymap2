import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, you would validate the credentials against your backend
    const userData = { 
      uid: `local-${Date.now()}`,
      email,
      name: email.split('@')[0],
      photoURL: null
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const register = async (name, email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData = { 
      uid: `local-${Date.now()}`,
      email,
      name: name,
      photoURL: null
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const resetPassword = async (email) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, you would call your backend to send a password reset email
    return { success: true };
  };

  const loginWithGoogle = async () => {
    // Simulate Google login
    await new Promise(resolve => setTimeout(resolve, 500));
    const userData = {
      uid: `google-${Date.now()}`,
      email: 'user@example.com',
      name: 'Google User',
      photoURL: null
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
