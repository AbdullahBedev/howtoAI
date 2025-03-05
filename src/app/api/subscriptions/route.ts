import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logging';
import { analytics } from '@/lib/analytics';
import { getCurrentUser } from '@/lib/auth/auth-service';

/**
 * Basic subscription plan data
 */
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

/**
 * Subscription repository implementation
 */
class SubscriptionRepository {
  // Mock subscription plans
  private plans: SubscriptionPlan[] = [
    {
      id: 'basic-monthly',
      name: 'Basic Plan',
      description: 'Access to all basic tutorials and features',
      price: 9.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'Access to all basic tutorials',
        'Community forum access',
        'Monthly newsletter'
      ]
    },
    {
      id: 'pro-monthly',
      name: 'Pro Plan',
      description: 'Advanced features with AI generation and premium content',
      price: 19.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'All Basic Plan features',
        'Premium tutorials and resources',
        'AI code generation (500 requests/month)',
        'Advanced prompt techniques'
      ]
    },
    {
      id: 'enterprise-monthly',
      name: 'Enterprise Plan',
      description: 'For teams with advanced needs and priority support',
      price: 49.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'All Pro Plan features',
        'Team collaboration features',
        'Custom AI model fine-tuning',
        'Priority support',
        'Unlimited API requests'
      ]
    }
  ];

  // Mock user subscriptions
  private subscriptions = new Map<string, {
    id: string;
    userId: string;
    planId: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
  }>();

  async getSubscriptionPlans() {
    return this.plans;
  }

  async getSubscriptionPlanById(planId: string) {
    return this.plans.find(plan => plan.id === planId);
  }

  async getUserSubscription(userId: string) {
    return this.subscriptions.get(userId);
  }

  async createSubscription(options: { userId: string; planId: string; paymentMethodId: string; couponCode?: string }) {
    const { userId, planId } = options;
    
    // Check if plan exists
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) {
      throw new Error(`Subscription plan ${planId} not found`);
    }
    
    // Create subscription
    const subscription = {
      id: `sub_${Math.random().toString(36).substring(2, 15)}`,
      userId,
      planId,
      status: 'active' as const,
      startDate: new Date(),
      createdAt: new Date(),
    };
    
    this.subscriptions.set(userId, subscription);
    return subscription;
  }

  async cancelSubscription(userId: string) {
    const subscription = this.subscriptions.get(userId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    // Update subscription
    subscription.status = 'cancelled';
    subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // End in 30 days
    
    this.subscriptions.set(userId, subscription);
    return subscription;
  }

  async reactivateSubscription(userId: string) {
    const subscription = this.subscriptions.get(userId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    if (subscription.status !== 'cancelled') {
      throw new Error('Subscription is not cancelled');
    }
    
    // Update subscription
    subscription.status = 'active';
    subscription.endDate = undefined;
    
    this.subscriptions.set(userId, subscription);
    return subscription;
  }

  async upgradeSubscription(userId: string, newPlanId: string) {
    const subscription = this.subscriptions.get(userId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    // Check if new plan exists
    const newPlan = this.plans.find(p => p.id === newPlanId);
    if (!newPlan) {
      throw new Error(`Subscription plan ${newPlanId} not found`);
    }
    
    // Update subscription
    subscription.planId = newPlanId;
    
    this.subscriptions.set(userId, subscription);
    return subscription;
  }
}

const subscriptionRepository = new SubscriptionRepository();

/**
 * GET handler to retrieve available subscription plans
 */
export async function GET() {
  try {
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

// Validation schema for subscription creation
const createSubscriptionSchema = z.object({
  planId: z.string(),
  paymentMethodId: z.string(),
  couponCode: z.string().optional(),
});

// Validation schema for subscription actions
const subscriptionActionSchema = z.object({
  action: z.enum(['cancel', 'reactivate', 'upgrade']),
  planId: z.string().optional(),
});

/**
 * POST handler to create a new subscription
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
    const validationResult = createSubscriptionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { planId, paymentMethodId, couponCode } = validationResult.data;

    // Check if the plan exists
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

    // Create subscription
    const subscription = await subscriptionRepository.createSubscription({
      userId: user.id,
      planId,
      paymentMethodId,
      couponCode,
    });

    // Track subscription event
    analytics.trackEvent({
      userId: user.id,
      event: 'subscription_created',
      metadata: {
        planId,
        planName: plan.name,
        planPrice: plan.price,
        discountApplied: !!couponCode,
      }
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

/**
 * PUT handler to update a subscription (cancel, reactivate, or upgrade)
 */
export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = subscriptionActionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { action, planId } = validationResult.data;

    // Check if the user has an active subscription
    const subscription = await subscriptionRepository.getUserSubscription(user.id);
    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Execute requested action
    let result;
    switch (action) {
      case 'cancel':
        result = await subscriptionRepository.cancelSubscription(user.id);
        // Track event
        analytics.trackEvent({
          userId: user.id,
          event: 'subscription_cancelled',
          metadata: {
            planId: subscription.planId,
            subscriptionId: subscription.id,
            daysActive: Math.floor((Date.now() - subscription.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
          }
        });
        break;
      case 'reactivate':
        result = await subscriptionRepository.reactivateSubscription(user.id);
        analytics.trackEvent({
          userId: user.id,
          event: 'subscription_reactivated',
          metadata: {
            planId: subscription.planId,
            subscriptionId: subscription.id,
          }
        });
        break;
      case 'upgrade':
        // Validate new plan
        if (!planId) {
          return NextResponse.json(
            { error: 'Plan ID is required for upgrade action' },
            { status: 400 }
          );
        }
        result = await subscriptionRepository.upgradeSubscription(user.id, body.planId);
        analytics.trackEvent({
          userId: user.id,
          event: 'subscription_upgraded',
          metadata: {
            oldPlanId: subscription.planId,
            newPlanId: body.planId,
            subscriptionId: subscription.id,
          }
        });
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
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