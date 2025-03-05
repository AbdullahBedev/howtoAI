import { User, UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { JWTPayload, signJWT, verifyJWT, setTokenCookie, setRefreshTokenCookie, clearAuthCookies } from './jwt';
import { hash, compare } from 'bcrypt';
import { cookies } from 'next/headers';

export class AuthError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

export interface RegisterUserParams {
  email: string;
  password: string;
  name?: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

// Auth Service class to wrap the individual functions
export class AuthService {
  constructor() {}

  async register(params: RegisterUserParams): Promise<User> {
    return registerUser(params);
  }

  async login(params: LoginUserParams): Promise<User> {
    return loginUser(params);
  }

  async logout(): Promise<void> {
    return logoutUser();
  }

  async setTokens(user: User): Promise<void> {
    return setUserTokens(user);
  }

  async getCurrentUser(): Promise<User | null> {
    return getCurrentUser();
  }

  async hasPermission(user: User | null, requiredRoles: UserRole[]): Promise<boolean> {
    return hasPermission(user, requiredRoles);
  }
}

export async function registerUser({ email, password, name }: RegisterUserParams): Promise<User> {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new AuthError('User with this email already exists', 409);
  }

  // Hash password
  const passwordHash = await hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: UserRole.USER,
      profile: {
        create: {
          preferences: {},
          socialLinks: {}
        }
      },
      subscription: {
        create: {
          tier: 'FREE',
          status: 'ACTIVE',
          startDate: new Date(),
        }
      }
    },
  });

  // Log this login
  await prisma.loginHistory.create({
    data: {
      userId: user.id,
      ipAddress: '127.0.0.1', // In a real app, you would get this from the request
      userAgent: 'Unknown', // In a real app, you would get this from the request
      success: true,
    }
  });

  return user;
}

export async function loginUser({ email, password }: LoginUserParams): Promise<User> {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    // Log failed login attempt - we don't have a user to link to
    // For security records, we'll do a separate log in a different table or just log to console
    console.error(`Failed login attempt for email: ${email} - User not found`);
    
    throw new AuthError('Invalid email or password', 401);
  }

  // Verify password
  const passwordValid = await compare(password, user.passwordHash);

  if (!passwordValid) {
    // Log failed login attempt
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        ipAddress: '127.0.0.1', // In a real app, you would get this from the request
        userAgent: 'Unknown', // In a real app, you would get this from the request
        success: false,
      }
    });
    throw new AuthError('Invalid email or password', 401);
  }

  // Log successful login
  await prisma.loginHistory.create({
    data: {
      userId: user.id,
      ipAddress: '127.0.0.1', // In a real app, you would get this from the request
      userAgent: 'Unknown', // In a real app, you would get this from the request
      success: true,
    }
  });

  return user;
}

export async function setUserTokens(user: User): Promise<void> {
  // Create JWT payload
  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name || '',
  };

  // Generate tokens
  const accessToken = await signJWT(payload);
  const refreshToken = await signJWT(payload, { expiresIn: '7d' });

  // Set cookies
  setTokenCookie(accessToken);
  setRefreshTokenCookie(refreshToken);
}

export async function logoutUser(): Promise<void> {
  clearAuthCookies();
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return null;
  }

  try {
    // Verify token
    const payload = await verifyJWT(token);
    
    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: payload.sub }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function hasPermission(user: User | null, requiredRoles: UserRole[]): Promise<boolean> {
  if (!user) return false;
  return requiredRoles.includes(user.role);
} 