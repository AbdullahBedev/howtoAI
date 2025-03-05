import { NextResponse } from 'next/server';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { AuthService, getCurrentUser } from '@/lib/auth/auth-service';

// Initialize services
const authService = new AuthService();

/**
 * POST handler for user logout
 */
export async function POST() {
  try {
    // Get current user before logging out (for analytics)
    const user = await getCurrentUser();

    // Perform logout
    await authService.logout();

    // Success response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Track logout event if we had a user
    if (user) {
      try {
        // Track the logout event
        analytics.trackEvent({
          userId: user.id,
          event: 'user_logout',
          metadata: {
            timestamp: new Date().toISOString(),
          }
        });
      } catch (analyticsError) {
        // Log but don't fail if analytics tracking fails
        logger.error('Failed to track logout event', { error: analyticsError });
      }
    }

    return response;
  } catch (error) {
    logger.error('Logout error', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 