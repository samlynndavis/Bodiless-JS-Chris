import {TokenSpec, HOC, DesignableComponents} from './types';

export type DefaultDomains = {
  Core: any,
  Components: any,
};

// @todo make these more generic
export type TokenCollection<K extends string> = Record<K, TokenSpec<{}, DefaultDomains>>;

/**
 * Makes all tokens in a collection shadowable.
 *
 * @param collection
 * @param name
 */
export const asShadowedTokenCollection = <K extends string>(
  name: string,
  collection: TokenCollection<K>,
): TokenCollection<K> => {
  throw new Error('Function not implemented.');
};

/**
 * Inserts all tokens from a collection into the registry.
 * @param collection
 * @param name
 */
export const withRegisterShadowTokens = <K extends string>(
  name: string,
  collection: TokenCollection<K>,
): HOC => {
  throw new Error('Function not implemented.');
};

/**
 * Makes a token spec shadowable.
 *
 * @param token
 */
export const asShadowedTokenSpec = <C extends DesignableComponents, D extends object>(
  name: string,
  // can this be a token?
  token: TokenSpec<C, D>
): TokenSpec<C, D> => {
  throw new Error('Function not implemented.');
};
