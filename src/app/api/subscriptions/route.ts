import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { getCurrentUser } from '@/lib/auth/auth-service';

// Temporary SubscriptionRepository implementation until the real one is created
class SubscriptionRepository {
  async getSubscriptionPlans() {
    return [
      { id: 'basic', name: 'Basic Plan', price: 9.99, features: ['Feature 1', 'Feature 2'] },
      { id: 'pro', name: 'Pro Plan', price: 19.99, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
      { id: 'enterprise', name: 'Enterprise Plan', price: 49.99, features: ['All Features', 'Priority Support'] },
    ];
  }

  async getSubscriptionPlanById(planId: string) {
    const plans = await this.getSubscriptionPlans();
    return plans.find(plan => plan.id === planId);
  }

  async getUserSubscription(userId: string) {
    // Mock implementation
    return null;
  }

  async createSubscription(options: { userId: string; planId: string; paymentMethodId: string; couponCode?: string }) {
    // Mock implementation
    return {
      id: 'sub_123',
      userId: options.userId,
      planId: options.planId,
      status: 'active',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
  }

  async cancelSubscription(userId: string) {
    // Mock implementation
    return {
      id: 'sub_123',
      userId,
      planId: 'pro',
      status: 'canceled',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    };
  }

  async reactivateSubscription(userId: string) {
    // Mock implementation
    return {
      id: 'sub_123',
      userId,
      planId: 'pro',
      status: 'active',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
  }

  async upgradeSubscription(userId: string, newPlanId: string) {
    // Mock implementation
    return {
      id: 'sub_123',
      userId,
      planId: newPlanId,
      status: 'active',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
  }
}

// Initialize repositories
const subscriptionRepository = new SubscriptionRepository();

// Schema for subscription creation/update
const subscriptionSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  paymentMethodId: z.string().min(1, 'Payment method ID is required'),
  couponCode: z.string().optional(),
});

// Get all available subscription plans
export async function GET() {
  try {
    // Anyone can view subscription plans
    const plans = await subscriptionRepository.getSubscriptionPlans();
    
    return NextResponse.json({
      success: true,
      plans,
    });
  } catch (error) {
    logger.error('Failed to get subscription plans', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Create a new subscription
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = subscriptionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { planId, paymentMethodId, couponCode } = validationResult.data;

    // Verify the plan exists
    const plan = await subscriptionRepository.getSubscriptionPlanById(planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Subscription plan not found' },
        { status: 404 }
      );
    }

    // Check if user already has an active subscription
    const existingSubscription = await subscriptionRepository.getUserSubscription(user.id);
    if (existingSubscription && existingSubscription.status === 'active') {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      );
    }

    // Create the subscription
    const subscription = await subscriptionRepository.createSubscription({
      userId: user.id,
      planId,
      paymentMethodId,
      couponCode,
    });

    // Track conversion
    analytics.trackConversion(user.id, 'subscription', 1);

    // Also track detailed event
    analytics.trackEvent(user.id, 'subscription_created', {
      planId,
      planName: plan.name,
      planPrice: plan.price,
      discountApplied: !!couponCode,
    });

    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error) {
    logger.error('Failed to create subscription', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Update an existing subscription
export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const { action } = body;

    // Check if user has an active subscription
    const subscription = await subscriptionRepository.getUserSubscription(user.id);
    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    let result;
    switch (action) {
      case 'cancel':
        result = await subscriptionRepository.cancelSubscription(user.id);
        // Track event
        analytics.trackEvent(user.id, 'subscription_cancelled', {
          planId: subscription.planId,
          subscriptionId: subscription.id,
          daysActive: Math.floor((Date.now() - subscription.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
        });
        break;
      case 'reactivate':
        result = await subscriptionRepository.reactivateSubscription(user.id);
        analytics.trackEvent(user.id, 'subscription_reactivated', {
          planId: subscription.planId,
          subscriptionId: subscription.id,
        });
        break;
      case 'upgrade':
        // Validate new plan
        if (!body.planId) {
          return NextResponse.json(
            { error: 'Plan ID is required for upgrade' },
            { status: 400 }
          );
        }
        result = await subscriptionRepository.upgradeSubscription(user.id, body.planId);
        analytics.trackEvent(user.id, 'subscription_upgraded', {
          oldPlanId: subscription.planId,
          newPlanId: body.planId,
          subscriptionId: subscription.id,
        });
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Must be one of: cancel, reactivate, upgrade' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      subscription: result,
    });
  } catch (error) {
    logger.error('Failed to update subscription', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 