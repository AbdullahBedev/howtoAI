import { NextResponse } from 'next/server';
import { refreshUserToken } from '@/lib/auth/auth-service';
import { AuthError } from '@/lib/auth/auth-service';

export async function POST() {
  try {
    await refreshUserToken();
    
    return NextResponse.json({ 
      message: 'Token refreshed successfully' 
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message }, 
        { status: error.statusCode }
      );
    }
    
    // Handle other errors
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 