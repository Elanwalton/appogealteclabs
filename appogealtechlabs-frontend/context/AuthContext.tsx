'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  IdTokenResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import api from '@/lib/api';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Get ID token to extract custom claims (admin role)
        const tokenResult: IdTokenResult = await firebaseUser.getIdTokenResult();
        const isAdmin = tokenResult.claims?.admin === true;

        // Set auth header for API calls
        const token = await firebaseUser.getIdToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isAdmin,
        });
      } else {
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const tokenResult = await credential.user.getIdTokenResult();
    const isAdmin = tokenResult.claims?.admin === true;
    const token = await credential.user.getIdToken();
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser({
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: credential.user.displayName,
      isAdmin,
    });

    // Redirect based on role
    if (isAdmin) {
      router.push('/admin/blog');
    } else {
      router.push('/dashboard');
    }
  };

  const logout = async () => {
    await signOut(auth);
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin ?? false,
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
