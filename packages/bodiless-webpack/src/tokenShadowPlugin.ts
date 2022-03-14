/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */
import webpack from 'webpack';
import path from 'path';
import { createLogger, PluginOptions } from './util';

const TOKENS_PATH = 'tokens';

type TokenShadowPluginOptions = Omit<PluginOptions, 'exclude'> & {
  resolvers: ((component: string) => string)[];
};

export const createTokenShadowPlugin = (
  { logging = true, resolvers = [] }: TokenShadowPluginOptions
) => {
  // console.log('creating token shadow plugin');
  // @ts-ignore
  const log = createLogger(logging);
  return new webpack.NormalModuleReplacementPlugin(
    new RegExp(`\\.\\${path.sep}${TOKENS_PATH}`),
    resource => {
      const componentName = path.basename(resource.context);
      // console.log('componentName', componentName, packages, resource.request);
      // Loop through all packges until we fid one that exports a shadow...
      for (let i = 0; i < resolvers.length; i += 1) {
        const newRequest = resolvers[i](componentName);
        console.log(componentName, newRequest);
        if (newRequest) {
          console.log(`[Shadow replacement] Replacing import in ${resource.contextInfo.issuer}`);
          console.log(` ↳ ${resource.request} → ${newRequest}\n`);
          // eslint-disable-next-line no-param-reassign
          resource.request = newRequest;
          break;
          // eslint-disable-next-line no-empty
        }
      }
    }
  );
};

export const addTokenShadowPlugin = (config: any, options: TokenShadowPluginOptions) => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    createTokenShadowPlugin(options),
  ],
});
