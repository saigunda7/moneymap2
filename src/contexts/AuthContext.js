import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Add currentUser alias for backward compatibility
  const currentUser = user;

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
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
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
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
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
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

  const loginWithGoogle = async (email) => {
    if (!email) {
      throw new Error('Email is required for Google Sign-In');
    }
    
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      uid: `google-${Date.now()}`,
      email: email,
      name: email.split('@')[0],
      photoURL: null,
      provider: 'google'
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        loginWithGoogle,
      }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
