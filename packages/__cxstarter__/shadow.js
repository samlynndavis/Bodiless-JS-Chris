const path = require('path');

module.exports = ({ componentName, packageName }) => {
  const parts = packageName ? packageName.split('/') : [];
  console.log('parts', parts);
  try {
    const relPath = ['.', 'lib', 'shadow', ...parts, componentName].join('/');
    console.log(relPath);
    return require.resolve(relPath);
  } catch (e) {
    return false;
  }
};
