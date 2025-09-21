/**
 * Base class for all learning modules
 * Provides common functionality like DOM manipulation, sound handling, and cleanup
 */
import * as se from '../../se.js';

export class BaseModule {
  constructor(moduleId, title) {
    this.moduleId = moduleId;
    this.title = title;
    this.contentElement = null;
    this.headerElement = null;
    this.sounds = [];
    this.eventListeners = [];
  }

  /**
   * Initialize the module
   */
  async init() {
    try {
      this.playNavigationSound();
      this.clearContent();
      this.setTitle();
      this.contentElement = document.getElementById("content");
      this.headerElement = document.getElementById("header");
      await this.render();
      this.closeMenu();
    } catch (error) {
      console.error(`Error initializing module ${this.moduleId}:`, error);
      this.showError('モジュールの読み込みに失敗しました。');
    }
  }

  /**
   * Clear existing content
   */
  clearContent() {
    const header = document.getElementById("header");
    const content = document.getElementById("content");

    this.clearElement(header);
    this.clearElement(content);
  }

  /**
   * Helper method to clear DOM element
   */
  clearElement(element) {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }

  /**
   * Set the module title
   */
  setTitle() {
    const titleElement = document.getElementById("title");
    if (titleElement) {
      titleElement.innerHTML = this.title;
    }
  }

  /**
   * Play navigation sound
   */
  playNavigationSound() {
    try {
      se.pi.currentTime = 0;
      se.pi.play();
    } catch (error) {
      console.warn('Could not play navigation sound:', error);
    }
  }

  /**
   * Close hamburger menu
   */
  closeMenu() {
    try {
      $("#menubar_hdr").removeClass("ham");
      $("#menubar").removeClass("db");
    } catch (error) {
      console.warn('Could not close menu:', error);
    }
  }

  /**
   * Create a button element with common styling
   */
  createButton(text, className = 'btn btn-primary', onClick = null) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.className = className;

    if (onClick) {
      button.addEventListener("click", onClick);
      this.eventListeners.push({ element: button, event: 'click', handler: onClick });
    }

    return button;
  }

  /**
   * Create a div element with optional classes and content
   */
  createDiv(content = '', className = '') {
    const div = document.createElement("div");
    if (content) div.innerHTML = content;
    if (className) div.className = className;
    return div;
  }

  /**
   * Create a table element
   */
  createTable(id = '', className = '') {
    const table = document.createElement("table");
    if (id) table.id = id;
    if (className) table.className = className;
    return table;
  }

  /**
   * Register a sound for cleanup later
   */
  registerSound(sound) {
    this.sounds.push(sound);
    return sound;
  }

  /**
   * Show error message to user
   */
  showError(message) {
    const errorDiv = this.createDiv(message, 'alert alert-danger');
    if (this.contentElement) {
      this.contentElement.appendChild(errorDiv);
    }
  }

  /**
   * Show success message to user
   */
  showSuccess(message) {
    const successDiv = this.createDiv(message, 'alert alert-success');
    if (this.contentElement) {
      this.contentElement.appendChild(successDiv);
    }
  }

  /**
   * Clean up resources when module is unloaded
   */
  cleanup() {
    // Remove event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];

    // Stop and cleanup sounds
    this.sounds.forEach(sound => {
      if (sound && typeof sound.unload === 'function') {
        sound.unload();
      }
    });
    this.sounds = [];
  }

  /**
   * Abstract method - must be implemented by subclasses
   */
  async render() {
    throw new Error('render() method must be implemented by subclasses');
  }
}