import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logging';
import { getCurrentUser } from '@/lib/auth/auth-service';

// Feature flags configuration
interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  roles?: string[];
  requiredSubscription?: string[];
  percentage?: number;
}

// List of all feature flags
const FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'advanced_ai',
    name: 'Advanced AI Features',
    description: 'Access to advanced AI capabilities like image generation and custom models',
    enabled: true,
    roles: ['ADMIN'],
    requiredSubscription: ['pro', 'enterprise'],
  },
  {
    id: 'community_features',
    name: 'Community Features',
    description: 'Access to community forums and discussions',
    enabled: true,
  },
  {
    id: 'beta_editor',
    name: 'Beta Code Editor',
    description: 'Early access to the new code editor',
    enabled: true,
    percentage: 20, // Only 20% of users get this feature
  },
  {
    id: 'dark_mode',
    name: 'Dark Mode',
    description: 'Enable dark mode theme',
    enabled: true,
  },
  {
    id: 'api_access',
    name: 'API Access',
    description: 'Access to the How-to-AI API',
    enabled: true,
    requiredSubscription: ['enterprise'],
  },
];

/**
 * Determines if a feature flag is enabled for a specific user
 */
function isFeatureEnabledForUser(feature: FeatureFlag, user: any, userSubscription: string | null = null): boolean {
  // If the feature is disabled globally, return false
  if (!feature.enabled) return false;

  // If the feature has role restrictions
  if (feature.roles && feature.roles.length > 0) {
    // If user is not logged in or doesn't have the required role, return false
    if (!user || !feature.roles.includes(user.role)) {
      return false;
    }
  }

  // If the feature has subscription restrictions
  if (feature.requiredSubscription && feature.requiredSubscription.length > 0) {
    // If user doesn't have a subscription or the subscription is not in the required list
    if (!userSubscription || !feature.requiredSubscription.includes(userSubscription)) {
      return false;
    }
  }

  // If the feature has a percentage rollout
  if (feature.percentage !== undefined && feature.percentage < 100) {
    // If user is not logged in, use a random number
    if (!user) {
      return Math.random() * 100 < feature.percentage;
    }
    
    // For logged in users, use a deterministic approach based on user ID
    const hash = hashString(user.id);
    return hash % 100 < feature.percentage;
  }

  // If no restrictions apply, the feature is enabled
  return true;
}

/**
 * Simple string hash function for deterministic percentage rollouts
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * GET handler to retrieve available feature flags
 */
export async function GET(request: NextRequest) {
  try {
    // Get the current user if authenticated
    const user = await getCurrentUser();
    
    // Get user subscription (mocked - would come from a subscription service)
    const userSubscription = user ? 'basic' : null; // Default to basic subscription for logged in users
    
    // Process feature flags
    const featureFlags = FEATURE_FLAGS.reduce((acc, flag) => {
      acc[flag.id] = isFeatureEnabledForUser(flag, user, userSubscription);
      return acc;
    }, {} as Record<string, boolean>);
    
    return NextResponse.json({
      success: true,
      features: featureFlags,
    });
  } catch (error) {
    logger.error('Failed to retrieve feature flags', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 