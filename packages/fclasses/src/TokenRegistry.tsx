import React, {
  createContext, FC, useContext, useMemo,
} from 'react';
import { as } from './tokenSpec';
import type { Token, HOC } from './types';

export type TokenRegistryValue = Record<string, Token<any, any>>;

export const TokenRegistryContext = createContext<TokenRegistryValue>({});

/**
 * Applies a design from the global design registry.
 *
 * @param key
 * The key identifying th globally defined design you wish to apply.
 * The design must previously have been added to the registry via
 * `withRegisterGlobalDesign`.k
 */
export const withTokenFromRegistry = (
  key: string,
  fallback?: Token<any, any>,
): HOC => Component => {
  const WithTokenFromRegistry: FC<any> = props => {
    const token = useContext(TokenRegistryContext)[key] || fallback;
    const WrappedComponent = useMemo(
      () => (token ? as(token)(Component) : Component),
      [token],
    );
    return <WrappedComponent {...props} />;
  };
  return WithTokenFromRegistry;
};

/**
 * Adds one or more tokens to the global token registry.
 *
 * @param tokens
 * A keyed array of tokens to be added to the registry.
 *
 * @return
 * An HOC which will add the tokens to the registry before rendering
 * the wrapped component.
 */
export const withRegisterTokens = (
  tokens: Record<string, Token<any, any>>,
): HOC => Component => {
  const WithRegisterTokens: FC<any> = props => {
    const oldValue = useContext(TokenRegistryContext);
    const newValue = {
      ...oldValue,
      ...tokens,
    };
    return (
      <TokenRegistryContext.Provider value={newValue}>
        <Component {...props} />
      </TokenRegistryContext.Provider>
    );
  };
  return WithRegisterTokens;
};
