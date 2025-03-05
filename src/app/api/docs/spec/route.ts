import { NextRequest, NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/api-docs';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { logger } from '@/lib/logging';

/**
 * GET handler to retrieve the OpenAPI specification
 */
export async function GET(request: NextRequest) {
  try {
    // In production, you might want to check if the user has access to the API docs
    // For now, we'll allow anyone to access them in development
    if (process.env.NODE_ENV === 'production') {
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Return the OpenAPI specification
    return NextResponse.json(swaggerSpec);
  } catch (error) {
    logger.error('Failed to get API spec', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 