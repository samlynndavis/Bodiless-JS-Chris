/* eslint-disable import/no-dynamic-require, global-require */
import { getPackageDocs } from '@bodiless/cli';

export const getDocs = (nameSpace) => getPackageDocs({
  resolver: p => require.resolve(p),
  nameSpace
});
