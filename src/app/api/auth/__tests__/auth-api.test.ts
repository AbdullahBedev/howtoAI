import { describe, expect, it, jest, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as registerHandler } from '@/app/api/auth/register/route';
import { POST as logoutHandler } from '@/app/api/auth/logout/route';
import { GET as getUserHandler } from '@/app/api/auth/me/route';
import * as authService from '@/lib/auth/auth-service';

// Mock auth service
jest.mock('@/lib/auth/auth-service', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  logoutUser: jest.fn(),
  getCurrentUser: jest.fn(),
  setUserTokens: jest.fn(),
  AuthError: class AuthError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 400) {
      super(message);
      this.name = 'AuthError';
      this.statusCode = statusCode;
    }
  },
}));

// Helper to create request objects
const createRequest = (body?: any) => {
  return new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};

describe('Auth API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Endpoint', () => {
    it('should return 200 and user data on successful login', async () => {
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };
      
      // Mock successful login
      (authService.loginUser as jest.Mock).mockResolvedValueOnce(mockUser);
      
      const req = createRequest({ email: 'test@example.com', password: 'password123' });
      const response = await loginHandler(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        user: mockUser,
      });
      expect(authService.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(authService.setUserTokens).toHaveBeenCalledWith(mockUser);
    });
    
    it('should return 401 on invalid credentials', async () => {
      // Mock auth error
      (authService.loginUser as jest.Mock).mockRejectedValueOnce(
        new authService.AuthError('Invalid email or password', 401)
      );
      
      const req = createRequest({ email: 'test@example.com', password: 'wrongpassword' });
      const response = await loginHandler(req);
      const data = await response.json();
      
      expect(response.status).toBe(401);
      expect(data).toEqual({
        success: false,
        message: 'Invalid email or password',
      });
    });
    
    it('should return 400 on missing fields', async () => {
      const req = createRequest({ email: 'test@example.com' }); // Missing password
      const response = await loginHandler(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toEqual({
        success: false,
        message: expect.stringContaining('required'),
      });
    });
  });
  
  describe('Register Endpoint', () => {
    it('should return 201 and user data on successful registration', async () => {
      const mockUser = {
        id: 'user-id',
        email: 'new@example.com',
        name: 'New User',
        role: 'USER',
      };
      
      // Mock successful registration
      (authService.registerUser as jest.Mock).mockResolvedValueOnce(mockUser);
      
      const req = createRequest({
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      });
      const response = await registerHandler(req);
      const data = await response.json();
      
      expect(response.status).toBe(201);
      expect(data).toEqual({
        success: true,
        user: mockUser,
      });
      expect(authService.registerUser).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      });
      expect(authService.setUserTokens).toHaveBeenCalledWith(mockUser);
    });
    
    it('should return 409 if user already exists', async () => {
      // Mock user exists error
      (authService.registerUser as jest.Mock).mockRejectedValueOnce(
        new authService.AuthError('User with this email already exists', 409)
      );
      
      const req = createRequest({
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User',
      });
      const response = await registerHandler(req);
      const data = await response.json();
      
      expect(response.status).toBe(409);
      expect(data).toEqual({
        success: false,
        message: 'User with this email already exists',
      });
    });
    
    it('should return 400 on invalid data', async () => {
      const req = createRequest({
        email: 'not-an-email',
        password: '123', // Too short
      });
      const response = await registerHandler(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });
  
  describe('Logout Endpoint', () => {
    it('should return 200 on successful logout', async () => {
      // Mock successful logout
      (authService.logoutUser as jest.Mock).mockResolvedValueOnce(undefined);
      
      const response = await logoutHandler();
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        message: 'Logged out successfully',
      });
      expect(authService.logoutUser).toHaveBeenCalled();
    });
  });
  
  describe('Get User Endpoint', () => {
    it('should return 200 and user data when authenticated', async () => {
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };
      
      // Mock authenticated user
      (authService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);
      
      const response = await getUserHandler();
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        user: mockUser,
      });
    });
    
    it('should return 401 when not authenticated', async () => {
      // Mock unauthenticated
      (authService.getCurrentUser as jest.Mock).mockResolvedValueOnce(null);
      
      const response = await getUserHandler();
      const data = await response.json();
      
      expect(response.status).toBe(401);
      expect(data).toEqual({
        success: false,
        message: 'Not authenticated',
      });
    });
  });
}); 