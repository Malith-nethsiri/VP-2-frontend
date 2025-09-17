import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('token');

      if (token) {
        try {
          // Set the token in api headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Get user profile
          const response = await api.get('/auth/me');
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          // Clear invalid token
          Cookies.remove('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { user, token } = response.data;

      // Store token in cookie
      Cookies.set('token', token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Set the token in api headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user, requiresVerification: response.data.requiresVerification };
    } catch (error) {
      console.error('Login failed:', error);
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      const { user, token } = response.data;

      // Store token in cookie
      Cookies.set('token', token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Set the token in api headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user, requiresVerification: response.data.requiresVerification };
    } catch (error) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  };

  const logout = () => {
    // Remove token from cookie
    Cookies.remove('token');

    // Remove token from api headers
    delete api.defaults.headers.common['Authorization'];

    setUser(null);
    setIsAuthenticated(false);
  };

  const verifyEmail = async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token });

      // Update user verification status
      if (user) {
        setUser({ ...user, is_verified: true });
      }

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Email verification failed:', error);
      const message = error.response?.data?.message || 'Email verification failed';
      throw new Error(message);
    }
  };

  const resendVerification = async () => {
    try {
      const response = await api.post('/auth/resend-verification');
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Resend verification failed:', error);
      const message = error.response?.data?.message || 'Failed to resend verification email';
      throw new Error(message);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      const updatedUser = response.data.user;

      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update failed:', error);
      const message = error.response?.data?.message || 'Profile update failed';
      throw new Error(message);
    }
  };

  const refreshUserData = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    verifyEmail,
    resendVerification,
    updateProfile,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};