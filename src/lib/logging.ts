import { db } from './db';

export type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'critical';

export interface LogContext {
  [key: string]: any;
}

export interface LogEntry {
  id?: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  source?: string;
  timestamp: Date;
  appVersion?: string;
  environment?: string;
}

export interface LogAggregation {
  count: number;
  level: LogLevel;
  source?: string;
  period: 'hour' | 'day' | 'week';
  startTime: Date;
  endTime: Date;
}

/**
 * Logs a message to the appropriate destination based on environment and level
 */
export async function log(
  level: LogLevel,
  message: string,
  context?: LogContext,
  source?: string
): Promise<LogEntry> {
  const timestamp = new Date();
  const environment = process.env.NODE_ENV || 'development';
  const appVersion = process.env.APP_VERSION || '1.0.0';
  
  // Prepare log entry for console output
  const logEntry: LogEntry = {
    level,
    message,
    context: context || {},
    source: source || 'application',
    timestamp,
    appVersion,
    environment,
  };

  // Always log to console
  consoleLog(level, message, context, source);

  // In production, also log to database
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DB_LOGGING === 'true') {
    try {
      const dbLogEntry = await dbLog(level, message, context, source);
      if (dbLogEntry?.id) {
        logEntry.id = dbLogEntry.id;
      }
    } catch (error) {
      console.error('Error writing to log database:', error);
    }
  }

  // If it's an error or critical, also log to error monitoring service
  if (level === 'error' || level === 'critical') {
    try {
      await errorMonitoringLog(level, message, context, source);
    } catch (error) {
      console.error('Error sending to error monitoring service:', error);
    }
  }

  return logEntry;
}

/**
 * Log to the console with appropriate formatting
 */
function consoleLog(
  level: LogLevel,
  message: string,
  context?: LogContext,
  source?: string
): void {
  const timestamp = new Date().toISOString();
  const logSource = source || 'application';
  
  // Create structured log format
  const structuredLog = {
    level: level.toUpperCase(),
    timestamp,
    source: logSource,
    message,
    ...(context ? { context } : {}),
  };

  const logMethods: Record<LogLevel, Function> = {
    debug: console.debug,
    info: console.info,
    warning: console.warn,
    error: console.error,
    critical: console.error,
  };

  const logFn = logMethods[level] || console.log;
  
  // In development, we can pretty print
  if (process.env.NODE_ENV === 'development') {
    logFn(`[${timestamp}] [${level.toUpperCase()}] [${logSource}] ${message}`);
    if (context) {
      logFn(JSON.stringify(context, null, 2));
    }
  } else {
    // In production, use JSON format for better parsing
    logFn(JSON.stringify(structuredLog));
  }
}

/**
 * Log to the database
 */
async function dbLog(
  level: LogLevel,
  message: string,
  context?: LogContext,
  source?: string
) {
  try {
    const environment = process.env.NODE_ENV || 'development';
    const appVersion = process.env.APP_VERSION || '1.0.0';
    
    // Create a data object that only includes prisma-compatible fields
    const logData = {
      level,
      message,
      context: context ? context : undefined,
      source: source || 'application',
    };
    
    // Add environment and appVersion to context if they don't exist there already
    if (context) {
      logData.context = {
        ...context,
        environment: context.environment || environment,
        appVersion: context.appVersion || appVersion,
      };
    } else {
      logData.context = { environment, appVersion };
    }
    
    return await db.systemLog.create({
      data: logData,
    });
  } catch (error) {
    console.error('Failed to write log to database:', error);
    // Don't throw here to prevent logging failures from affecting application flow
    return null;
  }
}

/**
 * Log to an error monitoring service (like Sentry)
 */
async function errorMonitoringLog(
  level: LogLevel,
  message: string,
  context?: LogContext,
  source?: string
): Promise<void> {
  // In a real implementation, this would integrate with a service like Sentry
  // For now, we'll just simulate it with a log
  console.error(`[ERROR MONITORING] [${level.toUpperCase()}] [${source || 'application'}] ${message}`);
  
  // Example Sentry integration would be:
  // Sentry.captureMessage(message, {
  //   level: level === 'critical' ? 'fatal' : level,
  //   tags: { source, environment: process.env.NODE_ENV },
  //   extra: context,
  // });
}

/**
 * Get recent logs with filtering
 */
export async function getRecentLogs(options?: {
  level?: LogLevel;
  source?: string;
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
}) {
  const { level, source, limit = 100, offset = 0, startDate, endDate } = options || {};
  
  const where: any = {};
  
  if (level) {
    where.level = level;
  }
  
  if (source) {
    where.source = source;
  }
  
  if (startDate || endDate) {
    where.createdAt = {};
    
    if (startDate) {
      where.createdAt.gte = startDate;
    }
    
    if (endDate) {
      where.createdAt.lte = endDate;
    }
  }
  
  const [logs, count] = await Promise.all([
    db.systemLog.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    }),
    db.systemLog.count({ where }),
  ]);
  
  return {
    logs,
    count,
    limit,
    offset,
  };
}

/**
 * Get log aggregation statistics
 */
export async function getLogAggregations(options?: {
  level?: LogLevel;
  source?: string;
  period?: 'hour' | 'day' | 'week';
  startDate?: Date;
  endDate?: Date;
}) {
  const { level, source, period = 'day', startDate, endDate } = options || {};
  
  const where: any = {};
  
  if (level) {
    where.level = level;
  }
  
  if (source) {
    where.source = source;
  }
  
  let interval: string;
  if (period === 'hour') {
    interval = '1 hour';
  } else if (period === 'week') {
    interval = '1 week';
  } else {
    interval = '1 day';
  }
  
  const timeGroup = period === 'hour' 
    ? `date_trunc('hour', "createdAt")`
    : period === 'week'
      ? `date_trunc('week', "createdAt")`
      : `date_trunc('day', "createdAt")`;
  
  const startTimeFilter = startDate ? `AND "createdAt" >= '${startDate.toISOString()}'` : '';
  const endTimeFilter = endDate ? `AND "createdAt" <= '${endDate.toISOString()}'` : '';
  const sourceFilter = source ? `AND source = '${source}'` : '';
  const levelFilter = level ? `AND level = '${level}'` : '';
  
  try {
    const aggregations = await db.$queryRaw`
      SELECT 
        ${timeGroup} as period_start,
        ${timeGroup} + interval '${interval}' as period_end,
        level,
        source,
        COUNT(*) as count
      FROM "SystemLog"
      WHERE TRUE ${startTimeFilter} ${endTimeFilter} ${sourceFilter} ${levelFilter}
      GROUP BY ${timeGroup}, level, source
      ORDER BY ${timeGroup} DESC, level
    `;
    
    return aggregations as LogAggregation[];
  } catch (error) {
    console.error('Failed to get log aggregations:', error);
    return [];
  }
}

/**
 * Get most frequent error messages
 */
export async function getFrequentErrors(options?: {
  days?: number;
  limit?: number;
}) {
  const { days = 7, limit = 10 } = options || {};
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  try {
    const frequentErrors = await db.$queryRaw`
      SELECT 
        message,
        COUNT(*) as count,
        MIN("createdAt") as first_seen,
        MAX("createdAt") as last_seen
      FROM "SystemLog"
      WHERE 
        level IN ('error', 'critical')
        AND "createdAt" >= ${startDate}
      GROUP BY message
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    
    return frequentErrors;
  } catch (error) {
    console.error('Failed to get frequent errors:', error);
    return [];
  }
}

// Convenience methods for different log levels
export const logger = {
  debug: (message: string, context?: LogContext, source?: string) => 
    log('debug', message, context, source),
  
  info: (message: string, context?: LogContext, source?: string) => 
    log('info', message, context, source),
  
  warning: (message: string, context?: LogContext, source?: string) => 
    log('warning', message, context, source),
  
  error: (message: string, context?: LogContext, source?: string) => 
    log('error', message, context, source),
  
  critical: (message: string, context?: LogContext, source?: string) => 
    log('critical', message, context, source),
    
  getRecentLogs,
  getLogAggregations,
  getFrequentErrors,
}; 