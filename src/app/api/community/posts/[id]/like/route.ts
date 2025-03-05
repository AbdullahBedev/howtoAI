import { NextRequest, NextResponse } from 'next/server';
import { CommunityRepository } from '@/lib/repositories/community-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';

const communityRepository = new CommunityRepository();

/**
 * GET handler to check if the current user has liked the post
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

    const postId = params.id;

    // Check if post exists
    const post = await communityRepository.getPostById(postId, false);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if the user has liked the post
    const hasLiked = await communityRepository.hasLikedPost(user.id, postId);

    return NextResponse.json({
      success: true,
      liked: hasLiked,
    });
  } catch (error) {
    logger.error('Failed to check post like status', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to toggle like on a post
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

    const postId = params.id;

    // Check if post exists
    const post = await communityRepository.getPostById(postId, false);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Toggle like
    const result = await communityRepository.togglePostLike(user.id, postId);

    // Track analytics
    analytics.trackEngagement(user.id, 'post', postId, result.liked ? 'like' : 'unlike');

    return NextResponse.json({
      success: true,
      liked: result.liked,
    });
  } catch (error) {
    logger.error('Failed to toggle post like', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 