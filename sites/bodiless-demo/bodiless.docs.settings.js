const { defaultToc } = require('@bodiless/documentation');

const settings = () => ({
  toc: defaultToc(),
});
module.exports.default = settings;
