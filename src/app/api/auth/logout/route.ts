import { NextResponse } from 'next/server';
import { logger } from '@/lib/logging';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';

/**
 * POST handler for user logout
 */
export async function POST() {
  try {
    // Get the current user (if authenticated)
    const user = await getCurrentUser();
    
    // Create response that clears the auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Successfully logged out',
    });
    
    // Clear auth cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0), // Set to epoch time to immediately expire
    });
    
    // Track logout event if user was logged in
    if (user) {
      try {
        // Track the logout event
        analytics.trackEvent(user.id, 'user_logout', {
          timestamp: new Date().toISOString(),
        });
      } catch (analyticsError) {
        // Log but don't fail if analytics tracking fails
        logger.warn('Failed to track logout event', { error: analyticsError });
      }
    }
    
    return response;
  } catch (error) {
    logger.error('Logout error', { error });
    
    // Even in case of error, try to clear the auth cookie
    const response = NextResponse.json(
      { error: 'An error occurred during logout, but cookies have been cleared' },
      { status: 500 }
    );
    
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    });
    
    return response;
  }
} 