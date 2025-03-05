# How-to-AI: Backend Infrastructure Documentation

This document provides comprehensive information about the backend infrastructure of the How-to-AI platform.

## Table of Contents

1. [Overview](#overview)
2. [Database](#database)
3. [Authentication System](#authentication-system)
4. [Subscription Management](#subscription-management)
5. [Logging System](#logging-system)
6. [Analytics System](#analytics-system)
7. [API Endpoints](#api-endpoints)
8. [Backup and Recovery](#backup-and-recovery)
9. [Setup and Deployment](#setup-and-deployment)
10. [Maintenance](#maintenance)

## Overview

The How-to-AI platform's backend is built using:

- **Node.js** with **TypeScript**
- **Next.js** for API routes and server-side rendering
- **PostgreSQL** database with **Prisma ORM**
- **JWT** for authentication
- Custom logging, analytics, and backup systems

## Database

### Schema

The database schema is defined in `prisma/schema.prisma` and includes the following core models:

- **User**: User accounts and authentication
- **Profile**: Extended user information
- **Tutorial**: Educational content
- **TutorialProgress**: User progress through tutorials
- **Achievement**: User achievements and badges
- **Post**: Community forum posts
- **Comment**: Comments on posts
- **Like**: User likes on posts and comments
- **ApiKey**: API keys for programmatic access
- **Subscription**: User subscription information
- **Invoice**: Payment records
- **UserAnalytics**: User behavior tracking
- **LoginHistory**: Authentication activity logging
- **BackupLog**: Database backup records
- **SystemLog**: System event logging

### Connection Management

Database connections are managed through the `src/lib/db.ts` module, which provides:

- A singleton Prisma client to prevent connection leaks
- Connection and disconnection methods for serverless environments
- Error handling wrapper for database operations

## Authentication System

Our authentication system is JWT-based and includes:

### Components

- **JWT**: JSON Web Tokens for secure, stateless authentication
- **Access Tokens**: Short-lived tokens (15 minutes) for API access
- **Refresh Tokens**: Long-lived tokens (7 days) for obtaining new access tokens
- **Middleware**: Route protection and role-based access control

### Endpoints

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Authenticate a user and issue tokens
- `POST /api/auth/logout`: Invalidate user tokens
- `POST /api/auth/refresh`: Issue a new access token using a refresh token

### Security Features

- Password hashing with bcrypt
- HTTP-only, secure cookies for token storage
- CSRF protection
- Rate limiting for authentication endpoints
- Comprehensive login activity logging

## Subscription Management

Our subscription system supports multiple tiers with flexible billing options:

### Subscription Tiers

- **Free**: Basic access to the platform
- **Premium**: Full access to all tutorials and features ($50/month)
- **Enterprise**: Custom solutions and support

### Payment Processing

The system integrates with payment providers for subscription management:

- **Stripe**: Primary payment processor
- **PayPal**: Alternative payment option

### Endpoints

- `GET /api/subscription`: Get user's current subscription
- `PUT /api/subscription`: Update or create a subscription

## Logging System

Our comprehensive logging system handles various types of events:

### Features

- Multiple log levels (debug, info, warning, error, critical)
- Contextual logging with metadata
- Console logging for development
- Database logging for production
- Error monitoring integration

### Usage

```typescript
import { logger } from '@/lib/logging';

// Basic logging
logger.info('User signed up');

// With context
logger.error('Payment failed', { 
  userId: 'user123', 
  error: error.message 
});
```

## Analytics System

The analytics system tracks user behavior and content engagement:

### Tracked Events

- Page views
- Feature usage
- Tutorial progress
- Content engagement (likes, comments)
- Subscription events

### Usage

```typescript
import { analytics } from '@/lib/analytics';

// Track page view
analytics.trackPageView(userId, '/tutorials/getting-started');

// Track tutorial progress
analytics.trackTutorialProgress(userId, 'tutorial123', 0.75, 300);
```

## API Endpoints

Our API follows RESTful principles with structured error handling:

### Core Endpoints

- **Authentication**: `/api/auth/*`
- **User Management**: `/api/users/*`
- **Tutorials**: `/api/tutorials/*`
- **Subscriptions**: `/api/subscription/*`
- **Community**: `/api/posts/*`, `/api/comments/*`

### API Security

- JWT authentication
- CORS configuration
- Input validation with Zod
- Rate limiting

## Backup and Recovery

Our database backup system ensures data safety and business continuity:

### Features

- Scheduled backups (daily, weekly, monthly)
- Cloud storage integration
- Backup verification
- Point-in-time recovery
- Retention policy management

### Commands

```bash
# Create a manual backup
npm run db:backup

# Restore from a backup file
npm run db:restore path/to/backup.sql
```

## Setup and Deployment

### Local Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables: `npm run setup:env:dev`
4. Run database migrations: `npm run db:migrate`
5. Seed the database: `npm run db:seed`
6. Start the development server: `npm run dev`

### Production Deployment

1. Set up environment variables: `npm run setup:env:prod`
2. Build the application: `npm run build`
3. Start the server: `npm run start`

## Maintenance

### Routine Tasks

- Database backups are performed automatically
- Logs are rotated and archived after 30 days
- Database migrations should be run after schema changes

### Monitoring

The application includes:

- Error tracking with contextual information
- Performance monitoring
- User analytics dashboard
- Subscription and revenue tracking

### Troubleshooting

Common issues and solutions:

1. **Database connection errors**: Check the DATABASE_URL in your .env file
2. **Authentication issues**: Verify JWT_SECRET is consistent across deployments
3. **Backup failures**: Ensure proper permissions for backup directory

---

## Further Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [JWT Authentication Guide](https://jwt.io/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) 