/**
 * Module Manager - handles loading and switching between learning modules
 */
import { moduleConfig } from '../config/modules.js';

export class ModuleManager {
  constructor() {
    this.currentModule = null;
    this.loadedModules = new Map();
  }

  /**
   * Load and execute a module by ID
   */
  async loadModule(moduleId) {
    try {
      const config = moduleConfig[moduleId];

      if (!config) {
        throw new Error(`Module ${moduleId} not found in configuration`);
      }

      // Cleanup current module if exists
      if (this.currentModule && typeof this.currentModule.cleanup === 'function') {
        this.currentModule.cleanup();
      }

      // Check if module is already loaded
      if (this.loadedModules.has(moduleId)) {
        const module = this.loadedModules.get(moduleId);
        await this.executeModule(module, config);
        return;
      }

      // Dynamic import of the module
      const moduleExport = await config.module();
      const moduleFunction = moduleExport[moduleId];

      if (typeof moduleFunction !== 'function') {
        throw new Error(`Module ${moduleId} does not export a function named ${moduleId}`);
      }

      // Cache the module
      this.loadedModules.set(moduleId, moduleFunction);

      // Execute the module
      await this.executeModule(moduleFunction, config);

    } catch (error) {
      console.error(`Failed to load module ${moduleId}:`, error);
      this.showModuleError(moduleId, error.message);
    }
  }

  /**
   * Execute a loaded module
   */
  async executeModule(moduleFunction, config) {
    try {
      // If the module function is a class constructor, instantiate it
      if (this.isClass(moduleFunction)) {
        this.currentModule = new moduleFunction(config.id, config.title);
        if (typeof this.currentModule.init === 'function') {
          await this.currentModule.init();
        }
      } else {
        // Traditional function-based module
        this.currentModule = { cleanup: () => {} }; // Minimal interface
        await moduleFunction();
      }
    } catch (error) {
      console.error(`Failed to execute module ${config.id}:`, error);
      this.showModuleError(config.id, error.message);
    }
  }

  /**
   * Check if a function is a class constructor
   */
  isClass(func) {
    return typeof func === 'function' &&
           func.prototype &&
           func.prototype.constructor === func &&
           func.toString().startsWith('class');
  }

  /**
   * Show error message when module fails to load
   */
  showModuleError(moduleId, errorMessage) {
    const content = document.getElementById("content");
    const title = document.getElementById("title");

    if (title) {
      title.innerHTML = `エラー: ${moduleId}`;
    }

    if (content) {
      content.innerHTML = `
        <div class="alert alert-danger">
          <h4>モジュールの読み込みエラー</h4>
          <p>モジュール「${moduleId}」の読み込みに失敗しました。</p>
          <p>エラー詳細: ${errorMessage}</p>
          <button class="btn btn-primary" onclick="location.reload()">ページを再読み込み</button>
        </div>
      `;
    }
  }

  /**
   * Get all loaded modules
   */
  getLoadedModules() {
    return Array.from(this.loadedModules.keys());
  }

  /**
   * Clear all loaded modules from cache
   */
  clearCache() {
    this.loadedModules.clear();
  }

  /**
   * Preload modules for better performance
   */
  async preloadModules(moduleIds) {
    const promises = moduleIds.map(async (moduleId) => {
      try {
        const config = moduleConfig[moduleId];
        if (config && !this.loadedModules.has(moduleId)) {
          const moduleExport = await config.module();
          this.loadedModules.set(moduleId, moduleExport[moduleId]);
        }
      } catch (error) {
        console.warn(`Failed to preload module ${moduleId}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }
}