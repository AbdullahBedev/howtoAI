import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class SearchRepository {
  /**
   * Perform a global search across multiple entities
   */
  async globalSearch(query: string, options?: {
    limit?: number;
    includeUsers?: boolean;
    includeTutorials?: boolean;
    includePosts?: boolean;
  }) {
    const { 
      limit = 20, 
      includeUsers = true, 
      includeTutorials = true, 
      includePosts = true 
    } = options || {};

    const results: {
      type: 'tutorial' | 'post' | 'user';
      id: string;
      title?: string;
      name?: string;
      description?: string;
      category?: string;
      createdAt: Date;
    }[] = [];

    const queries: Promise<any>[] = [];

    // Search tutorials
    if (includeTutorials) {
      const tutorialsPromise = db.tutorial.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
          publishedAt: { not: null },
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          createdAt: true,
        },
        take: limit,
      }).then(tutorials => 
        tutorials.map(tutorial => ({
          type: 'tutorial' as const,
          id: tutorial.id,
          title: tutorial.title,
          description: tutorial.description,
          category: tutorial.category,
          createdAt: tutorial.createdAt,
        }))
      );
      
      queries.push(tutorialsPromise);
    }

    // Search posts
    if (includePosts) {
      const postsPromise = db.post.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
          published: true,
        },
        select: {
          id: true,
          title: true,
          category: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: limit,
      }).then(posts => 
        posts.map(post => ({
          type: 'post' as const,
          id: post.id,
          title: post.title,
          category: post.category,
          createdAt: post.createdAt,
          authorId: post.author.id,
          authorName: post.author.name,
        }))
      );
      
      queries.push(postsPromise);
    }

    // Search users
    if (includeUsers) {
      const usersPromise = db.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          profile: {
            select: {
              bio: true,
            },
          },
        },
        take: limit,
      }).then(users => 
        users.map(user => ({
          type: 'user' as const,
          id: user.id,
          name: user.name,
          description: user.profile?.bio,
          createdAt: user.createdAt,
        }))
      );
      
      queries.push(usersPromise);
    }

    // Execute all queries in parallel
    const queryResults = await Promise.all(queries);
    
    // Flatten results
    queryResults.forEach(resultSet => {
      results.push(...resultSet);
    });
    
    // Sort by relevance (if needed) and limit
    return results
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Search for tutorials
   */
  async searchTutorials(query: string, options?: {
    category?: string;
    premium?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const { category, premium, limit = 20, offset = 0 } = options || {};

    const where: Prisma.TutorialWhereInput = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
      publishedAt: { not: null },
    };

    if (category) {
      where.category = category;
    }

    if (premium !== undefined) {
      where.premium = premium;
    }

    const [tutorials, count] = await Promise.all([
      db.tutorial.findMany({
        where,
        orderBy: { 
          createdAt: 'desc',
        },
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
   * Search for posts
   */
  async searchPosts(query: string, options?: {
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    const { category, limit = 20, offset = 0 } = options || {};

    const where: Prisma.PostWhereInput = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
      published: true,
    };

    if (category) {
      where.category = category;
    }

    const [posts, count] = await Promise.all([
      db.post.findMany({
        where,
        orderBy: { 
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      }),
      db.post.count({ where }),
    ]);

    return {
      posts,
      count,
      limit,
      offset,
    };
  }

  /**
   * Search for users
   */
  async searchUsers(query: string, options?: {
    limit?: number;
    offset?: number;
  }) {
    const { limit = 20, offset = 0 } = options || {};

    const where: Prisma.UserWhereInput = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    };

    const [users, count] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true,
          profile: {
            select: {
              bio: true,
            },
          },
          _count: {
            select: {
              posts: true,
              achievements: true,
            },
          },
        },
        orderBy: { 
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      db.user.count({ where }),
    ]);

    return {
      users,
      count,
      limit,
      offset,
    };
  }
} 