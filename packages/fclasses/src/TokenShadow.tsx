import { withTokenFromRegistry } from './TokenRegistry';
import {
  TokenSpec, HOC, DesignableComponents, $MakeShadowable,
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
  tokenSpec: TokenSpec<C, D>
): TokenSpec<C, D> => {
  // This function is invoked in `as` to register the hoc produced by this token.
  const makeShadowable = (hoc: HOC) => withTokenFromRegistry(name, hoc);
  const shadowableTokenSpec = { ...tokenSpec, [$MakeShadowable]: makeShadowable };
  // Ensure that when this token is extended, the extended token is not implicitly shadowable.
  Object.defineProperty(shadowableTokenSpec, $MakeShadowable, { enumerable: false });
  return shadowableTokenSpec;
};
