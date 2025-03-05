import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { logger } from '@/lib/logging';
import { z } from 'zod';

// Validation schema for code generation request
const codeGenerationSchema = z.object({
  prompt: z.string().min(3).max(2000),
  model: z.string().optional(),
  language: z.string().optional(),
  maxTokens: z.number().min(1).max(4000).optional(),
});

/**
 * POST handler for code generation
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
    const validationResult = codeGenerationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { prompt, model, language, maxTokens } = validationResult.data;

    // Check if user has subscription for AI services
    // This is a placeholder - in real implementation, check subscription
    const hasSubscription = user.role === 'ADMIN'; // Admins always have access
    
    if (!hasSubscription) {
      // For demo/educational purposes, allow limited usage
      // In a real implementation, this would be more restrictive
      logger.info('Non-subscribed user using code generation', { userId: user.id });
    }

    // Initialize AI service with API key
    // In a real implementation, this would use proper API key management
    const apiKey = process.env.GEMINI_API_KEY || 'demo-key';
    const aiService = new AIService(apiKey);

    // Generate code with AI
    const result = await aiService.generateCode(prompt, {
      userId: user.id,
      model,
      language,
      // Free users get fewer tokens
      maxTokens: hasSubscription ? maxTokens : Math.min(maxTokens || 2000, 500),
    });

    return NextResponse.json({
      success: true,
      code: result.code,
      language: result.language,
      modelUsed: result.modelUsed,
      tokenCount: result.tokenCount,
    });
  } catch (error) {
    logger.error('Failed to generate code with AI', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 