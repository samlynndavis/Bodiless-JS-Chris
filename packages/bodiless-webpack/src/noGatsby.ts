const { NormalModuleReplacementPlugin } = require('webpack');

const createNoGatsbyWebpackPlugin = () => new NormalModuleReplacementPlugin(
  /vitall-gatsby-image/,
  (res: any) => {
    res.request = `${res.request}/mocks`;
  }
);

export { createNoGatsbyWebpackPlugin };
