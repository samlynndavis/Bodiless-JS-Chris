import webpack from 'webpack';
import path from 'path';

const TOKENS_PATH = 'tokens';

export const createTokenShadowPlugin = (
  ...packages: string[]
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
