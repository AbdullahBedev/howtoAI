import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for image generation request
const imageGenerationSchema = z.object({
  prompt: z.string().min(3).max(1000),
  model: z.string().optional(),
  size: z.enum(['256x256', '512x512', '1024x1024']).optional(),
});

/**
 * POST handler for image generation
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
    const validationResult = imageGenerationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { prompt, model, size } = validationResult.data;

    // Check if user has subscription for AI services
    // This is a placeholder - in real implementation, check subscription
    const hasSubscription = user.role === 'ADMIN'; // Admins always have access
    
    if (!hasSubscription) {
      // For demo/educational purposes, allow limited usage but with smaller image size
      // In a real implementation, this would be more restrictive
      logger.info('Non-subscribed user using AI image generation', { userId: user.id });
    }

    // Initialize AI service with API key
    // In a real implementation, this would use proper API key management
    const apiKey = process.env.GEMINI_API_KEY || 'demo-key';
    const aiService = new AIService(apiKey);

    // Generate image with AI
    const result = await aiService.generateImage(prompt, {
      userId: user.id,
      model,
      size,
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      modelUsed: result.modelUsed,
    });
  } catch (error) {
    logger.error('Failed to generate image with AI', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 