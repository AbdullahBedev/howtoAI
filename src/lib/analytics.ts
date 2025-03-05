import { db } from './db';
import { logger } from './logging';

export interface AnalyticsEventData {
  userId?: string;
  event: string;
  page?: string;
  metadata?: Record<string, any>;
}

/**
 * Tracks an analytics event for a user
 */
export async function trackEvent(data: AnalyticsEventData) {
  try {
    // Add timestamp if not provided
    const metadata = {
      ...data.metadata,
      timestamp: new Date().toISOString(),
    };

    // Log to database if we have a user ID
    if (data.userId) {
      await db.userAnalytics.create({
        data: {
          userId: data.userId,
          event: data.event,
          page: data.page,
          metadata,
        },
      });
    }

    // Also send to client-side analytics if available
    sendToClientAnalytics(data);

    logger.debug('Tracked analytics event', {
      event: data.event,
      userId: data.userId,
      page: data.page,
      metadata: data.metadata,
    });

    return true;
  } catch (error) {
    logger.error('Failed to track analytics event', {
      error,
      event: data.event,
      userId: data.userId,
    });
    return false;
  }
}

/**
 * Track a page view
 */
export function trackPageView(userId: string | undefined, page: string, metadata?: Record<string, any>) {
  return trackEvent({
    userId,
    event: 'page_view',
    page,
    metadata,
  });
}

/**
 * Track a feature usage
 */
export function trackFeatureUsage(userId: string | undefined, feature: string, metadata?: Record<string, any>) {
  return trackEvent({
    userId,
    event: 'feature_usage',
    metadata: {
      ...metadata,
      feature,
    },
  });
}

/**
 * Track a tutorial progress
 */
export function trackTutorialProgress(
  userId: string,
  tutorialId: string,
  progress: number,
  timeSpent?: number
) {
  return trackEvent({
    userId,
    event: 'tutorial_progress',
    metadata: {
      tutorialId,
      progress,
      timeSpent,
      completed: progress >= 1.0,
    },
  });
}

/**
 * Track user engagement with an item
 */
export function trackEngagement(
  userId: string | undefined,
  itemType: string,
  itemId: string,
  action: string,
  metadata?: Record<string, any>
) {
  return trackEvent({
    userId,
    event: `${itemType}_${action}`,
    metadata: {
      ...metadata,
      itemId,
      itemType,
      action,
    },
  });
}

/**
 * Track a subscription event
 */
export function trackSubscriptionEvent(
  userId: string,
  action: 'created' | 'updated' | 'canceled' | 'renewed',
  tier: string,
  metadata?: Record<string, any>
) {
  return trackEvent({
    userId,
    event: `subscription_${action}`,
    metadata: {
      ...metadata,
      tier,
    },
  });
}

/**
 * Track a search action
 */
export function trackSearch(
  userId: string | undefined,
  query: string,
  resultCount: number,
  filters?: Record<string, any>
) {
  return trackEvent({
    userId,
    event: 'search',
    metadata: {
      query,
      resultCount,
      filters,
    },
  });
}

/**
 * Track user conversion
 */
export function trackConversion(
  userId: string,
  conversionType: 'signup' | 'subscription' | 'purchase' | 'lead',
  value?: number,
  metadata?: Record<string, any>
) {
  return trackEvent({
    userId,
    event: `conversion_${conversionType}`,
    metadata: {
      ...metadata,
      value,
      conversionType,
    },
  });
}

/**
 * Track content performance
 */
export function trackContentPerformance(
  contentId: string,
  contentType: 'tutorial' | 'post' | 'page',
  action: 'view' | 'completion' | 'share',
  userId?: string,
  metadata?: Record<string, any>
) {
  return trackEvent({
    userId,
    event: `content_${action}`,
    metadata: {
      ...metadata,
      contentId,
      contentType,
    },
  });
}

/**
 * Track user session
 */
export function trackSession(
  userId: string,
  action: 'start' | 'end',
  duration?: number,
  metadata?: Record<string, any>
) {
  return trackEvent({
    userId,
    event: `session_${action}`,
    metadata: {
      ...metadata,
      duration,
    },
  });
}

/**
 * Get top viewed content
 */
export async function getTopViewedContent(
  contentType?: 'tutorial' | 'post' | 'page',
  limit = 10,
  period: 'day' | 'week' | 'month' | 'all' = 'week'
) {
  try {
    const startDate = getPeriodStartDate(period);
    
    const eventFilter = contentType 
      ? `content_view AND metadata->>'contentType' = '${contentType}'`
      : 'content_view';
      
    // In a real implementation, this would use a more sophisticated aggregation query
    // This is a simplified example
    const results = await db.$queryRaw`
      SELECT 
        metadata->>'contentId' AS contentId,
        metadata->>'contentType' AS contentType,
        COUNT(*) AS viewCount
      FROM "UserAnalytics"
      WHERE 
        event = ${eventFilter}
        ${startDate ? ` AND "createdAt" >= ${startDate}` : ''}
      GROUP BY metadata->>'contentId', metadata->>'contentType'
      ORDER BY viewCount DESC
      LIMIT ${limit}
    `;
    
    return results;
  } catch (error) {
    logger.error('Failed to get top viewed content', { error, contentType, period });
    return [];
  }
}

/**
 * Get user engagement metrics
 */
export async function getUserEngagementMetrics(period: 'day' | 'week' | 'month' | 'all' = 'week') {
  try {
    const startDate = getPeriodStartDate(period);
    
    // In a real implementation, this would use a more sophisticated aggregation query
    // This is a simplified example
    const results = await db.$queryRaw`
      SELECT
        COUNT(DISTINCT "userId") AS activeUsers,
        COUNT(*) AS totalEvents,
        COUNT(*) / COUNT(DISTINCT "userId") AS eventsPerUser
      FROM "UserAnalytics"
      WHERE 
        ${startDate ? `"createdAt" >= ${startDate}` : 'TRUE'}
    ` as { activeUsers: number; totalEvents: number; eventsPerUser: number }[];
    
    return results[0] || {
      activeUsers: 0,
      totalEvents: 0,
      eventsPerUser: 0,
    };
  } catch (error) {
    logger.error('Failed to get user engagement metrics', { error, period });
    return {
      activeUsers: 0,
      totalEvents: 0,
      eventsPerUser: 0,
    };
  }
}

/**
 * Get conversion rates
 */
export async function getConversionRates(
  conversionType: 'signup' | 'subscription' | 'purchase' | 'lead' = 'subscription',
  period: 'day' | 'week' | 'month' | 'all' = 'month'
) {
  try {
    const startDate = getPeriodStartDate(period);
    
    // Count total conversions
    const conversions = await db.userAnalytics.count({
      where: {
        event: `conversion_${conversionType}`,
        ...(startDate ? { createdAt: { gte: startDate } } : {}),
      },
    });
    
    // Count unique visitors (page views)
    const visitors = await db.$queryRaw`
      SELECT COUNT(DISTINCT "userId") as count
      FROM "UserAnalytics"
      WHERE 
        event = 'page_view'
        ${startDate ? ` AND "createdAt" >= ${startDate}` : ''}
    ` as { count: string }[];
    
    const visitorCount = Number(visitors[0]?.count || '0') || 1; // Avoid division by zero
    
    return {
      conversionType,
      conversions,
      visitors: visitorCount,
      rate: (conversions / visitorCount) * 100,
    };
  } catch (error) {
    logger.error('Failed to get conversion rates', { error, conversionType, period });
    return {
      conversionType,
      conversions: 0,
      visitors: 0,
      rate: 0,
    };
  }
}

/**
 * Helper function to get start date for a period
 */
function getPeriodStartDate(period: 'day' | 'week' | 'month' | 'all'): Date | null {
  if (period === 'all') return null;
  
  const now = new Date();
  
  if (period === 'day') {
    now.setDate(now.getDate() - 1);
  } else if (period === 'week') {
    now.setDate(now.getDate() - 7);
  } else if (period === 'month') {
    now.setMonth(now.getMonth() - 1);
  }
  
  return now;
}

/**
 * Send to client-side analytics service
 */
function sendToClientAnalytics(data: AnalyticsEventData) {
  // This would send events to a client-side analytics service like Google Analytics
  // For now, we'll just simulate it
  if (typeof window !== 'undefined') {
    console.log('[Client Analytics]', data);
    
    // Example Google Analytics implementation would be:
    // if (window.gtag) {
    //   window.gtag('event', data.event, {
    //     event_category: data.metadata?.category || 'general',
    //     event_label: data.metadata?.label,
    //     value: data.metadata?.value,
    //     ...data.metadata
    //   });
    // }
  }
}

// Export a convenient analytics object
export const analytics = {
  trackEvent,
  trackPageView,
  trackFeatureUsage,
  trackTutorialProgress,
  trackEngagement,
  trackSubscriptionEvent,
  trackSearch,
  trackConversion,
  trackContentPerformance,
  trackSession,
  getTopViewedContent,
  getUserEngagementMetrics,
  getConversionRates,
}; 