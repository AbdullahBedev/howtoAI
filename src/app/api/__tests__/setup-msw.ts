import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export interface TestUser {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
}

// Create a mock user
export const mockUser: TestUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'USER',
};

// Create a mock admin user
export const mockAdmin: TestUser = {
  id: 'test-admin-id',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'ADMIN',
};

// Setup handlers for different API routes
export const handlers = [
  // Auth: Register
  http.post('/api/auth/register', async ({ request }) => {
    const data = await request.json();
    
    if (data.email === 'existing@example.com') {
      return HttpResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    return HttpResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: 'new-user-id',
          email: data.email,
          name: data.name || null,
          role: 'USER',
        },
      },
      { status: 201 }
    );
  }),
  
  // Auth: Login
  http.post('/api/auth/login', async ({ request }) => {
    const data = await request.json();
    
    if (data.email === 'test@example.com' && data.password === 'ValidPassword123') {
      return HttpResponse.json({
        message: 'Login successful',
        user: mockUser,
      });
    }
    
    if (data.email === 'admin@example.com' && data.password === 'AdminPassword123') {
      return HttpResponse.json({
        message: 'Login successful',
        user: mockAdmin,
      });
    }
    
    return HttpResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }),
  
  // Auth: Me (Get current user)
  http.get('/api/auth/me', () => {
    // Default to authenticated as regular user
    return HttpResponse.json({ user: mockUser });
  }),
  
  // Auth: Logout
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),
  
  // Auth: Refresh
  http.post('/api/auth/refresh', () => {
    return HttpResponse.json({ message: 'Token refreshed successfully' });
  }),
];

// Setup MSW server
export const server = setupServer(...handlers);

// Start the interception
export const startMSW = () => {
  // Start before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  
  // Reset after each test
  afterEach(() => server.resetHandlers());
  
  // Close after all tests
  afterAll(() => server.close());
};

export default startMSW; 