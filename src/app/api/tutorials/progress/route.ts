import { NextRequest, NextResponse } from 'next/server';
import { TutorialRepository } from '@/lib/repositories/tutorial-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for progress update
const progressSchema = z.object({
  tutorialId: z.string(),
  progress: z.number().min(0).max(1),
  lastSection: z.string().optional(),
  timeSpent: z.number().optional(),
});

const tutorialRepository = new TutorialRepository();

/**
 * GET handler to retrieve progress for the current user
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const tutorialId = searchParams.get('tutorialId');

    // Get progress
    const progress = await tutorialRepository.getUserProgress(user.id, tutorialId || undefined);

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    logger.error('Failed to get tutorial progress', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to update progress for a tutorial
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = progressSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { tutorialId, progress, lastSection, timeSpent } = validationResult.data;

    // Check if the tutorial exists
    const tutorial = await tutorialRepository.findById(tutorialId);
    if (!tutorial) {
      return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
    }

    // If tutorial is premium, check if user has subscription
    if (tutorial.premium) {
      // Check subscription in a real implementation
      // This is a placeholder
      const hasSubscription = user.role === 'ADMIN'; // Admins always have access
      
      if (!hasSubscription) {
        return NextResponse.json(
          { error: 'Premium content requires subscription' },
          { status: 403 }
        );
      }
    }

    // Determine if the tutorial is completed
    const isCompleted = progress >= 1.0;
    const completedAt = isCompleted ? new Date() : null;

    // Update progress
    const updatedProgress = await tutorialRepository.trackProgress(user.id, tutorialId, {
      progress,
      lastSection,
      completedAt,
    });

    // Track analytics
    analytics.trackTutorialProgress(user.id, tutorialId, progress, timeSpent);

    // Log the progress update
    logger.info('Tutorial progress updated', {
      userId: user.id,
      tutorialId,
      progress,
      completed: isCompleted,
    });

    return NextResponse.json({
      success: true,
      progress: updatedProgress,
    });
  } catch (error) {
    logger.error('Failed to update tutorial progress', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 