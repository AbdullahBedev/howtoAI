"use client";

import { useCallback } from 'react';
import { useAuthStore } from '@/store/use-auth-store';

export const useAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error,
    login, 
    signup, 
    resetPassword,
    logout,
    clearError
  } = useAuthStore();

  const handleLogin = useCallback(async (email: string, password: string) => {
    await login(email, password);
    return useAuthStore.getState().isAuthenticated;
  }, [login]);

  const handleSignup = useCallback(async (name: string, email: string, password: string) => {
    await signup(name, email, password);
    return !useAuthStore.getState().error;
  }, [signup]);

  const handleResetPassword = useCallback(async (email: string) => {
    return await resetPassword(email);
  }, [resetPassword]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleClearError = useCallback(() => {
    clearError();
  }, [clearError]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    signup: handleSignup,
    resetPassword: handleResetPassword,
    logout: handleLogout,
    clearError: handleClearError,
  };
}; 