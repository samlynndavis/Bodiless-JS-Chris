import webpack, { Configuration } from 'webpack';

const babelConfig = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-preval',
  ],
  presets: [
    [
      '@babel/preset-react',
      { modules: false }
    ]
  ],
  env: {
    test: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};

const createNoGatsbyWebpackPlugin = () => new webpack.NormalModuleReplacementPlugin(
  /vital-gatsby-image/,
  (res: any) => {
    res.request = `${res.request}/mocks`;
  }
);

const createNoGatsbyRules = () => [
  {
    test: (file: string) => file.endsWith('js') && file.includes('gatsby/cache-dir'),
    loader: 'babel-loader',
    options: babelConfig,
  },
  {
    test: /\.(js|jsx|mjs|ts|tsx)$/,
    loader: 'babel-loader',
    options: babelConfig,
    exclude: [
      (file: string) => {
        if (file.includes('gatsby-browser-entry')) {
          return false;
        }
        return file.includes('node_modules');
      },
    ],
  },
];

const addNoGatsbyWebpackConfig = (config: Configuration): Configuration => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    createNoGatsbyWebpackPlugin(),
  ],
  module: {
    ...(config.module || {}),
    rules: [
      ...(config.module?.rules || []),
      ...createNoGatsbyRules()
    ]
  },
});

export { createNoGatsbyWebpackPlugin, createNoGatsbyRules, addNoGatsbyWebpackConfig };
