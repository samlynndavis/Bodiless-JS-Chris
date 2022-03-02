import {
  TokenSpec, HOC, DesignableComponents, Token
} from './types';

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

/**
 * Makes a token shadowable.
 *
 * @param token
 */
export const asShadowedToken = <C extends DesignableComponents, D extends object>(
  // can this be a token?
  token: Token<C, D>
): TokenSpec<C, D> => {
  throw new Error('Function not implemented.');
};

/**
 * Inserts a token into the registry.
 * @param name
 * @param token
 */
export const withRegisterShadowToken = (name: string, token: Token<any, any>): HOC => {
  throw new Error('Function not implemented.');
};

/**
 * Applies a token from the registry.
 * @param name
 */
export const withRegisteredToken = (name: string): HOC => {
  throw new Error('Function not implemented.');
};
