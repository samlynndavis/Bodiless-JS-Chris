/* eslint-disable no-console */
import webpack from 'webpack';
import path from 'path';

const REGEXP = /\.bl-edit/;
const REPLACEMENT = '.static';

const createStaticReplacementPlugin = () => new webpack.NormalModuleReplacementPlugin(
  REGEXP,
  resource => {
    const newRequest = resource.request.replace(REGEXP, REPLACEMENT);
    const newResource = path.join(resource.context, newRequest);
    try {
      // console.log('Trying to resolve', newResource);
      // Ensure that the replacement exists and is resolvable.
      require.resolve(newResource);
      console.log('Replacing module in', resource.contextInfo.issuer);
      console.log('  ', resource.request, '-->', newRequest);
      // eslint-disable-next-line no-param-reassign
      resource.request = newRequest;
    } catch (e) {
      console.warn(`Not replacing ${resource.request}: unable to resolve ${newResource}`);
    }
  },
);

export const addStaticReplacementPlugin = (config: any = {}) => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    createStaticReplacementPlugin(),
  ],
});
