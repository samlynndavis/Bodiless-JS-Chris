/* eslint-disable import/no-dynamic-require, global-require */
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        demo: {
          boxshadow: '#cbd5e1',
        },
      },
      maxWidth: {
        64: '16rem',
      },
      minWidth: {
        64: '16rem',
      },
    },
  },
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
