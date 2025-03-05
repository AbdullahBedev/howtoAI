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

export type UpdateUserInput = Partial<{
  name: string;
  email: string;
  image: string;
}>;

export type UpdateProfileInput = {
  bio?: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
  preferences?: Record<string, any>;
};

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  // Alias for findByEmail to make the API consistent with the controller expectations
  async getUserByEmail(email: string): Promise<User | null> {
    return this.findByEmail(email);
  }

  async findWithProfile(id: string): Promise<User | null> {
    return this.model.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  // Get user profile with all details
  async getUserProfile(id: string) {
    const user = await this.model.findUnique({
      where: { id },
      include: {
        profile: true,
        achievements: {
          include: {
            achievement: false,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        tutorialProgress: {
          include: {
            tutorial: {
              select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                difficulty: true,
              },
            },
          },
        },
        subscription: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      profile: user.profile,
      achievements: user.achievements,
      tutorials: user.tutorialProgress,
      subscription: user.subscription,
    };
  }

  // Update user profile
  async updateUserProfile(id: string, data: UpdateProfileInput) {
    const user = await this.model.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // If the user has a profile, update it, otherwise create it
    if (user.profile) {
      return prisma.profile.update({
        where: { userId: id },
        data: {
          bio: data.bio !== undefined ? data.bio : user.profile.bio,
          avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : user.profile.avatarUrl,
          socialLinks: data.socialLinks ? JSON.parse(JSON.stringify(data.socialLinks)) : undefined,
          preferences: data.preferences ? JSON.parse(JSON.stringify(data.preferences)) : undefined,
        },
      });
    } else {
      return prisma.profile.create({
        data: {
          userId: id,
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          socialLinks: data.socialLinks ? JSON.parse(JSON.stringify(data.socialLinks)) : {},
          preferences: data.preferences ? JSON.parse(JSON.stringify(data.preferences)) : {},
        },
      });
    }
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
          subscription: {
            create: {
              tier: 'FREE',
              status: 'ACTIVE',
              startDate: new Date(),
            }
          }
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

  // Delete a user and all related data
  async deleteUser(id: string): Promise<User> {
    return this.transaction(async (tx) => {
      // Delete related data if needed
      // This will cascade delete many relations automatically due to schema setup
      
      // Delete the user
      const deletedUser = await tx.user.delete({
        where: { id },
      });
      
      return deletedUser;
    });
  }
} 