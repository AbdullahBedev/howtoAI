import { db } from '@/lib/db';
import { Prisma, Post, Comment } from '@prisma/client';

export class CommunityRepository {
  /**
   * Get all posts with optional filtering
   */
  async getPosts(options?: {
    category?: string;
    tags?: string[];
    authorId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const { category, tags, authorId, search, limit = 20, offset = 0 } = options || {};

    const where: Prisma.PostWhereInput = {
      published: true,
    };
    
    if (category) {
      where.category = category;
    }
    
    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }
    
    if (authorId) {
      where.authorId = authorId;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, count] = await Promise.all([
      db.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
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
   * Get a post by ID with comments
   */
  async getPostById(id: string, includeComments = false) {
    return db.post.findUnique({
      where: { id },
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
        ...(includeComments ? {
          comments: {
            where: {
              parentId: null,
            },
            orderBy: {
              createdAt: 'asc',
            },
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
                  likes: true,
                  replies: true,
                },
              },
            },
          },
        } : {}),
      },
    });
  }

  /**
   * Create a new post
   */
  async createPost(authorId: string, data: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
    published?: boolean;
  }) {
    return db.post.create({
      data: {
        authorId,
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags || [],
        published: data.published !== undefined ? data.published : true,
      },
    });
  }

  /**
   * Update a post
   */
  async updatePost(id: string, authorId: string, data: {
    title?: string;
    content?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
  }) {
    const post = await db.post.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== authorId) {
      throw new Error('Unauthorized or post not found');
    }

    return db.post.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a post
   */
  async deletePost(id: string, authorId: string) {
    const post = await db.post.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== authorId) {
      throw new Error('Unauthorized or post not found');
    }

    return db.post.delete({
      where: { id },
    });
  }

  /**
   * Get comments for a post
   */
  async getComments(postId: string, parentId: string | null = null) {
    return db.comment.findMany({
      where: {
        postId,
        parentId,
      },
      orderBy: {
        createdAt: 'asc',
      },
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
            likes: true,
            replies: true,
          },
        },
      },
    });
  }

  /**
   * Create a comment
   */
  async createComment(authorId: string, data: {
    postId: string;
    content: string;
    parentId?: string;
  }) {
    return db.comment.create({
      data: {
        authorId,
        postId: data.postId,
        content: data.content,
        parentId: data.parentId || null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }

  /**
   * Update a comment
   */
  async updateComment(id: string, authorId: string, content: string) {
    const comment = await db.comment.findUnique({
      where: { id },
    });

    if (!comment || comment.authorId !== authorId) {
      throw new Error('Unauthorized or comment not found');
    }

    return db.comment.update({
      where: { id },
      data: { content },
    });
  }

  /**
   * Delete a comment
   */
  async deleteComment(id: string, authorId: string) {
    const comment = await db.comment.findUnique({
      where: { id },
    });

    if (!comment || comment.authorId !== authorId) {
      throw new Error('Unauthorized or comment not found');
    }

    return db.comment.delete({
      where: { id },
    });
  }

  /**
   * Like or unlike a post
   */
  async togglePostLike(userId: string, postId: string) {
    const existingLike = await db.like.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: { id: existingLike.id },
      });
      return { liked: false };
    } else {
      await db.like.create({
        data: {
          userId,
          postId,
        },
      });
      return { liked: true };
    }
  }

  /**
   * Like or unlike a comment
   */
  async toggleCommentLike(userId: string, commentId: string) {
    const existingLike = await db.like.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: { id: existingLike.id },
      });
      return { liked: false };
    } else {
      await db.like.create({
        data: {
          userId,
          commentId,
        },
      });
      return { liked: true };
    }
  }

  /**
   * Check if a user has liked a post
   */
  async hasLikedPost(userId: string, postId: string) {
    const like = await db.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    return !!like;
  }

  /**
   * Check if a user has liked a comment
   */
  async hasLikedComment(userId: string, commentId: string) {
    const like = await db.like.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    return !!like;
  }
} 