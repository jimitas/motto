/**
 * Logger utility for error handling and debugging
 * Provides centralized logging with different levels and user notifications
 */

export class Logger {
  constructor() {
    this.logLevel = this.getLogLevel();
    this.logs = [];
    this.maxLogs = 100; // Keep only the latest 100 logs
  }

  /**
   * Get log level from localStorage or use default
   */
  getLogLevel() {
    try {
      const saved = localStorage.getItem('motto-log-level');
      return saved || 'warn';
    } catch {
      return 'warn';
    }
  }

  /**
   * Set log level and save to localStorage
   */
  setLogLevel(level) {
    const validLevels = ['debug', 'info', 'warn', 'error'];
    if (validLevels.includes(level)) {
      this.logLevel = level;
      try {
        localStorage.setItem('motto-log-level', level);
      } catch (error) {
        console.warn('Could not save log level to localStorage:', error);
      }
    }
  }

  /**
   * Check if log level should be output
   */
  shouldLog(level) {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.logLevel];
  }

  /**
   * Add log entry to internal storage
   */
  addLog(level, message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.logs.push(logEntry);

    // Keep only the latest logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    return logEntry;
  }

  /**
   * Debug logging
   */
  debug(message, data = null) {
    if (!this.shouldLog('debug')) return;

    console.debug(`[MOTTO DEBUG] ${message}`, data || '');
    this.addLog('debug', message, data);
  }

  /**
   * Info logging
   */
  info(message, data = null) {
    if (!this.shouldLog('info')) return;

    console.info(`[MOTTO INFO] ${message}`, data || '');
    this.addLog('info', message, data);
  }

  /**
   * Warning logging
   */
  warn(message, data = null) {
    if (!this.shouldLog('warn')) return;

    console.warn(`[MOTTO WARN] ${message}`, data || '');
    this.addLog('warn', message, data);
  }

  /**
   * Error logging with user notification
   */
  error(message, error = null, options = {}) {
    const logEntry = this.addLog('error', message, {
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : null
    });

    console.error(`[MOTTO ERROR] ${message}`, error || '');

    // Show user notification if requested
    if (options.notify !== false) {
      this.notifyUser('error', message, options);
    }

    // Report error if reporting is enabled
    if (options.report !== false) {
      this.reportError(logEntry);
    }
  }

  /**
   * Notify user of errors or important information
   */
  notifyUser(type, message, options = {}) {
    try {
      const notification = this.createNotification(type, message, options);
      document.body.appendChild(notification);

      // Auto-remove after delay
      const delay = options.autoClose !== false ? (options.delay || 5000) : 0;
      if (delay > 0) {
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, delay);
      }
    } catch (error) {
      console.error('Failed to show user notification:', error);
    }
  }

  /**
   * Create notification element
   */
  createNotification(type, message, options = {}) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const typeClasses = {
      error: 'alert alert-danger',
      warning: 'alert alert-warning',
      success: 'alert alert-success',
      info: 'alert alert-info'
    };

    notification.className = typeClasses[type] || typeClasses.info;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
      padding: 15px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideInRight 0.3s ease-out;
    `;

    const content = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="flex-grow: 1; margin-right: 10px;">
          <strong>${this.getTypeIcon(type)} ${this.getTypeTitle(type)}</strong>
          <div style="margin-top: 5px;">${message}</div>
        </div>
        <button onclick="this.parentNode.parentNode.remove()"
                style="background: none; border: none; font-size: 18px; cursor: pointer; color: inherit;">
          ×
        </button>
      </div>
    `;

    notification.innerHTML = content;
    return notification;
  }

  /**
   * Get icon for notification type
   */
  getTypeIcon(type) {
    const icons = {
      error: '⚠️',
      warning: '⚡',
      success: '✅',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  /**
   * Get title for notification type
   */
  getTypeTitle(type) {
    const titles = {
      error: 'エラー',
      warning: '警告',
      success: '成功',
      info: '情報'
    };
    return titles[type] || titles.info;
  }

  /**
   * Report error to external service (optional)
   */
  async reportError(logEntry) {
    // Only report in production and if user has opted in
    if (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1') {
      return;
    }

    try {
      // This would send to an error reporting service
      // Implementation depends on your error reporting setup
      console.log('Would report error:', logEntry);
    } catch (error) {
      console.warn('Failed to report error:', error);
    }
  }

  /**
   * Get all logs
   */
  getLogs(level = null) {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs() {
    return JSON.stringify({
      logs: this.logs,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }, null, 2);
  }

  /**
   * Handle uncaught errors
   */
  setupGlobalErrorHandler() {
    window.addEventListener('error', (event) => {
      this.error('Uncaught JavaScript error', event.error, {
        notify: true,
        report: true
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled promise rejection', event.reason, {
        notify: true,
        report: true
      });
    });
  }

  /**
   * Performance logging
   */
  time(label) {
    performance.mark(`${label}-start`);
  }

  timeEnd(label) {
    try {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);

      const measures = performance.getEntriesByName(label, 'measure');
      if (measures.length > 0) {
        const duration = measures[measures.length - 1].duration;
        this.debug(`Performance: ${label} took ${duration.toFixed(2)}ms`);
      }
    } catch (error) {
      this.warn('Failed to measure performance', error);
    }
  }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
`;
document.head.appendChild(style);

// Create singleton instance
export const logger = new Logger();

// Setup global error handling
logger.setupGlobalErrorHandler();