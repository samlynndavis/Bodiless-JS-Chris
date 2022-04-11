import { getPackageTailwindConfig } from '@bodiless/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
