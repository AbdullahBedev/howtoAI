import { db } from '@/lib/db';
import { Prisma, Achievement, AchievementType } from '@prisma/client';

export class AchievementRepository {
  /**
   * Get all achievements for a user
   */
  async getUserAchievements(userId: string) {
    return db.achievement.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get achievements by type for a user
   */
  async getUserAchievementsByType(userId: string, type: AchievementType) {
    return db.achievement.findMany({
      where: {
        userId,
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Create a new achievement for a user
   */
  async createAchievement(userId: string, data: {
    type: AchievementType;
    title: string;
    description: string;
  }) {
    return db.achievement.create({
      data: {
        userId,
        type: data.type,
        title: data.title,
        description: data.description,
      },
    });
  }

  /**
   * Check for tutorial completion achievement
   * Returns true if a new achievement was created
   */
  async checkTutorialCompletion(userId: string, tutorialId: string): Promise<Achievement | null> {
    // Check if user has already earned an achievement for this tutorial
    const existingAchievement = await db.achievement.findFirst({
      where: {
        userId,
        type: 'TUTORIAL_COMPLETION',
        description: { contains: tutorialId }
      },
    });

    if (existingAchievement) {
      return null;
    }

    // Check if the tutorial is completed
    const progress = await db.tutorialProgress.findUnique({
      where: {
        userId_tutorialId: {
          userId,
          tutorialId,
        },
      },
      include: {
        tutorial: true,
      },
    });

    if (!progress || progress.progress < 1.0 || !progress.completedAt) {
      return null;
    }

    // Create the achievement
    return this.createAchievement(userId, {
      type: 'TUTORIAL_COMPLETION',
      title: `Completed: ${progress.tutorial.title}`,
      description: `Completed the "${progress.tutorial.title}" tutorial (${tutorialId})`,
    });
  }

  /**
   * Check for learning streak achievement
   * Returns true if a new achievement was created
   */
  async checkLearningStreak(userId: string): Promise<Achievement | null> {
    // Get user's tutorial progress over the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentProgress = await db.tutorialProgress.findMany({
      where: {
        userId,
        updatedAt: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });

    if (recentProgress.length < 5) {
      return null;
    }

    // Check if there was activity on at least 5 different days
    const uniqueDays = new Set(
      recentProgress.map(p => p.updatedAt.toISOString().split('T')[0])
    );

    if (uniqueDays.size < 5) {
      return null;
    }

    // Check if user already has this achievement
    const existingAchievement = await db.achievement.findFirst({
      where: {
        userId,
        type: 'LEARNING_STREAK',
        title: '5-Day Learning Streak',
      },
    });

    if (existingAchievement) {
      return null;
    }

    // Create the achievement
    return this.createAchievement(userId, {
      type: 'LEARNING_STREAK',
      title: '5-Day Learning Streak',
      description: 'Learned on the platform for 5 different days in a week',
    });
  }

  /**
   * Check for prompt mastery achievement
   */
  async checkPromptMastery(userId: string, numCompletedPromptTutorials: number): Promise<Achievement | null> {
    if (numCompletedPromptTutorials < 3) {
      return null;
    }

    // Check if user already has this achievement
    const existingAchievement = await db.achievement.findFirst({
      where: {
        userId,
        type: 'PROMPT_MASTERY',
        title: 'Prompt Master',
      },
    });

    if (existingAchievement) {
      return null;
    }

    // Create the achievement
    return this.createAchievement(userId, {
      type: 'PROMPT_MASTERY',
      title: 'Prompt Master',
      description: 'Completed at least 3 prompt engineering tutorials',
    });
  }
} 