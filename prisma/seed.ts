import { PrismaClient, UserRole, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Define enums to match the schema
const AchievementType = {
  TUTORIAL_COMPLETION: 'TUTORIAL_COMPLETION',
  PROMPT_MASTERY: 'PROMPT_MASTERY',
  LEARNING_STREAK: 'LEARNING_STREAK'
};

const SubscriptionTier = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  ENTERPRISE: 'ENTERPRISE'
};

const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  EXPIRED: 'EXPIRED',
  TRIAL: 'TRIAL',
  PAST_DUE: 'PAST_DUE'
};

const PaymentProvider = {
  STRIPE: 'STRIPE',
  PAYPAL: 'PAYPAL'
};

async function main() {
  // Clean up existing data first to avoid conflicts
  await cleanDatabase();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@howtoai.com',
      name: 'Admin',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      profile: {
        create: {
          bio: 'Platform administrator',
          avatarUrl: 'https://ui-avatars.com/api/?name=Admin',
          socialLinks: JSON.parse(JSON.stringify({ twitter: '@adminHowToAI' })),
          preferences: JSON.parse(JSON.stringify({ theme: 'dark', emailNotifications: true })),
        },
      },
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@howtoai.com',
      name: 'Demo User',
      passwordHash: userPassword,
      role: UserRole.USER,
      profile: {
        create: {
          bio: 'Enthusiastic AI learner',
          avatarUrl: 'https://ui-avatars.com/api/?name=Demo+User',
          socialLinks: JSON.parse(JSON.stringify({ twitter: '@demouser', github: 'demouser' })),
          preferences: JSON.parse(JSON.stringify({ theme: 'light', emailNotifications: true })),
        },
      },
    },
  });

  // Create tutorials
  const gettingStartedTutorial = await prisma.tutorial.create({
    data: {
      slug: 'getting-started',
      title: 'Getting Started with AI',
      description: 'Learn the basics of artificial intelligence and how to get started.',
      content: JSON.parse(JSON.stringify({
        sections: [
          {
            title: 'Introduction to AI',
            content: 'Artificial Intelligence (AI) refers to computer systems designed to perform tasks that normally require human intelligence...',
          },
          {
            title: 'Machine Learning Basics',
            content: 'Machine Learning is a subset of AI that focuses on developing systems that can learn from data...',
          },
        ],
      })),
      difficulty: 'BEGINNER',
      category: 'fundamentals',
      premium: false,
      tags: ['beginner', 'ai', 'introduction'],
    },
  });

  const promptEngineeringTutorial = await prisma.tutorial.create({
    data: {
      slug: 'prompt-engineering',
      title: 'The Art of Prompt Engineering',
      description: 'Master the techniques of crafting effective prompts for AI systems.',
      content: JSON.parse(JSON.stringify({
        sections: [
          {
            title: 'Understanding Prompts',
            content: 'Prompts are the instructions given to AI models to guide their responses...',
          },
          {
            title: 'Advanced Techniques',
            content: 'Learn advanced techniques like chain-of-thought and few-shot learning...',
          },
        ],
      })),
      difficulty: 'INTERMEDIATE',
      category: 'prompt-engineering',
      premium: true,
      tags: ['intermediate', 'prompts', 'techniques'],
    },
  });

  // Create tutorial progress
  await prisma.tutorialProgress.create({
    data: {
      userId: user.id,
      tutorialId: gettingStartedTutorial.id,
      completedAt: null,
      progress: 0.5,
      lastSection: 'Introduction to AI',
    },
  });

  // Create achievements
  await prisma.achievement.createMany({
    data: [
      {
        type: AchievementType.TUTORIAL_COMPLETION,
        title: 'First Steps',
        description: 'Complete your first tutorial',
        userId: user.id,
      },
      {
        type: AchievementType.PROMPT_MASTERY,
        title: 'Prompt Engineer',
        description: 'Master the art of prompt engineering',
        userId: user.id,
      },
      {
        type: AchievementType.LEARNING_STREAK,
        title: 'Learning Machine',
        description: 'Complete 5 tutorials in a row',
        userId: user.id,
      },
    ],
  });

  // Create API keys
  await prisma.apiKey.create({
    data: {
      userId: user.id,
      key: 'hta_' + Math.random().toString(36).substring(2, 15),
      name: 'Default API Key',
      lastUsed: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  // Create subscription
  const userSubscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      tier: SubscriptionTier.PREMIUM,
      status: SubscriptionStatus.ACTIVE,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      paymentProvider: PaymentProvider.STRIPE,
      providerId: 'sub_' + Math.random().toString(36).substring(2, 15),
      price: 50.0,
      currency: 'USD',
    },
  });

  // Create invoice
  await prisma.invoice.create({
    data: {
      subscriptionId: userSubscription.id,
      amount: 50.0,
      currency: 'USD',
      status: 'paid',
      paidAt: new Date(),
      paymentMethod: 'card',
      paymentIntentId: 'pi_' + Math.random().toString(36).substring(2, 15),
    },
  });

  // Create posts
  const firstPost = await prisma.post.create({
    data: {
      title: 'My AI Journey',
      content: 'I just started learning about artificial intelligence and wanted to share my experience...',
      authorId: user.id,
      category: 'experiences',
      tags: ['journey', 'beginner', 'learning'],
    },
  });

  // Create comments
  const firstComment = await prisma.comment.create({
    data: {
      content: 'Great post! I can relate to your experience.',
      authorId: admin.id,
      postId: firstPost.id,
    },
  });

  const replyComment = await prisma.comment.create({
    data: {
      content: 'Thanks for the encouragement!',
      authorId: user.id,
      postId: firstPost.id,
      parentId: firstComment.id,
    },
  });

  // Create likes
  await prisma.like.create({
    data: {
      userId: admin.id,
      postId: firstPost.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user.id,
      commentId: firstComment.id,
    },
  });

  // Create user analytics
  await prisma.userAnalytics.createMany({
    data: [
      {
        userId: user.id,
        event: 'page_view',
        page: '/tutorials/getting-started',
        metadata: JSON.parse(JSON.stringify({ referrer: 'homepage', device: 'desktop' })),
      },
      {
        userId: user.id,
        event: 'tutorial_progress',
        page: '/tutorials/getting-started',
        metadata: JSON.parse(JSON.stringify({ progress: 0.5, timeSpent: 300 })),
      },
    ],
  });

  // Create login history
  await prisma.loginHistory.createMany({
    data: [
      {
        userId: user.id,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        success: true,
      },
      {
        userId: admin.id,
        ipAddress: '192.168.1.2',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        success: true,
      },
    ],
  });

  // Create backup logs
  await prisma.backupLog.createMany({
    data: [
      {
        filename: 'backup-2023-01-01.sql',
        size: 1024000,
        status: 'completed',
        location: 's3://howtoai-backups/daily/backup-2023-01-01.sql',
        completedAt: new Date(),
      },
    ],
  });

  // Create system logs
  await prisma.systemLog.createMany({
    data: [
      {
        level: 'info',
        message: 'System started successfully',
        source: 'system',
        context: JSON.parse(JSON.stringify({ version: '1.0.0' })),
      },
      {
        level: 'warning',
        message: 'High memory usage detected',
        source: 'monitoring',
        context: JSON.parse(JSON.stringify({ memoryUsage: '85%', timestamp: new Date() })),
      },
    ],
  });

  console.log('Seed data created successfully');
}

// Helper function to clean database in the correct order
async function cleanDatabase() {
  const tablenames = await prisma.$queryRaw<{ tablename: string }[]>(
    Prisma.sql`SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename NOT IN ('_prisma_migrations');`
  );

  const tables = tablenames.map(({ tablename }) => tablename).filter(name => name !== '_prisma_migrations');

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 