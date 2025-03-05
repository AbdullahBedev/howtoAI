import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { AuthService, AuthError } from '@/lib/auth/auth-service';
import { UserRepository } from '@/lib/repositories/user-repository';

// Initialize services
const authService = new AuthService();
const userRepository = new UserRepository();

// Registration schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(100),
  referralCode: z.string().optional(),
});

// Email availability check schema
const emailCheckSchema = z.object({
  email: z.string().email(),
});

/**
 * POST handler for user registration
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { email, password, name, referralCode } = validationResult.data;

    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    // Register user
    const newUser = await authService.register({
      email,
      password,
      name,
    });

    // Set auth cookies
    await authService.setTokens(newUser);

    // Track registration event and conversion
    analytics.trackConversion(newUser.id, 'signup');
    analytics.trackEvent({
      userId: newUser.id,
      event: 'user_registered',
      metadata: {
        hasReferral: !!referralCode,
        timestamp: new Date().toISOString(),
      }
    });

    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }
    });
  } catch (error) {
    logger.error('Registration error', { error });

    // Handle auth errors with proper status codes
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * GET handler to check if an email is available
 */
export async function GET(request: NextRequest) {
  try {
    // Get email from query string
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Validate email
    const validationResult = emailCheckSchema.safeParse({ email });
    if (!validationResult.success || !email) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const existingUser = await userRepository.getUserByEmail(email);
    
    return NextResponse.json({
      success: true,
      available: !existingUser,
    });
  } catch (error) {
    logger.error('Email check error', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 