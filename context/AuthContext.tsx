import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { getProfileByUserId } from '../services/supabaseService';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if(session?.user) {
            setUser(session.user);
            await checkAdminRole(session.user.id);
        }
        setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
        const userProfile = await getProfileByUserId(userId);
        setIsAdmin(userProfile?.role === 'admin');
    } catch (error) {
        console.error("Failed to check admin role:", (error as Error).message);
        setIsAdmin(false);
    }
  };

  const login = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    if (data.user) {
        const userProfile = await getProfileByUserId(data.user.id);
        if (userProfile?.role !== 'admin') {
            await logout();
            throw new Error("User is not an admin.");
        }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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