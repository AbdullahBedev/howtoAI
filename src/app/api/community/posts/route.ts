import { NextRequest, NextResponse } from 'next/server';
import { CommunityRepository } from '@/lib/repositories/community-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for creating a post
const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(10000),
  category: z.string().min(1).max(50),
  tags: z.array(z.string()).max(10).optional(),
  published: z.boolean().optional(),
});

const communityRepository = new CommunityRepository();

/**
 * GET handler to retrieve posts with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tagsParam = searchParams.get('tags');
    const authorId = searchParams.get('authorId');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Parse tags if provided
    const tags = tagsParam ? tagsParam.split(',') : undefined;

    // Get current user if available (for analytics)
    const user = await getCurrentUser().catch(() => null);

    // Get posts
    const result = await communityRepository.getPosts({
      category: category || undefined,
      tags,
      authorId: authorId || undefined,
      search: search || undefined,
      limit,
      offset,
    });

    // Track analytics
    if (user) {
      analytics.trackPageView(user.id, 'community_posts', {
        category,
        tags,
        search,
      });
    }

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    logger.error('Failed to get posts', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new post
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
    const validationResult = createPostSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { title, content, category, tags, published } = validationResult.data;

    // Create the post
    const post = await communityRepository.createPost(user.id, {
      title,
      content,
      category,
      tags,
      published,
    });

    // Track analytics
    analytics.trackEngagement(user.id, 'post', post.id, 'create', {
      category,
      tags,
    });

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    logger.error('Failed to create post', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 