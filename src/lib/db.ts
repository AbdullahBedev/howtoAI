import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a singleton Prisma client instance
export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Export the client for use in the application
export const db = prisma;

// Connect and disconnect functions for serverless environments
export async function connectDb() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

export async function disconnectDb() {
  await prisma.$disconnect();
}

// Error handling wrapper for database operations
export async function withDb<T>(operation: () => Promise<T>): Promise<T> {
  try {
    await connectDb();
    const result = await operation();
    return result;
  } catch (error) {
    console.error('Database operation error:', error);
    throw error;
  } finally {
    await disconnectDb();
  }
} 