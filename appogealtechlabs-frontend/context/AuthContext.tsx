'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { getTokens, setTokens, removeTokens } from '@/lib/auth';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (tokens: { access: string; refresh: string }) => void;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user on mount
  useEffect(() => {
    const initAuth = async () => {
      const tokens = getTokens();
      if (tokens) {
        try {
          // Fetch user profile
          const response = await api.get('/user/profile/');
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          // If fetch fails (e.g. invalid token), clear auth
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (tokens: { access: string; refresh: string }) => {
    setTokens(tokens);
    try {
      const response = await api.get('/user/profile/');
      setUser(response.data);
      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login failed fetching profile", error);
      logout();
    }
  };

  const logout = () => {
    removeTokens();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAuthenticated: !!user 
    }}>
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
