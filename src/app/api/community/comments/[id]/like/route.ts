import { NextRequest, NextResponse } from 'next/server';
import { CommunityRepository } from '@/lib/repositories/community-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';

const communityRepository = new CommunityRepository();

/**
 * GET handler to check if the current user has liked the comment
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commentId = params.id;

    // Check if the user has liked the comment
    const hasLiked = await communityRepository.hasLikedComment(user.id, commentId);

    return NextResponse.json({
      success: true,
      liked: hasLiked,
    });
  } catch (error) {
    logger.error('Failed to check comment like status', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to toggle like on a comment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commentId = params.id;

    // Toggle like
    const result = await communityRepository.toggleCommentLike(user.id, commentId);

    // Track analytics
    analytics.trackEngagement(user.id, 'comment', commentId, result.liked ? 'like' : 'unlike');

    return NextResponse.json({
      success: true,
      liked: result.liked,
    });
  } catch (error) {
    logger.error('Failed to toggle comment like', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 