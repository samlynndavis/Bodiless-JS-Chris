module.exports = component => {
  try {
    return require.resolve(`./lib/shadow/${component}`);
  } catch (e) {
    return false;
  }
};
