import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

// Schema for getting a user's subscription
export async function GET(request: NextRequest) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Get subscription data
    const subscription = await db.subscription.findUnique({
      where: { userId },
      include: { 
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        }
      },
    });

    if (!subscription) {
      return new NextResponse(
        JSON.stringify({ 
          message: 'No subscription found',
          subscription: {
            tier: 'FREE',
            status: 'ACTIVE',
          }
        }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({ subscription }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Get subscription error:', error);
    
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}

// Schema for updating subscription
const updateSubscriptionSchema = z.object({
  tier: z.enum(['FREE', 'PREMIUM', 'ENTERPRISE']).optional(),
  paymentMethod: z.object({
    type: z.enum(['CREDIT_CARD', 'PAYPAL']),
    token: z.string(),
  }).optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
});

// Update user subscription
export async function PUT(request: NextRequest) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { tier, paymentMethod, cancelAtPeriodEnd } = updateSubscriptionSchema.parse(body);

    // Get existing subscription
    let subscription = await db.subscription.findUnique({
      where: { userId },
    });

    // Handle payment processing (simplified for now)
    let paymentSuccess = true;
    let paymentError = null;
    let providerId = null;
    
    if (paymentMethod) {
      // This would typically integrate with Stripe or another payment provider
      // For now, we'll simulate a successful payment
      providerId = `sub_${Math.random().toString(36).substring(2, 15)}`;
      
      // Log payment attempt
      console.log(`Processing payment for user ${userId} with method ${paymentMethod.type}`);
    }

    if (!paymentSuccess) {
      return new NextResponse(
        JSON.stringify({ 
          message: 'Payment processing failed',
          error: paymentError
        }),
        { status: 400 }
      );
    }

    // Update or create subscription
    const tierPricing = {
      'FREE': 0,
      'PREMIUM': 50,
      'ENTERPRISE': 250
    };

    const data: any = {};
    
    if (tier) {
      data.tier = tier;
      data.price = tierPricing[tier];
      data.currency = 'USD';
      
      // Set end date for premium subscriptions
      if (tier !== 'FREE') {
        data.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      } else {
        data.endDate = null;
      }
    }

    if (providerId) {
      data.providerId = providerId;
      data.paymentProvider = paymentMethod?.type === 'PAYPAL' ? 'PAYPAL' : 'STRIPE';
    }

    if (cancelAtPeriodEnd !== undefined) {
      data.cancelAtPeriodEnd = cancelAtPeriodEnd;
    }

    if (subscription) {
      // Update existing subscription
      subscription = await db.subscription.update({
        where: { userId },
        data,
      });

      // Create invoice for paid upgrades
      if (tier && tier !== 'FREE' && data.price > 0) {
        await db.invoice.create({
          data: {
            subscriptionId: subscription.id,
            amount: data.price,
            currency: data.currency,
            status: 'paid',
            paidAt: new Date(),
            paymentMethod: paymentMethod?.type === 'PAYPAL' ? 'paypal' : 'card',
            paymentIntentId: `pi_${Math.random().toString(36).substring(2, 15)}`,
          }
        });
      }
    } else {
      // Create new subscription
      subscription = await db.subscription.create({
        data: {
          userId,
          tier: tier || 'FREE',
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: tier && tier !== 'FREE' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null,
          price: tier ? tierPricing[tier] : 0,
          currency: 'USD',
          paymentProvider: paymentMethod?.type === 'PAYPAL' ? 'PAYPAL' : 'STRIPE',
          providerId,
          cancelAtPeriodEnd: cancelAtPeriodEnd || false,
        },
      });

      // Create invoice for paid subscriptions
      if (tier && tier !== 'FREE') {
        await db.invoice.create({
          data: {
            subscriptionId: subscription.id,
            amount: tierPricing[tier],
            currency: 'USD',
            status: 'paid',
            paidAt: new Date(),
            paymentMethod: paymentMethod?.type === 'PAYPAL' ? 'paypal' : 'card',
            paymentIntentId: `pi_${Math.random().toString(36).substring(2, 15)}`,
          }
        });
      }
    }

    // Track subscription event
    await db.userAnalytics.create({
      data: {
        userId,
        event: subscription ? 'subscription_updated' : 'subscription_created',
        metadata: {
          tier: subscription.tier,
          status: subscription.status,
          price: subscription.price,
        },
      },
    });

    return new NextResponse(
      JSON.stringify({ 
        message: 'Subscription updated successfully',
        subscription 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Update subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({
          message: 'Invalid input data',
          errors: error.errors,
        }),
        { status: 400 }
      );
    }
    
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
} 