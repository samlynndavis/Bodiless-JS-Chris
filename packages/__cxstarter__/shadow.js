module.exports = ({ componentName }) => {
  try {
    return require.resolve(`./lib/shadow/${componentName}`);
  } catch (e) {
    return false;
  }
};
