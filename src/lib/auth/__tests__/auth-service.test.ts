import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AuthError, registerUser, loginUser, setUserTokens, refreshUserToken, logoutUser, getCurrentUser, hasPermission } from '../auth-service';
import { cookies } from 'next/headers';
import type { UserRole } from '@prisma/client';

// Mock the cookies module
jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  }),
}));

// Mock the jose library for JWT operations
jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setSubject: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mock-jwt-token'),
  })),
  jwtVerify: jest.fn().mockResolvedValue({
    payload: {
      sub: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
    },
  }),
}));

// Mock the bcrypt library for password hashing
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockImplementation((password, hash) => {
    return Promise.resolve(password === 'correct-password');
  }),
}));

// Mock Prisma client
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

jest.mock('@/lib/db', () => ({
  prisma: mockPrisma,
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      // Mock user not existing already
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      
      // Mock user creation
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER' as UserRole,
        passwordHash: 'hashed-password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrisma.user.create.mockResolvedValueOnce(mockUser);

      const result = await registerUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(mockPrisma.user.create).toHaveBeenCalled();
      expect(result).toEqual({
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      });
    });

    it('should throw an error if user already exists', async () => {
      // Mock user already existing
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'existing-user-id',
        email: 'test@example.com',
      });

      await expect(
        registerUser({
          email: 'test@example.com',
          password: 'password123',
        })
      ).rejects.toThrow(AuthError);
    });
  });

  describe('loginUser', () => {
    it('should login a user with correct credentials', async () => {
      // Mock user existing
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER' as UserRole,
        passwordHash: 'hashed-password',
      };
      mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);

      const result = await loginUser({
        email: 'test@example.com',
        password: 'correct-password',
      });

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual({
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      });
    });

    it('should throw an error if user does not exist', async () => {
      // Mock user not existing
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        loginUser({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
      ).rejects.toThrow(AuthError);
    });

    it('should throw an error if password is incorrect', async () => {
      // Mock user existing
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      };
      mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);

      await expect(
        loginUser({
          email: 'test@example.com',
          password: 'wrong-password',
        })
      ).rejects.toThrow(AuthError);
    });
  });

  describe('setUserTokens', () => {
    it('should set auth cookies with user tokens', async () => {
      const user = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER' as UserRole,
      };

      await setUserTokens(user);

      expect(cookies().set).toHaveBeenCalledTimes(2);
    });
  });

  describe('refreshUserToken', () => {
    it('should refresh the auth token if valid refresh token exists', async () => {
      // Mock refresh token in cookies
      const mockCookiesGet = cookies().get as jest.Mock;
      mockCookiesGet.mockImplementation((name) => {
        if (name === 'refresh_token') {
          return { value: 'valid-refresh-token' };
        }
        return null;
      });

      await refreshUserToken();

      expect(cookies().set).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if no refresh token exists', async () => {
      // Mock no refresh token in cookies
      const mockCookiesGet = cookies().get as jest.Mock;
      mockCookiesGet.mockImplementation(() => null);

      await expect(refreshUserToken()).rejects.toThrow(AuthError);
    });
  });

  describe('logoutUser', () => {
    it('should clear auth cookies', async () => {
      await logoutUser();

      expect(cookies().delete).toHaveBeenCalledTimes(2);
    });
  });

  describe('getCurrentUser', () => {
    it('should return user from auth token if valid', async () => {
      // Mock auth token in cookies
      const mockCookiesGet = cookies().get as jest.Mock;
      mockCookiesGet.mockImplementation((name) => {
        if (name === 'auth_token') {
          return { value: 'valid-auth-token' };
        }
        return null;
      });

      const result = await getCurrentUser();

      expect(result).toEqual({
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      });
    });

    it('should return null if no auth token exists', async () => {
      // Mock no auth token in cookies
      const mockCookiesGet = cookies().get as jest.Mock;
      mockCookiesGet.mockImplementation(() => null);

      const result = await getCurrentUser();

      expect(result).toBeNull();
    });
  });

  describe('hasPermission', () => {
    it('should return true if user has required role', async () => {
      const user = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'ADMIN' as UserRole,
      };

      const result = await hasPermission(user, ['ADMIN', 'USER']);

      expect(result).toBe(true);
    });

    it('should return false if user does not have required role', async () => {
      const user = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER' as UserRole,
      };

      const result = await hasPermission(user, ['ADMIN']);

      expect(result).toBe(false);
    });

    it('should return false if user is null', async () => {
      const result = await hasPermission(null, ['ADMIN', 'USER']);

      expect(result).toBe(false);
    });
  });
}); 