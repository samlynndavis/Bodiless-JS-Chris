const path = require('path');

module.exports = ({ componentName, packageName }) => {
  const parts = packageName ? packageName.split('/') : [];
  try {
    const requirePath = ['.', 'lib', 'shadow', ...parts, componentName].join('/');
    return require.resolve(requirePath);
  } catch (e) {
    return false;
  }
};
