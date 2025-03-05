import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/lib/analytics';
import { logger } from '@/lib/logging';
import { getCurrentUser } from '@/lib/auth/auth-service';

/**
 * GET handler for retrieving analytics dashboard data
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const period = (searchParams.get('period') as any) || 'week';

    // Validate period
    if (!['day', 'week', 'month', 'all'].includes(period)) {
      return NextResponse.json(
        { error: 'Invalid period. Must be one of: day, week, month, all' },
        { status: 400 }
      );
    }

    // Get analytics data in parallel
    const [
      engagementMetrics,
      topContent,
      subscriptionConversion,
      signupConversion,
    ] = await Promise.all([
      analytics.getUserEngagementMetrics(period),
      analytics.getTopViewedContent(undefined, 10, period),
      analytics.getConversionRates('subscription', period),
      analytics.getConversionRates('signup', period),
    ]);

    // Return the dashboard data
    return NextResponse.json({
      success: true,
      period,
      engagementMetrics,
      topContent,
      conversions: {
        subscription: subscriptionConversion,
        signup: signupConversion,
      },
    });
  } catch (error) {
    logger.error('Failed to get analytics dashboard data', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for retrieving custom analytics data
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { period = 'week', metrics = ['engagement', 'content', 'conversion'] } = body;

    // Validate period
    if (!['day', 'week', 'month', 'all'].includes(period)) {
      return NextResponse.json(
        { error: 'Invalid period. Must be one of: day, week, month, all' },
        { status: 400 }
      );
    }

    // Prepare result object
    const result: Record<string, any> = {
      period,
    };

    // Fetch requested metrics
    const promises = [];

    if (metrics.includes('engagement')) {
      promises.push(
        analytics.getUserEngagementMetrics(period)
          .then(data => { result.engagementMetrics = data; })
      );
    }

    if (metrics.includes('content')) {
      promises.push(
        analytics.getTopViewedContent(undefined, 10, period)
          .then(data => { result.topContent = data; })
      );
    }

    if (metrics.includes('conversion')) {
      promises.push(
        Promise.all([
          analytics.getConversionRates('subscription', period),
          analytics.getConversionRates('signup', period),
        ]).then(([subscription, signup]) => {
          result.conversions = { subscription, signup };
        })
      );
    }

    // Wait for all promises to resolve
    await Promise.all(promises);

    // Return the custom analytics data
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    logger.error('Failed to get custom analytics data', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 