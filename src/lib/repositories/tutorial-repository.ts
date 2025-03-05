import { db } from '@/lib/db';
import { Prisma, Tutorial, TutorialProgress } from '@prisma/client';

export class TutorialRepository {
  /**
   * Get all tutorials with optional filtering
   */
  async findAll(options?: {
    category?: string;
    premium?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const { category, premium, search, limit = 20, offset = 0 } = options || {};

    const where: Prisma.TutorialWhereInput = {};
    
    if (category) {
      where.category = category;
    }
    
    if (premium !== undefined) {
      where.premium = premium;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [tutorials, count] = await Promise.all([
      db.tutorial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.tutorial.count({ where }),
    ]);

    return {
      tutorials,
      count,
      limit,
      offset,
    };
  }

  /**
   * Get a tutorial by its ID
   */
  async findById(id: string) {
    return db.tutorial.findUnique({
      where: { id },
    });
  }

  /**
   * Get a tutorial by its slug
   */
  async findBySlug(slug: string) {
    return db.tutorial.findUnique({
      where: { slug },
    });
  }

  /**
   * Track progress for a tutorial
   */
  async trackProgress(userId: string, tutorialId: string, data: {
    progress: number;
    lastSection?: string;
    completedAt?: Date | null;
  }) {
    return db.tutorialProgress.upsert({
      where: {
        userId_tutorialId: {
          userId,
          tutorialId,
        },
      },
      update: {
        progress: data.progress,
        lastSection: data.lastSection,
        completedAt: data.completedAt,
        updatedAt: new Date(),
      },
      create: {
        userId,
        tutorialId,
        progress: data.progress,
        lastSection: data.lastSection,
        completedAt: data.completedAt,
      },
    });
  }

  /**
   * Get tutorial progress for a user
   */
  async getUserProgress(userId: string, tutorialId?: string) {
    if (tutorialId) {
      return db.tutorialProgress.findUnique({
        where: {
          userId_tutorialId: {
            userId,
            tutorialId,
          },
        },
      });
    }

    return db.tutorialProgress.findMany({
      where: {
        userId,
      },
      include: {
        tutorial: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  /**
   * Get recommended tutorials for a user
   */
  async getRecommendations(userId: string, limit = 5) {
    // First get categories the user has engaged with
    const userProgress = await db.tutorialProgress.findMany({
      where: { userId },
      include: { tutorial: true },
    });

    const engagedCategories = new Set(userProgress.map(p => p.tutorial.category));
    
    // Get tutorials in those categories that the user hasn't started
    const completedTutorialIds = userProgress
      .filter(p => p.progress >= 0.8)
      .map(p => p.tutorialId);

    // Find tutorials in categories user has shown interest in
    if (engagedCategories.size > 0) {
      return db.tutorial.findMany({
        where: {
          category: { in: Array.from(engagedCategories) },
          id: { notIn: completedTutorialIds },
        },
        orderBy: { publishedAt: 'desc' },
        take: limit,
      });
    }

    // If no categories engaged with, return popular tutorials
    return db.tutorial.findMany({
      where: {
        id: { notIn: completedTutorialIds },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }
} 