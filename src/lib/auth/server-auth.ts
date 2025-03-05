import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './auth-service';
import { UserRole } from '@prisma/client';

// Get the current URL for redirecting back after login
export async function getRedirectUrl(): Promise<string> {
  const headersList = await headers();
  const fullUrl = headersList.get('x-url') || '/';
  return encodeURIComponent(fullUrl);
}

// Protect a server component/page
export async function requireAuth(redirectTo?: string) {
  const user = await getCurrentUser();
  
  if (!user) {
    const redirectUrl = redirectTo || `/login?redirect=${await getRedirectUrl()}`;
    redirect(redirectUrl);
  }
  
  return user;
}

// Check for specific roles on server components/pages
export async function requireRole(roles: UserRole[], redirectTo = '/unauthorized') {
  const user = await requireAuth();
  
  if (!roles.includes(user.role)) {
    redirect(redirectTo);
  }
  
  return user;
}

// Create a function to get user in server components without redirection
export async function getServerUser() {
  return await getCurrentUser();
}

// Check if user has a specific role on server
export async function hasRole(roles: UserRole[]): Promise<boolean> {
  const user = await getServerUser();
  if (!user) return false;
  return roles.includes(user.role);
} 