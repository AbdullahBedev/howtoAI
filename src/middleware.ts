import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT, getJWTFromRequest } from '@/lib/auth/jwt';
import { logger } from '@/lib/logging';

// Define paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/refresh',
];

// Define paths that require specific roles
const roleProtectedPaths: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/dashboard': ['USER', 'ADMIN'],
  '/api/admin': ['ADMIN'],
};

// In-memory store for rate limiting
// In production, this should be replaced with Redis or similar for distributed deployments
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up the rate limit store periodically
// In production, this would be handled by Redis TTL or a separate worker
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

/**
 * Apply rate limiting based on IP address and/or user ID
 * @param request The NextRequest object
 * @param userId Optional user ID for authenticated users
 * @returns NextResponse if rate limit exceeded, undefined otherwise
 */
async function applyRateLimit(request: NextRequest, userId?: string): Promise<NextResponse | undefined> {
  // Only apply rate limiting to API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return undefined;
  }

  // Get configuration from environment variables or use defaults
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '100');
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');
  
  // Create a key for rate limiting - use user ID if available, otherwise IP
  // Use x-forwarded-for header as fallback for IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const key = userId ? `user-${userId}` : `ip-${ip}`;
  
  // Get the current time
  const now = Date.now();
  
  // Get or initialize the rate limit entry
  let entry = rateLimitStore.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = {
      count: 0,
      resetAt: now + windowMs
    };
  }
  
  // Increment the counter
  entry.count++;
  
  // Store the updated entry
  rateLimitStore.set(key, entry);
  
  // Check if the rate limit has been exceeded
  if (entry.count > maxRequests) {
    logger.error('Rate limit exceeded', { key, count: entry.count, maxRequests, path: request.nextUrl.pathname });
    
    // Calculate time until reset
    const secondsUntilReset = Math.ceil((entry.resetAt - now) / 1000);
    
    // Return 429 Too Many Requests
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests', retryAfter: secondsUntilReset }),
      { 
        status: 429, 
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': String(secondsUntilReset)
        } 
      }
    );
  }
  
  return undefined;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  
  // Add the current URL to headers for use in redirects
  requestHeaders.set('x-url', request.url);

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    // Apply rate limiting even for public API routes
    if (pathname.startsWith('/api/')) {
      const rateLimitResponse = await applyRateLimit(request);
      if (rateLimitResponse) return rateLimitResponse;
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  try {
    // Verify JWT token
    const token = await getJWTFromRequest(request);
    const payload = await verifyJWT(token);

    // Check role-based access
    for (const [protectedPath, roles] of Object.entries(roleProtectedPaths)) {
      if (pathname.startsWith(protectedPath) && !roles.includes(payload.role)) {
        return new NextResponse(
          JSON.stringify({ message: 'Unauthorized' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Apply rate limiting for API routes
    if (pathname.startsWith('/api/')) {
      const rateLimitResponse = await applyRateLimit(request, payload.sub);
      if (rateLimitResponse) return rateLimitResponse;
    }

    // Add user info to headers for downstream use
    requestHeaders.set('x-user-id', payload.sub);
    requestHeaders.set('x-user-role', payload.role);
    requestHeaders.set('x-user-email', payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // For API routes: apply rate limiting and return 401
    if (pathname.startsWith('/api/')) {
      const rateLimitResponse = await applyRateLimit(request);
      if (rateLimitResponse) return rateLimitResponse;
      
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // For non-API routes: redirect to login with the current URL as the redirect target
    const redirectUrl = new URL(`/login?redirect=${encodeURIComponent(request.url)}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 