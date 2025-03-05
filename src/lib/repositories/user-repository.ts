import { Prisma, User } from '@prisma/client';
import { BaseRepository } from './base-repository';
import { prisma } from '@/lib/db';
import { hash } from 'bcrypt';

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  role?: 'USER' | 'ADMIN';
};

export type UpdateUserInput = Partial<Omit<User, 'id' | 'passwordHash' | 'createdAt' | 'updatedAt'>>;

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  async findWithProfile(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findWithAchievements(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const passwordHash = await hash(data.password, 10);
    
    return this.transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          name: data.name,
          role: data.role || 'USER',
          profile: {
            create: {
              bio: null,
              avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`,
              socialLinks: {},
              preferences: {},
            },
          },
        },
      });

      return user;
    });
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    return this.update(id, data);
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    const passwordHash = await hash(newPassword, 10);
    return this.update(id, { passwordHash });
  }

  async findWithTutorialProgress(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: {
        tutorialProgress: {
          include: {
            tutorial: true,
          },
        },
      },
    });
  }

  async findWithPosts(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async findWithComments(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async findWithApiKeys(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: {
        apiKeys: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
} 