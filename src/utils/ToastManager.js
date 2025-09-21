/**
 * Toast Notification Manager
 * Manages toast notifications for user feedback and information
 *
 * @fileoverview Toast notification system with auto-dismiss and accessibility
 * @author jimitas.com
 * @version 1.0.0
 */

/**
 * Toast notification manager class
 * @class
 */
export class ToastManager {
  /**
   * Creates an instance of ToastManager
   * @constructor
   */
  constructor() {
    /** @type {HTMLElement} Toast container element */
    this.container = document.getElementById('toast-container');

    /** @type {number} Auto-dismiss timeout in milliseconds */
    this.defaultTimeout = 8000;

    /** @type {Map<string, HTMLElement>} Active toasts by ID */
    this.activeToasts = new Map();

    this.init();
  }

  /**
   * Initialize the toast manager
   * @private
   */
  init() {
    if (!this.container) {
      console.warn('Toast container not found. Creating fallback container.');
      this.createFallbackContainer();
    }
  }

  /**
   * Create fallback toast container if not found
   * @private
   */
  createFallbackContainer() {
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.className = 'position-fixed top-0 end-0 p-3';
    this.container.style.zIndex = '11';
    document.body.appendChild(this.container);
  }

  /**
   * Show a toast notification
   * @param {Object} options - Toast configuration options
   * @param {string} options.title - Toast title
   * @param {string} options.message - Toast message content
   * @param {string} [options.type='info'] - Toast type: 'success', 'warning', 'error', 'info'
   * @param {number} [options.timeout] - Auto-dismiss timeout in milliseconds
   * @param {boolean} [options.persistent=false] - If true, toast won't auto-dismiss
   * @param {string} [options.id] - Unique ID for the toast
   * @returns {string} Toast ID
   */
  show({
    title,
    message,
    type = 'info',
    timeout = this.defaultTimeout,
    persistent = false,
    id = this.generateId()
  }) {
    // Remove existing toast with same ID
    if (this.activeToasts.has(id)) {
      this.hide(id);
    }

    const toast = this.createToastElement({
      title,
      message,
      type,
      id,
      persistent
    });

    this.container.appendChild(toast);
    this.activeToasts.set(id, toast);

    // Trigger Bootstrap toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Auto-dismiss if not persistent
    if (!persistent && timeout > 0) {
      setTimeout(() => {
        this.hide(id);
      }, timeout);
    }

    // Clean up when hidden
    toast.addEventListener('hidden.bs.toast', () => {
      this.cleanup(id);
    });

    return id;
  }

  /**
   * Show welcome toast for first-time visitors
   * @returns {string|null} Toast ID or null if not shown
   */
  showWelcomeToast() {
    const hasVisited = localStorage.getItem('jimitas-motto-visited');

    if (hasVisited) {
      return null; // Don't show if user has visited before
    }

    // Mark as visited
    localStorage.setItem('jimitas-motto-visited', 'true');

    return this.show({
      id: 'welcome-toast',
      title: 'jimitas.com へようこそ！',
      message: `
        <p class="mb-2"><strong>地味に助かる学習コンテンツ</strong>をご利用いただき、ありがとうございます。</p>
        <div class="small text-muted">
          <p class="mb-1">📚 <strong>29個の学習モジュール</strong>で楽しく学習</p>
          <p class="mb-1">🎯 算数・英語・音楽・地理・美術に対応</p>
          <p class="mb-0">💡 上のメニューから学習したい項目を選んでください</p>
        </div>
      `,
      type: 'info',
      timeout: 12000,
      persistent: false
    });
  }

  /**
   * Show success toast
   * @param {string} title - Toast title
   * @param {string} message - Toast message
   * @param {Object} [options] - Additional options
   * @returns {string} Toast ID
   */
  success(title, message, options = {}) {
    return this.show({
      title,
      message,
      type: 'success',
      ...options
    });
  }

  /**
   * Show warning toast
   * @param {string} title - Toast title
   * @param {string} message - Toast message
   * @param {Object} [options] - Additional options
   * @returns {string} Toast ID
   */
  warning(title, message, options = {}) {
    return this.show({
      title,
      message,
      type: 'warning',
      ...options
    });
  }

  /**
   * Show error toast
   * @param {string} title - Toast title
   * @param {string} message - Toast message
   * @param {Object} [options] - Additional options
   * @returns {string} Toast ID
   */
  error(title, message, options = {}) {
    return this.show({
      title,
      message,
      type: 'error',
      persistent: true, // Errors should be persistent by default
      ...options
    });
  }

  /**
   * Show info toast
   * @param {string} title - Toast title
   * @param {string} message - Toast message
   * @param {Object} [options] - Additional options
   * @returns {string} Toast ID
   */
  info(title, message, options = {}) {
    return this.show({
      title,
      message,
      type: 'info',
      ...options
    });
  }

  /**
   * Hide a specific toast
   * @param {string} id - Toast ID
   */
  hide(id) {
    const toast = this.activeToasts.get(id);
    if (toast) {
      const bsToast = bootstrap.Toast.getOrCreateInstance(toast);
      bsToast.hide();
    }
  }

  /**
   * Hide all active toasts
   */
  hideAll() {
    this.activeToasts.forEach((toast, id) => {
      this.hide(id);
    });
  }

  /**
   * Create toast element
   * @param {Object} options - Toast options
   * @returns {HTMLElement} Toast element
   * @private
   */
  createToastElement({ title, message, type, id, persistent }) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = id;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    // Set toast styling based on type
    const typeClasses = {
      success: 'bg-success text-white',
      warning: 'bg-warning text-dark',
      error: 'bg-danger text-white',
      info: 'bg-info text-white'
    };

    const typeIcons = {
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-times-circle',
      info: 'fas fa-info-circle'
    };

    toast.classList.add(...(typeClasses[type] || typeClasses.info).split(' '));

    toast.innerHTML = `
      <div class="toast-header ${typeClasses[type] || typeClasses.info}">
        <i class="${typeIcons[type] || typeIcons.info} me-2" aria-hidden="true"></i>
        <strong class="me-auto">${title}</strong>
        <small class="text-muted opacity-75">今</small>
        ${!persistent ? '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="閉じる"></button>' : ''}
      </div>
      <div class="toast-body">
        ${message}
        ${persistent ? '<button type="button" class="btn btn-sm btn-outline-light mt-2" data-bs-dismiss="toast">閉じる</button>' : ''}
      </div>
    `;

    return toast;
  }

  /**
   * Generate unique ID for toast
   * @returns {string} Unique ID
   * @private
   */
  generateId() {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Cleanup toast after dismissal
   * @param {string} id - Toast ID
   * @private
   */
  cleanup(id) {
    const toast = this.activeToasts.get(id);
    if (toast && toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
    this.activeToasts.delete(id);
  }

  /**
   * Clear first-visit flag (for testing)
   */
  clearVisitedFlag() {
    localStorage.removeItem('jimitas-motto-visited');
  }

  /**
   * Get statistics about active toasts
   * @returns {Object} Toast statistics
   */
  getStats() {
    return {
      activeToasts: this.activeToasts.size,
      toastIds: Array.from(this.activeToasts.keys())
    };
  }
}

export default ToastManager;