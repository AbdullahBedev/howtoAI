import { http, HttpResponse } from 'msw';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

// Define handlers for API mocking
export const handlers = [
  // Auth API handlers
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as LoginRequest;
    
    // Mock successful login
    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        success: true,
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'USER',
        },
        token: 'mock-auth-token',
      });
    }
    
    // Mock failed login
    return new HttpResponse(
      JSON.stringify({
        success: false,
        message: 'Invalid email or password',
      }),
      { status: 401 }
    );
  }),
  
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as RegisterRequest;
    
    // Mock existing email error
    if (body.email === 'existing@example.com') {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: 'Email already exists',
        }),
        { status: 400 }
      );
    }
    
    // Mock successful registration
    return HttpResponse.json({
      success: true,
      user: {
        id: '2',
        email: body.email,
        name: body.name,
        role: 'USER',
      },
    });
  }),
  
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  }),
  
  http.get('/api/users/me', () => {
    return HttpResponse.json({
      success: true,
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }),
  
  // Tutorial API handlers
  http.get('/api/tutorials', () => {
    return HttpResponse.json({
      success: true,
      tutorials: [
        {
          id: '1',
          title: 'Getting Started with AI',
          description: 'Learn the basics of artificial intelligence',
          difficulty: 'BEGINNER',
          category: 'AI Fundamentals',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Advanced Prompt Engineering',
          description: 'Master the art of crafting effective prompts',
          difficulty: 'INTERMEDIATE',
          category: 'Prompt Engineering',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    });
  }),
  
  // Tutorial progress API handlers
  http.post('/api/tutorials/:id/progress', async ({ params }) => {
    const tutorialId = params.id;
    
    return HttpResponse.json({
      success: true,
      message: `Progress updated for tutorial ${tutorialId}`,
      progress: {
        tutorialId,
        completedSections: ['introduction', 'basics'],
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
      },
    });
  }),
]; 