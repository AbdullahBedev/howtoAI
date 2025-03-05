import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export type JWTPayload = {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
};

export async function signJWT(
  payload: JWTPayload,
  options: { expiresIn: string } = { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const alg = 'HS256';

    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.expiresIn)
      .setIssuedAt()
      .sign(secret);
  } catch (error) {
    throw new Error('Error signing JWT');
  }
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function getJWTFromRequest(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) throw new Error('No token found');
  return token;
}

export function setTokenCookie(token: string) {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 15, // 15 minutes
    path: '/',
  });
}

export function setRefreshTokenCookie(token: string) {
  cookies().set('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearAuthCookies() {
  cookies().delete('token');
  cookies().delete('refreshToken');
} 