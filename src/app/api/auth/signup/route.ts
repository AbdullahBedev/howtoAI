import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signJWT, setTokenCookie, setRefreshTokenCookie } from '@/lib/auth/jwt';
import { UserRole } from '@prisma/client';

const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: 'User already exists with this email' }),
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: UserRole.USER,
        profile: {
          create: {
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
            socialLinks: {},
            preferences: { theme: 'light', emailNotifications: true },
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // Generate tokens
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name || '',
      role: user.role,
    };

    const accessToken = await signJWT(payload);
    const refreshToken = await signJWT(payload, { expiresIn: '7d' });

    // Set cookies
    setTokenCookie(accessToken);
    setRefreshTokenCookie(refreshToken);

    // Log signup attempt
    await db.loginHistory.create({
      data: {
        userId: user.id,
        ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: true,
      },
    });

    // Return user data (excluding sensitive information)
    return new NextResponse(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        message: 'Account created successfully',
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({
          message: 'Invalid input data',
          errors: error.errors,
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
} 