const { NormalModuleReplacementPlugin } = require('webpack');

const babelConfig = {
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-preval',
  ],
  "presets": [
    [
      "@babel/preset-react",
      { modules: false }
    ]
  ],
  'env': {
    'test': {
      'plugins': [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};

module.exports = async ({ config, mode }) => {
  // Omit gatsby image plugin
  config.plugins.push(
    new NormalModuleReplacementPlugin(
      /\.\.\/vital-gatsby-image/,
      '../vital-gatsby-image/mocks',
    )
  );
  config.module.rules.push(
            {
              test: (file) =>
                file.endsWith("js") && file.includes("gatsby/cache-dir"),
              loader: "babel-loader",
              options: babelConfig,
            },
            {
              test: /\.(js|jsx|mjs|ts|tsx)$/,
              loader: "babel-loader",
              options: babelConfig,
              exclude: [
                (file) => {
                  if (file.includes("gatsby-browser-entry")) {
                    return false;
                  }
                  return file.includes("node_modules");
                },
              ],
            },
  );
  return config;
}