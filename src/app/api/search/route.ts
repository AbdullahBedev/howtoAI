import { NextRequest, NextResponse } from 'next/server';
import { SearchRepository } from '@/lib/repositories/search-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for search query
const searchSchema = z.object({
  query: z.string().min(1).max(100),
  includeUsers: z.boolean().optional(),
  includeTutorials: z.boolean().optional(),
  includePosts: z.boolean().optional(),
  limit: z.number().min(1).max(100).optional(),
});

const searchRepository = new SearchRepository();

/**
 * GET handler for global search
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const includeUsers = searchParams.get('includeUsers') === 'true';
    const includeTutorials = searchParams.get('includeTutorials') === 'true' || searchParams.get('includeTutorials') === null;
    const includePosts = searchParams.get('includePosts') === 'true' || searchParams.get('includePosts') === null;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;

    // Validate query
    if (!query || query.length < 1 || query.length > 100) {
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      );
    }

    // Get current user if available (for analytics)
    const user = await getCurrentUser().catch(() => null);

    // Perform search
    const results = await searchRepository.globalSearch(query, {
      includeUsers,
      includeTutorials,
      includePosts,
      limit,
    });

    // Track search for analytics
    if (user) {
      analytics.trackSearch(user.id, query, results.length, {
        includeUsers,
        includeTutorials,
        includePosts,
      });
    }

    return NextResponse.json({
      success: true,
      query,
      results,
    });
  } catch (error) {
    logger.error('Search error', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for advanced search
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = searchSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { query, includeUsers = true, includeTutorials = true, includePosts = true, limit = 20 } = validationResult.data;

    // Get current user if available (for analytics)
    const user = await getCurrentUser().catch(() => null);

    // Perform search
    const results = await searchRepository.globalSearch(query, {
      includeUsers,
      includeTutorials,
      includePosts,
      limit,
    });

    // Track search for analytics
    if (user) {
      analytics.trackSearch(user.id, query, results.length, {
        includeUsers,
        includeTutorials,
        includePosts,
      });
    }

    return NextResponse.json({
      success: true,
      query,
      results,
    });
  } catch (error) {
    logger.error('Search error', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 