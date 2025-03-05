'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@prisma/client';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  // Fetch current user info
  const fetchUser = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch('/api/auth/me');
      
      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated
          setState({ user: null, isLoading: false, error: null });
          return;
        }
        
        throw new Error(`Error fetching user: ${response.statusText}`);
      }
      
      const data = await response.json();
      setState({ user: data.user, isLoading: false, error: null });
    } catch (error) {
      console.error('Auth error:', error);
      setState({ user: null, isLoading: false, error: 'Failed to load user data' });
    }
  }, []);
  
  // Initialize auth state
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      setState({ user: data.user, isLoading: false, error: null });
      return data.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, name?: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      setState({ user: data.user, isLoading: false, error: null });
      return data.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Logout failed');
      }
      
      setState({ user: null, isLoading: false, error: null });
      router.push('/login');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      console.error('Logout error:', error);
    }
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: !!state.user,
    error: state.error,
    login,
    register,
    logout,
    refreshUser: fetchUser,
  };
} 