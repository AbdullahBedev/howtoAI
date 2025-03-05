import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { UserRepository } from '@/lib/repositories/user-repository';

// Initialize repositories
const userRepository = new UserRepository();

// Schema for profile update
const profileUpdateSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal('')),
  location: z.string().max(100).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  settings: z.record(z.any()).optional(),
});

/**
 * GET handler to retrieve the current user's profile
 */
export async function GET() {
  try {
    // Get the authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's profile
    const profile = await userRepository.getUserProfile(user.id);
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Return the profile data, excluding sensitive information
    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        email: profile.email,
        displayName: profile.displayName,
        bio: profile.bio,
        website: profile.website,
        location: profile.location,
        avatarUrl: profile.avatarUrl,
        role: profile.role,
        createdAt: profile.createdAt,
        lastLoginAt: profile.lastLoginAt,
        settings: profile.settings,
      },
    });
  } catch (error) {
    logger.error('Failed to retrieve user profile', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler to update the current user's profile
 */
export async function PATCH(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const validationResult = profileUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    // Update the user's profile
    const updatedProfile = await userRepository.updateUserProfile(
      user.id,
      validationResult.data
    );

    // Return the updated profile
    return NextResponse.json({
      success: true,
      profile: {
        id: updatedProfile.id,
        email: updatedProfile.email,
        displayName: updatedProfile.displayName,
        bio: updatedProfile.bio,
        website: updatedProfile.website,
        location: updatedProfile.location,
        avatarUrl: updatedProfile.avatarUrl,
        role: updatedProfile.role,
        createdAt: updatedProfile.createdAt,
        lastLoginAt: updatedProfile.lastLoginAt,
        settings: updatedProfile.settings,
      },
    });
  } catch (error) {
    logger.error('Failed to update user profile', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to delete the current user's account
 */
export async function DELETE() {
  try {
    // Get the authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Users with ADMIN role cannot be deleted through this endpoint
    if (user.role === 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin accounts cannot be deleted through this endpoint' },
        { status: 403 }
      );
    }

    // Delete the user's account
    await userRepository.deleteUser(user.id);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'User account has been successfully deleted',
    });
  } catch (error) {
    logger.error('Failed to delete user account', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 