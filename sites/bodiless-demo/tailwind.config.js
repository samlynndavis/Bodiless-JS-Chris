/* eslint-disable global-require */

const requireEsm = require('esm')(module);
const glob = require('glob');

const content = glob.sync(
  './src/**/!(*.d).{ts,js,jsx,tsx}'
);

const { buildTailwindConfig } = requireEsm(
  '@bodiless/fclasses'
);

const twConfig = {
  // @todo: workaround for https://github.com/johnsonandjohnson/Bodiless-JS/issues/1584
  // content: [
  //   './src/**/!(*.d).{ts,js,jsx,tsx}',
  // ],
  content,
};

// Get configs sorted by precedence and/or exclude some packages:
// const getTwConfig = () => getPackageTailwindConfig({
//   pkgJson,
//   twConfig,
//   resolver,
//   prefer: ['@bodiless/test-site', '@bodiless/some-package-name'],
//   exclude: ['@bodiless/organisms', '@bodiless/accordion'],
// });

module.exports = buildTailwindConfig({
  twConfig,
  resolver: pkg => requireEsm.resolve(pkg),
  prefer: ['bodiless-demo'],
});
