'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@prisma/client';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallback = null
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Check if user's role is in the allowed roles
  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  // Render children only if user has the required role
  return <>{children}</>;
} 