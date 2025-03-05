import { NextRequest, NextResponse } from 'next/server';
import { CommunityRepository } from '@/lib/repositories/community-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for creating a comment
const createCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

const communityRepository = new CommunityRepository();

/**
 * GET handler to retrieve comments for a post
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const parentId = searchParams.get('parentId');

    // Get current user if available (for analytics)
    const user = await getCurrentUser().catch(() => null);

    // Check if post exists
    const post = await communityRepository.getPostById(postId, false);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get comments
    const comments = await communityRepository.getComments(
      postId,
      parentId || null
    );

    // Track analytics if user is authenticated
    if (user) {
      analytics.trackEngagement(user.id, 'post', postId, 'view_comments');
    }

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    logger.error('Failed to get comments', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new comment
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

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createCommentSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { content, parentId } = validationResult.data;

    // If there's a parentId, check if it exists and belongs to this post
    if (parentId) {
      const parent = await communityRepository.getComments(postId, null);
      const parentComment = parent.find(c => c.id === parentId);
      
      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found or does not belong to this post' },
          { status: 404 }
        );
      }
    }

    // Create the comment
    const comment = await communityRepository.createComment(user.id, {
      postId,
      content,
      parentId,
    });

    // Track analytics
    analytics.trackEngagement(user.id, 'post', postId, 'comment', {
      commentId: comment.id,
      isReply: !!parentId,
    });

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    logger.error('Failed to create comment', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 