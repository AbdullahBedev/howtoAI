import { connectDb } from './db';
import { logger } from './logging';
import { backup } from './backup';
import { analytics } from './analytics';

export async function initializeBackend() {
  try {
    // Connect to database
    await connectDb();
    logger.info('Database connection established');

    // Initialize backup schedule if in production
    if (process.env.NODE_ENV === 'production') {
      backup.scheduleBackups();
      logger.info('Backup schedules initialized');
    }

    // Log successful initialization
    logger.info('Backend infrastructure initialized successfully', {
      environment: process.env.NODE_ENV,
      nodeVersion: process.version,
    });

    return true;
  } catch (error) {
    logger.critical('Failed to initialize backend infrastructure', { error });
    return false;
  }
}

// Function to gracefully shutdown services
export async function shutdownBackend() {
  try {
    // Add any cleanup needed
    logger.info('Backend infrastructure shutdown initiated');
    
    // Disconnect from database
    await import('./db').then(({ disconnectDb }) => disconnectDb());
    
    logger.info('Backend infrastructure shutdown completed');
    return true;
  } catch (error) {
    logger.error('Error during backend shutdown', { error });
    return false;
  }
} 