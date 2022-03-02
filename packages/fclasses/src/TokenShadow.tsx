import { TokenSpec, HOC } from './types';

export type DefaultDomains = {
  Core: any,
  Components: any,
};

// @todo make these more generic
export type TokenCollection<K extends string> = Record<K, TokenSpec<{}, DefaultDomains>>;

export const asShadowedTokenCollection = <K extends string>(
  collection: TokenCollection<K>,
  name: string
): TokenCollection<K> => {
  throw new Error('Function not implemented.');
};

export const withRegisterShadowTokens = <K extends string>(
  collection: TokenCollection<K>,
  name: string,
): HOC => {
  throw new Error('Function not implemented.');
};
