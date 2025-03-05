import { initializeBackend, shutdownBackend } from '@/lib/backend-init';
import { logger } from '@/lib/logging';

// Initialization state
let isInitialized = false;

/**
 * Initialize backend services on app startup
 */
export async function initialize() {
  if (isInitialized) {
    logger.info('Backend already initialized, skipping initialization');
    return true;
  }

  try {
    const success = await initializeBackend();
    isInitialized = success;
    
    // Register shutdown handler
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down');
      await shutdownBackend();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down');
      await shutdownBackend();
      process.exit(0);
    });

    return success;
  } catch (error) {
    logger.critical('Unhandled error during backend initialization', { error });
    return false;
  }
}

// Initialize backend on import in development
// In production, this should be called by a startup script
if (process.env.NODE_ENV !== 'production') {
  initialize().catch(error => {
    console.error('Failed to initialize backend:', error);
  });
} 