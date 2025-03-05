import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { UserRepository } from '@/lib/repositories/user-repository';

// Initialize repositories
const userRepository = new UserRepository();

// Registration schema
const registrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name cannot exceed 50 characters'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  referralCode: z.string().optional(),
});

/**
 * POST handler for user registration
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = registrationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { email, password, displayName, referralCode } = validationResult.data;

    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await userRepository.createUser({
      email,
      password, // Password will be hashed in the repository layer
      displayName,
      referralCode,
    });

    // Track registration event and conversion
    analytics.trackConversion('registration', 1);
    analytics.trackEvent(newUser.id, 'user_registered', {
      hasReferral: !!referralCode,
      timestamp: new Date().toISOString(),
    });

    // Send verification email (not implemented in this example)
    // await emailService.sendVerificationEmail(newUser.email, newUser.verificationToken);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
      }
    });
  } catch (error) {
    logger.error('Registration error', { error });
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
    // Get the email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Validate email
    if (!email || !z.string().email().safeParse(email).success) {
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
    logger.error('Email availability check error', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 