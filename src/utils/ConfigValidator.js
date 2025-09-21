/**
 * Configuration Validator
 * Validates module configuration and provides type checking
 *
 * @fileoverview Validation utilities for module configuration
 * @author jimitas.com
 * @version 1.0.0
 */

/**
 * Valid categories for learning modules
 * @type {Set<string>}
 */
const VALID_CATEGORIES = new Set([
  'language',
  'math',
  'music',
  'geography',
  'art',
  'science'
]);

/**
 * Configuration validator class
 * @class
 */
export class ConfigValidator {
  /**
   * Validate a single module configuration
   * @param {string} moduleId - The module ID
   * @param {Object} config - The module configuration object
   * @returns {{isValid: boolean, errors: string[]}} Validation result
   */
  static validateModule(moduleId, config) {
    const errors = [];

    // Check required fields
    if (!config.id || typeof config.id !== 'string') {
      errors.push(`Module ${moduleId}: 'id' is required and must be a string`);
    }

    if (!config.title || typeof config.title !== 'string') {
      errors.push(`Module ${moduleId}: 'title' is required and must be a string`);
    }

    if (!config.module || typeof config.module !== 'function') {
      errors.push(`Module ${moduleId}: 'module' is required and must be a function`);
    }

    if (!config.category || typeof config.category !== 'string') {
      errors.push(`Module ${moduleId}: 'category' is required and must be a string`);
    } else if (!VALID_CATEGORIES.has(config.category)) {
      errors.push(`Module ${moduleId}: 'category' must be one of: ${Array.from(VALID_CATEGORIES).join(', ')}`);
    }

    // Check ID consistency
    if (config.id && config.id !== moduleId) {
      errors.push(`Module ${moduleId}: config.id '${config.id}' does not match key '${moduleId}'`);
    }

    // Check for valid title (not empty, reasonable length)
    if (config.title && (config.title.length === 0 || config.title.length > 100)) {
      errors.push(`Module ${moduleId}: title must be between 1 and 100 characters`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate the entire module configuration object
   * @param {Object} moduleConfig - The complete module configuration
   * @returns {{isValid: boolean, errors: string[], warnings: string[]}} Validation result
   */
  static validateConfig(moduleConfig) {
    const errors = [];
    const warnings = [];

    if (!moduleConfig || typeof moduleConfig !== 'object') {
      return {
        isValid: false,
        errors: ['moduleConfig must be an object'],
        warnings: []
      };
    }

    const moduleIds = Object.keys(moduleConfig);

    // Check for empty configuration
    if (moduleIds.length === 0) {
      warnings.push('No modules defined in configuration');
    }

    // Validate each module
    for (const moduleId of moduleIds) {
      const config = moduleConfig[moduleId];
      const result = this.validateModule(moduleId, config);

      if (!result.isValid) {
        errors.push(...result.errors);
      }
    }

    // Check for duplicate titles
    const titles = new Set();
    const duplicateTitles = new Set();

    for (const config of Object.values(moduleConfig)) {
      if (config.title) {
        if (titles.has(config.title)) {
          duplicateTitles.add(config.title);
        }
        titles.add(config.title);
      }
    }

    if (duplicateTitles.size > 0) {
      warnings.push(`Duplicate titles found: ${Array.from(duplicateTitles).join(', ')}`);
    }

    // Check category distribution
    const categoryCount = {};
    for (const config of Object.values(moduleConfig)) {
      if (config.category) {
        categoryCount[config.category] = (categoryCount[config.category] || 0) + 1;
      }
    }

    for (const [category, count] of Object.entries(categoryCount)) {
      if (count > 15) {
        warnings.push(`Category '${category}' has ${count} modules, consider splitting`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate module dependencies and imports
   * @param {Object} moduleConfig - The module configuration
   * @returns {Promise<{isValid: boolean, errors: string[]}>} Async validation result
   */
  static async validateModuleDependencies(moduleConfig) {
    const errors = [];

    for (const [moduleId, config] of Object.entries(moduleConfig)) {
      try {
        // Test if the module can be imported
        if (config.module && typeof config.module === 'function') {
          // This is a dry run - we don't actually execute the module
          const modulePromise = config.module();

          // Check if it returns a Promise
          if (!(modulePromise instanceof Promise)) {
            errors.push(`Module ${moduleId}: module function must return a Promise (use dynamic import)`);
          }
        }
      } catch (error) {
        errors.push(`Module ${moduleId}: failed to create import promise - ${error.message}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get configuration statistics
   * @param {Object} moduleConfig - The module configuration
   * @returns {Object} Configuration statistics
   */
  static getConfigStats(moduleConfig) {
    const stats = {
      totalModules: 0,
      categories: {},
      averageTitleLength: 0,
      longestTitle: '',
      shortestTitle: ''
    };

    if (!moduleConfig || typeof moduleConfig !== 'object') {
      return stats;
    }

    const modules = Object.values(moduleConfig);
    stats.totalModules = modules.length;

    let totalTitleLength = 0;
    let longestTitle = '';
    let shortestTitle = modules[0]?.title || '';

    for (const config of modules) {
      // Count categories
      if (config.category) {
        stats.categories[config.category] = (stats.categories[config.category] || 0) + 1;
      }

      // Title statistics
      if (config.title) {
        totalTitleLength += config.title.length;

        if (config.title.length > longestTitle.length) {
          longestTitle = config.title;
        }

        if (config.title.length < shortestTitle.length) {
          shortestTitle = config.title;
        }
      }
    }

    stats.averageTitleLength = modules.length > 0 ? Math.round(totalTitleLength / modules.length) : 0;
    stats.longestTitle = longestTitle;
    stats.shortestTitle = shortestTitle;

    return stats;
  }

  /**
   * Generate a configuration health report
   * @param {Object} moduleConfig - The module configuration
   * @returns {Promise<Object>} Health report
   */
  static async generateHealthReport(moduleConfig) {
    const validation = this.validateConfig(moduleConfig);
    const dependencyValidation = await this.validateModuleDependencies(moduleConfig);
    const stats = this.getConfigStats(moduleConfig);

    return {
      timestamp: new Date().toISOString(),
      validation: {
        isValid: validation.isValid && dependencyValidation.isValid,
        errors: [...validation.errors, ...dependencyValidation.errors],
        warnings: validation.warnings
      },
      statistics: stats,
      recommendations: this.generateRecommendations(stats, validation)
    };
  }

  /**
   * Generate recommendations based on configuration analysis
   * @param {Object} stats - Configuration statistics
   * @param {Object} validation - Validation results
   * @returns {string[]} Array of recommendations
   */
  static generateRecommendations(stats, validation) {
    const recommendations = [];

    // Module count recommendations
    if (stats.totalModules === 0) {
      recommendations.push('Add learning modules to the configuration');
    } else if (stats.totalModules > 50) {
      recommendations.push('Consider organizing modules into sub-categories for better navigation');
    }

    // Category balance recommendations
    const categoryEntries = Object.entries(stats.categories);
    if (categoryEntries.length === 1) {
      recommendations.push('Consider adding modules from other subject categories for variety');
    }

    const maxCategoryCount = Math.max(...Object.values(stats.categories));
    const minCategoryCount = Math.min(...Object.values(stats.categories));

    if (maxCategoryCount > minCategoryCount * 3) {
      recommendations.push('Consider balancing the number of modules across categories');
    }

    // Title recommendations
    if (stats.averageTitleLength > 50) {
      recommendations.push('Consider shorter, more concise module titles');
    } else if (stats.averageTitleLength < 10) {
      recommendations.push('Consider more descriptive module titles');
    }

    // Error-based recommendations
    if (validation.errors.length > 0) {
      recommendations.push('Fix configuration errors before deployment');
    }

    if (validation.warnings.length > 3) {
      recommendations.push('Review and address configuration warnings');
    }

    return recommendations;
  }
}

export default ConfigValidator;