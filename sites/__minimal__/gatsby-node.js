/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Fix sourcemap issue
// See: https://github.com/gatsbyjs/gatsby/issues/6278#issuecomment-402540404
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      // Set devtool to `false` below to disable sourcemap on performance improvement.
      // or set devtool as 'cheap-module-source-map' to re-enable sourcemap.
      // See https://webpack.js.org/configuration/devtool/
      devtool: false,
      resolve: {
        plugins: [new TsconfigPathsPlugin()],
      },
    });
  }
};
