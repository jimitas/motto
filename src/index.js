/**
 * Refactored Main Application Entry Point
 * Uses configuration-driven architecture instead of hardcoded switch statements
 *
 * @fileoverview Main application class for the motto learning content system
 * @author jimitas.com
 * @version 2.0.0
 */
import { ModuleManager } from './utils/ModuleManager.js';
import { getModuleIds, moduleConfig } from './config/modules.js';
import { ConfigValidator } from './utils/ConfigValidator.js';
import * as se from '../se.js';

/**
 * Main Application class that manages the learning modules
 * @class
 */
class Application {
  /**
   * Creates an instance of Application
   * @constructor
   */
  constructor() {
    /** @type {ModuleManager} Module manager instance */
    this.moduleManager = new ModuleManager();

    /** @type {string[]} Array of available module IDs */
    this.moduleIds = getModuleIds();

    /** @type {boolean} Initialization status */
    this.initialized = false;
  }

  /**
   * Initialize the application with error handling
   * @async
   * @returns {Promise<void>}
   * @throws {Error} When application initialization fails
   */
  async init() {
    try {
      // Validate configuration first
      await this.validateConfiguration();

      // Preload sound effects
      this.loadSounds();

      // Scroll to top
      $("html,body").animate({ scrollTop: 0 }, "1");

      // Setup menu event listeners
      this.setupMenuListeners();

      // Preload some modules for better performance
      await this.preloadCriticalModules();

      this.initialized = true;
      console.log('Application initialized successfully');

    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.showInitializationError(error);
    }
  }

  /**
   * Load and initialize sound effects with error handling
   * @returns {void}
   */
  loadSounds() {
    const sounds = [se.pi, se.set, se.seikai1, se.seikai2, se.reset, se.right, se.move1, se.move2, se.alert];

    sounds.forEach(sound => {
      try {
        if (sound && typeof sound.load === 'function') {
          sound.load();
        }
      } catch (error) {
        console.warn('Failed to load sound:', error);
      }
    });
  }

  /**
   * Setup event listeners for menu items with keyboard accessibility
   * @returns {void}
   */
  setupMenuListeners() {
    this.moduleIds.forEach(moduleId => {
      const menuElement = document.getElementById(moduleId);

      if (menuElement) {
        // Click event
        menuElement.addEventListener("click", async (event) => {
          event.preventDefault();
          await this.loadModule(moduleId, menuElement.innerHTML);
        });

        // Keyboard accessibility - Enter and Space keys
        menuElement.addEventListener("keydown", async (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            await this.loadModule(moduleId, menuElement.innerHTML);
          }
        });

        // Add focus styles
        menuElement.addEventListener("focus", () => {
          menuElement.style.outline = "2px solid #007bff";
          menuElement.style.outlineOffset = "2px";
        });

        menuElement.addEventListener("blur", () => {
          menuElement.style.outline = "";
          menuElement.style.outlineOffset = "";
        });
      } else {
        console.warn(`Menu element not found for module: ${moduleId}`);
      }
    });
  }

  /**
   * Load a module by ID with error handling and history management
   * @async
   * @param {string} moduleId - The ID of the module to load
   * @param {string} title - The display title of the module
   * @returns {Promise<void>}
   */
  async loadModule(moduleId, title) {
    if (!this.initialized) {
      console.warn('Application not fully initialized yet');
      return;
    }

    try {
      await this.moduleManager.loadModule(moduleId);

      // Update browser history
      this.updateHistory(moduleId, title);

    } catch (error) {
      console.error(`Failed to load module ${moduleId}:`, error);
      this.showModuleLoadError(moduleId, error);
    }
  }

  /**
   * Preload critical modules that are commonly used for better performance
   * @async
   * @returns {Promise<void>}
   */
  async preloadCriticalModules() {
    const criticalModules = ['cren', 'enwo', 'kuku', 'roma']; // Most commonly used
    await this.moduleManager.preloadModules(criticalModules);
  }

  /**
   * Update browser history for better navigation
   * @param {string} moduleId - The module ID to add to history
   * @param {string} title - The module title for the history entry
   * @returns {void}
   */
  updateHistory(moduleId, title) {
    try {
      const url = new URL(window.location);
      url.searchParams.set('module', moduleId);
      window.history.pushState({ moduleId, title }, title, url);
    } catch (error) {
      console.warn('Failed to update history:', error);
    }
  }

  /**
   * Handle browser back/forward navigation and initial URL params
   * @returns {void}
   */
  setupHistoryNavigation() {
    window.addEventListener('popstate', async (event) => {
      if (event.state && event.state.moduleId) {
        await this.loadModule(event.state.moduleId, event.state.title);
      }
    });

    // Handle initial load with module parameter
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = urlParams.get('module');
    if (moduleId && this.moduleIds.includes(moduleId)) {
      this.loadModule(moduleId, moduleId);
    }
  }

  /**
   * Show initialization error with better UX
   * @param {Error} error - The error that occurred
   */
  showInitializationError(error) {
    const content = document.getElementById("content");
    const title = document.getElementById("title");

    if (title) {
      title.textContent = 'エラーが発生しました';
    }

    if (content) {
      content.innerHTML = `
        <div class="alert alert-danger" role="alert" aria-live="assertive">
          <h3>アプリケーションの初期化エラー</h3>
          <p>アプリケーションの読み込みに失敗しました。インターネット接続を確認してください。</p>
          <details class="mt-2">
            <summary>技術的な詳細</summary>
            <p class="mt-2 text-muted">エラー詳細: ${error.message}</p>
          </details>
          <div class="mt-3">
            <button class="btn btn-primary me-2" onclick="location.reload()"
                    aria-label="ページを再読み込みして問題を解決する">
              <i class="fas fa-redo" aria-hidden="true"></i> ページを再読み込み
            </button>
            <button class="btn btn-outline-secondary" onclick="window.history.back()"
                    aria-label="前のページに戻る">
              <i class="fas fa-arrow-left" aria-hidden="true"></i> 戻る
            </button>
          </div>
        </div>
      `;
    }
  }

  /**
   * Show module load error with retry functionality
   * @param {string} moduleId - The ID of the module that failed to load
   * @param {Error} error - The error that occurred
   */
  showModuleLoadError(moduleId, error) {
    const content = document.getElementById("content");
    const title = document.getElementById("title");

    if (title) {
      title.textContent = `エラー: ${moduleId}`;
    }

    if (content) {
      content.innerHTML = `
        <div class="alert alert-warning" role="alert" aria-live="assertive">
          <h3>モジュール読み込みエラー</h3>
          <p>「${moduleId}」の読み込みに失敗しました。</p>
          <p class="mb-3">インターネット接続を確認してから、もう一度お試しください。</p>
          <details class="mt-2">
            <summary>技術的な詳細</summary>
            <p class="mt-2 text-muted">エラー詳細: ${error.message}</p>
          </details>
          <div class="mt-3">
            <button class="btn btn-primary me-2" onclick="mottoApp.loadModule('${moduleId}', '${moduleId}')"
                    aria-label="${moduleId}モジュールを再試行">
              <i class="fas fa-redo" aria-hidden="true"></i> 再試行
            </button>
            <button class="btn btn-outline-secondary me-2" onclick="location.reload()"
                    aria-label="ページを再読み込み">
              <i class="fas fa-refresh" aria-hidden="true"></i> ページを再読み込み
            </button>
            <button class="btn btn-outline-info" onclick="window.location.href='index.html'"
                    aria-label="メインメニューに戻る">
              <i class="fas fa-home" aria-hidden="true"></i> メニューに戻る
            </button>
          </div>
        </div>
      `;
    }
  }

  /**
   * Validate application configuration
   * @async
   * @returns {Promise<void>}
   * @throws {Error} When configuration is invalid
   */
  async validateConfiguration() {
    try {
      const validation = ConfigValidator.validateConfig(moduleConfig);

      if (!validation.isValid) {
        console.error('Configuration validation failed:', validation.errors);
        throw new Error(`Configuration errors: ${validation.errors.join(', ')}`);
      }

      if (validation.warnings.length > 0) {
        console.warn('Configuration warnings:', validation.warnings);
      }

      // Validate module dependencies (async check)
      const depValidation = await ConfigValidator.validateModuleDependencies(moduleConfig);
      if (!depValidation.isValid) {
        console.error('Module dependency validation failed:', depValidation.errors);
        // Don't throw for dependency errors, just warn
        console.warn('Some modules may not load correctly');
      }

    } catch (error) {
      console.error('Configuration validation error:', error);
      throw error;
    }
  }

  /**
   * Get application statistics for debugging
   * @returns {{initialized: boolean, totalModules: number, loadedModules: number, moduleIds: string[]}} Application statistics
   */
  getStats() {
    return {
      initialized: this.initialized,
      totalModules: this.moduleIds.length,
      loadedModules: this.moduleManager.getLoadedModules().length,
      moduleIds: this.moduleIds,
      configStats: ConfigValidator.getConfigStats(moduleConfig)
    };
  }

  /**
   * Get detailed health report for debugging
   * @async
   * @returns {Promise<Object>} Detailed health report
   */
  async getHealthReport() {
    return await ConfigValidator.generateHealthReport(moduleConfig);
  }
}

// Initialize application when DOM is loaded
const app = new Application();

// Initialize on window load
window.onload = async function() {
  await app.init();
  app.setupHistoryNavigation();
};

// Make app available globally for debugging
window.mottoApp = app;

export default app;