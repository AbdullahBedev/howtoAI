import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { AuthService, AuthError } from '@/lib/auth/auth-service';

// Initialize services
const authService = new AuthService();

// Login request schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * POST handler for user login
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation error', details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Log attempt (only email, never log passwords)
    logger.info('Login attempt', { email });

    // Attempt login
    const user = await authService.login({ email, password });

    // Set auth cookies
    await authService.setTokens(user);

    // Prepare response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Track successful login
    analytics.trackEvent({
      userId: user.id,
      event: 'user_login',
      metadata: {
        timestamp: new Date().toISOString(),
      }
    });

    return response;
  } catch (error) {
    // Log error, but never expose details to the client
    logger.error('Login error', { error });

    // Handle auth errors with proper status codes
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message || 'Authentication failed' },
        { status: error.statusCode }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
} 