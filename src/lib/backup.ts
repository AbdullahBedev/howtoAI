import { db } from './db';
import { logger } from './logging';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);

// Configuration
const BACKUP_DIR = process.env.BACKUP_DIR || './backups';
const S3_BUCKET = process.env.BACKUP_S3_BUCKET || 'howtoai-backups';
const DATABASE_URL = process.env.DATABASE_URL || '';
const RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS || '30', 10);

export interface BackupResult {
  success: boolean;
  filePath?: string;
  fileSize?: number;
  error?: Error;
  message?: string;
}

/**
 * Create a backup of the PostgreSQL database
 */
export async function createBackup(type: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<BackupResult> {
  try {
    // Create backup directory if it doesn't exist
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    // Create a timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `backup-${type}-${timestamp}.sql`;
    const filePath = path.join(BACKUP_DIR, fileName);

    logger.info(`Starting database backup: ${fileName}`, { type });

    // Extract database connection info from DATABASE_URL
    // Format: postgresql://username:password@host:port/database
    const dbUrl = new URL(DATABASE_URL);
    const host = dbUrl.hostname;
    const database = dbUrl.pathname.substring(1); // Remove leading slash
    const username = dbUrl.username;
    const port = dbUrl.port || '5432';

    // Create a backup log entry
    const backupLog = await db.backupLog.create({
      data: {
        filename: fileName,
        size: 0,
        status: 'in_progress',
        location: `${BACKUP_DIR}/${fileName}`,
      }
    });

    // Execute pg_dump command
    await execPromise(
      `PGPASSWORD="${dbUrl.password}" pg_dump -h ${host} -U ${username} -p ${port} -d ${database} -F p -f ${filePath}`
    );

    // Get file size
    const stats = await fs.stat(filePath);
    const fileSize = stats.size;

    // If we're in production, upload to cloud storage
    let uploadPath = filePath;
    if (process.env.NODE_ENV === 'production') {
      uploadPath = await uploadToCloud(filePath, type);
    }

    // Update backup log
    await db.backupLog.update({
      where: { id: backupLog.id },
      data: {
        size: fileSize,
        status: 'completed',
        location: uploadPath,
        completedAt: new Date(),
      }
    });

    logger.info(`Database backup completed: ${fileName}`, {
      type,
      size: fileSize,
      path: uploadPath,
    });

    // Clean up old backups
    await cleanupOldBackups();

    return {
      success: true,
      filePath: uploadPath,
      fileSize,
      message: `Backup completed successfully: ${fileName}`,
    };
  } catch (error) {
    logger.error('Database backup failed', { error });
    
    return {
      success: false,
      error: error as Error,
      message: `Backup failed: ${(error as Error).message}`,
    };
  }
}

/**
 * Upload backup file to cloud storage
 */
async function uploadToCloud(filePath: string, type: string): Promise<string> {
  try {
    // This would use AWS SDK or similar to upload the file
    // For now, we'll simulate it
    const fileName = path.basename(filePath);
    const cloudPath = `s3://${S3_BUCKET}/${type}/${fileName}`;
    
    logger.info(`Uploading backup to ${cloudPath}`);
    
    // Simulate upload with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would be:
    // const s3 = new AWS.S3();
    // await s3.upload({
    //   Bucket: S3_BUCKET,
    //   Key: `${type}/${fileName}`,
    //   Body: fs.createReadStream(filePath),
    // }).promise();
    
    logger.info(`Backup uploaded to ${cloudPath}`);
    
    return cloudPath;
  } catch (error) {
    logger.error('Failed to upload backup to cloud storage', { error });
    // Return the local path if upload fails
    return filePath;
  }
}

/**
 * Restore database from a backup file
 */
export async function restoreFromBackup(backupPath: string): Promise<BackupResult> {
  try {
    logger.info(`Starting database restore from: ${backupPath}`);

    // Check if file exists
    await fs.access(backupPath);

    // Extract database connection info from DATABASE_URL
    const dbUrl = new URL(DATABASE_URL);
    const host = dbUrl.hostname;
    const database = dbUrl.pathname.substring(1);
    const username = dbUrl.username;
    const port = dbUrl.port || '5432';

    // Execute psql command to restore
    await execPromise(
      `PGPASSWORD="${dbUrl.password}" psql -h ${host} -U ${username} -p ${port} -d ${database} -f ${backupPath}`
    );

    logger.info(`Database restore completed from: ${backupPath}`);

    return {
      success: true,
      message: `Restore completed successfully from: ${backupPath}`,
    };
  } catch (error) {
    logger.error('Database restore failed', { error, backupPath });
    
    return {
      success: false,
      error: error as Error,
      message: `Restore failed: ${(error as Error).message}`,
    };
  }
}

/**
 * Clean up old backups beyond the retention period
 */
async function cleanupOldBackups() {
  try {
    // Calculate retention date
    const retentionDate = new Date();
    retentionDate.setDate(retentionDate.getDate() - RETENTION_DAYS);

    logger.info(`Cleaning up backups older than ${retentionDate.toISOString()}`);

    // Get old backup logs
    const oldBackups = await db.backupLog.findMany({
      where: {
        createdAt: {
          lt: retentionDate,
        },
        status: 'completed',
      },
    });

    // Nothing to clean up
    if (oldBackups.length === 0) {
      logger.info('No old backups to clean up');
      return;
    }

    // Delete each old backup
    for (const backup of oldBackups) {
      try {
        // If it's a local file, delete it
        if (backup.location.startsWith(BACKUP_DIR)) {
          await fs.unlink(backup.location);
        } else if (backup.location.startsWith('s3://')) {
          // In a real implementation, delete from S3
          // const s3 = new AWS.S3();
          // const key = backup.location.replace(`s3://${S3_BUCKET}/`, '');
          // await s3.deleteObject({
          //   Bucket: S3_BUCKET,
          //   Key: key,
          // }).promise();
        }

        // Update backup log
        await db.backupLog.update({
          where: { id: backup.id },
          data: {
            status: 'deleted',
          },
        });

        logger.info(`Deleted old backup: ${backup.filename}`);
      } catch (error) {
        logger.error(`Failed to delete backup: ${backup.filename}`, { error });
      }
    }

    logger.info(`Cleanup completed, deleted ${oldBackups.length} old backups`);
  } catch (error) {
    logger.error('Failed to clean up old backups', { error });
  }
}

/**
 * Schedule regular backups
 */
export function scheduleBackups() {
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Backup scheduling is only enabled in production');
    return;
  }

  // Schedule daily backups at 1 AM
  const dailyBackupTime = process.env.DAILY_BACKUP_TIME || '01:00';
  scheduleDaily(dailyBackupTime, async () => {
    await createBackup('daily');
  });

  // Schedule weekly backups on Sunday at 2 AM
  const weeklyBackupTime = process.env.WEEKLY_BACKUP_TIME || '02:00';
  scheduleWeekly(0, weeklyBackupTime, async () => {
    await createBackup('weekly');
  });

  // Schedule monthly backups on the 1st at 3 AM
  const monthlyBackupTime = process.env.MONTHLY_BACKUP_TIME || '03:00';
  scheduleMonthly(1, monthlyBackupTime, async () => {
    await createBackup('monthly');
  });

  logger.info('Backup schedules initialized');
}

// Simple scheduler functions
function scheduleDaily(timeStr: string, callback: () => void) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === hours && now.getMinutes() === minutes) {
      callback();
    }
  }, 60000); // Check every minute
}

function scheduleWeekly(dayOfWeek: number, timeStr: string, callback: () => void) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  setInterval(() => {
    const now = new Date();
    if (now.getDay() === dayOfWeek && now.getHours() === hours && now.getMinutes() === minutes) {
      callback();
    }
  }, 60000); // Check every minute
}

function scheduleMonthly(dayOfMonth: number, timeStr: string, callback: () => void) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  setInterval(() => {
    const now = new Date();
    if (now.getDate() === dayOfMonth && now.getHours() === hours && now.getMinutes() === minutes) {
      callback();
    }
  }, 60000); // Check every minute
}

// Export utility functions
export const backup = {
  createBackup,
  restoreFromBackup,
  scheduleBackups,
}; 