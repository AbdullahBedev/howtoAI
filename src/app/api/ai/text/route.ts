import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for text generation request
const textGenerationSchema = z.object({
  prompt: z.string().min(3).max(5000),
  model: z.string().optional(),
  maxTokens: z.number().min(1).max(4000).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

/**
 * POST handler for text generation
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
    const validationResult = textGenerationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { prompt, model, maxTokens, temperature } = validationResult.data;

    // Check if user has subscription for AI services
    // This is a placeholder - in real implementation, check subscription
    const hasSubscription = user.role === 'ADMIN'; // Admins always have access
    
    if (!hasSubscription) {
      // For demo/educational purposes, allow limited usage
      // In a real implementation, this would be more restrictive
      logger.info('Non-subscribed user using AI services', { userId: user.id });
    }

    // Initialize AI service with API key
    // In a real implementation, this would use proper API key management
    const apiKey = process.env.GEMINI_API_KEY || 'demo-key';
    const aiService = new AIService(apiKey);

    // Generate text with AI
    const result = await aiService.generateText(prompt, {
      userId: user.id,
      model,
      maxTokens,
      temperature,
    });

    return NextResponse.json({
      success: true,
      text: result.text,
      modelUsed: result.modelUsed,
      tokenCount: result.tokenCount,
    });
  } catch (error) {
    logger.error('Failed to generate text with AI', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 