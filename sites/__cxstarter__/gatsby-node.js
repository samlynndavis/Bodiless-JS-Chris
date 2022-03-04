/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');

const TOKENS_PATH = 'tokens';

const cxShadowWebpackPlugin = (
  ...packages
) => new webpack.NormalModuleReplacementPlugin(
  new RegExp(`\\.\\${path.sep}${TOKENS_PATH}`),
  resource => {
    const componentName = path.basename(resource.context);
    console.log('request', resource.request, componentName);
    for (let i = 0; i < packages.length; i += 1) {
      try {
        const exportName = `${packages[i]}/lib/shadow/${componentName}`;
        console.log('exportName', exportName);
        // eslint-disable-next-line no-param-reassign
        resource.request = require.resolve(exportName);
        console.log('found', resource.request);
        break;
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
);

// Fix sourcemap issue
// See: https://github.com/gatsbyjs/gatsby/issues/6278#issuecomment-402540404
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  console.log('wp', require.resolve('webpack'));
  actions.setWebpackConfig({
    plugins: [
      cxShadowWebpackPlugin('@bodiless/__cxstarter__'),
    ]
  });
  if (stage === 'develop') {
    // When running test-site with local packages (via npm pack) we seem to get
    // multiple react instances, which causes this invalid hook call warning
    // (https://reactjs.org/warnings/invalid-hook-call-warning.html)
    // so we ensure we always resolve to the same instance when present
    // in node_modules.  When running from sites, react is hoisted and
    // won't be present in the test site's node_modules.
    const reactPath = path.resolve('./node_modules', 'react');
    const reactAlias = fs.existsSync(reactPath) ? { react: reactPath } : {};
    actions.setWebpackConfig({
      // Set devtool to `false` below to disable sourcemap on performance improvement.
      // or set devtool as 'cheap-module-source-map' to re-enable sourcemap.
      // See https://webpack.js.org/configuration/devtool/
      devtool: false,
      resolve: {
        plugins: [new TsconfigPathsPlugin()],
        alias: reactAlias,
      },
      // On development, we want changes on Bodiless packages to trigger
      // new builds. Webpack won't watch packages inside node_modules by
      // default, so we remove the @bodiless folder from its default list.
      //
      // See: https://webpack.js.org/configuration/other-options/#snapshot
      snapshot: {
        managedPaths: glob.sync(
          './node_modules/!(@bodiless)*',
          { absolute: true },
        ),
      }
    });
  }
};
