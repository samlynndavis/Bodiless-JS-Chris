import merge from 'lodash/merge';

/**
 * Adds "bodiless:static" as a resolve condition, which can be used by
 * packages to provide different entry points for static builds.
 *
 * @param config
 * The webpack configuration object to which this should be added.
 */
export const addStaticExportsCondition = (config: any = {}) => merge({}, config, {
  resolve: {
    // "import" and "module" are added for compatibility with webpack defaults.
    conditionNames: ['import', 'module', 'bodiless:static'],
  },
});
