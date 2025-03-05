import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { AuthService } from '@/lib/auth/auth-service';

// Initialize services
const authService = new AuthService();

// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

/**
 * POST handler for user login
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = validationResult.data;

    // Attempt login
    const result = await authService.login(email, password, rememberMe);

    if (!result.success) {
      // Log failed login attempt
      logger.info('Failed login attempt', { email });
      return NextResponse.json(
        { error: result.error || 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Set auth cookie
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        displayName: result.user.displayName,
        role: result.user.role,
      }
    });
    
    // If token is provided, set the auth cookie
    if (result.token) {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        // If rememberMe is true, set a long expiry (30 days), otherwise session cookie
        ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      };
      
      response.cookies.set('auth-token', result.token, cookieOptions);
    }

    // Track successful login
    analytics.trackEvent(result.user.id, 'user_login', {
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    logger.error('Login error', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 