import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
};

type AuthStore = AuthState & AuthActions;

// Simulated API calls - in a real app, these would call actual API endpoints
const simulateApiCall = async <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would be an API call to authenticate the user
          // For demo purposes, we'll simulate a successful login for any credentials
          // except for a specific "error" case
          if (email === 'error@example.com') {
            throw new Error('Invalid credentials');
          }
          
          const user: User = await simulateApiCall({
            id: 'user-1',
            name: email.split('@')[0],
            email,
            createdAt: new Date().toISOString(),
          });
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login', 
            isLoading: false 
          });
        }
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would be an API call to register the user
          // For demo purposes, we'll simulate a successful registration
          // except for a specific "error" case
          if (email === 'exists@example.com') {
            throw new Error('Email already exists');
          }
          
          const user: User = await simulateApiCall({
            id: `user-${Date.now()}`,
            name,
            email,
            createdAt: new Date().toISOString(),
          });
          
          // In a real app, you might automatically log the user in after signup
          // or redirect them to login. Here we'll just return success.
          set({ isLoading: false });
          
          return;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create account', 
            isLoading: false 
          });
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would be an API call to send a password reset email
          // For demo purposes, we'll simulate a successful request
          // except for a specific "error" case
          if (email === 'nonexistent@example.com') {
            // For security reasons, we don't want to reveal if an email exists or not
            // So we'll still return success even for non-existent emails
            await simulateApiCall(true);
            set({ isLoading: false });
            return true;
          }
          
          await simulateApiCall(true);
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to send reset link', 
            isLoading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      // Only persist certain parts of the state
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 