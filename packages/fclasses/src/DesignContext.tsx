import omit from 'lodash/omit';
import React, {
  createContext, FC, useContext, useMemo
} from 'react';
import { replaceable } from './replaceable';
import { as } from './tokenSpec';
import {
  DesignableComponents,
  DesignableProps, Enhancer, HOC, HOD
} from './types';

export type DesignContextValue<D extends object = any> = Record<string, HOD<any, D>>;

const DesignContext = createContext<DesignContextValue>({});

/**
 * Applies an HOD from the design context to the design prop of a component.
 *
 * @param namespace
 * The key of the entry in the design context to apply. This is usually the
 * namespace defined when making a component designable.
 *
 * @returns
 * An HOC which modifies the design prop of the component.
 */
const withApplyDesignContext = (
  namespace: string
): HOC<DesignableProps> => Component => {
  const WithApplyDesignContext: FC<any> = props => {
    const context = useContext(DesignContext);
    const { design, ...rest } = props as DesignableProps;
    const design$ = useMemo(
      () => (context[namespace] ? context[namespace](design) : design),
      [context[namespace], design]
    );
    return <Component {...rest as any} design={design$} />;
  };
  return WithApplyDesignContext;
};

const withRegisterDesignContext = <C extends DesignableComponents = any, D extends object = any >(
  namespace: string,
  hod: HOD<C, D>,
): HOC => Component => {
    const WithRegisterDesignContext: FC<any> = props => {
      const value = useContext(DesignContext);
      const newValue = useMemo(
        () => ({ ...value, [namespace]: hod }),
        [value],
      );
      return (
        <DesignContext.Provider value={newValue}>
          <Component {...props} />
        </DesignContext.Provider>
      );
    };
    return WithRegisterDesignContext;
  };

const withResetDesignContext = (
  key?: string,
): HOC => Component => {
  const WithResetDesignContext: FC<any> = props => {
    let newValue: DesignContextValue = {};
    if (key) {
      const value = useContext(DesignContext);
      newValue = omit(value, key);
    }
    return (
      <DesignContext.Provider value={newValue}>
        <Component {...props} />
      </DesignContext.Provider>
    );
  };
  return WithResetDesignContext;
};

type WithTokensFromDesignProps = DesignableProps & {
  designKeys?: string|string[],
};

/**
 * HOC which applies selected tokens to a component from its design.
 *
 * The wrapped component will receive as props a fluid design and a
 * set of design keys.  It then applies the tokens from the design
 * which correspond to those keys.
 *
 * @param Element
 * The element to wrap.
 *
 * @returns
 * A component with two additional props:
 * @property design
 * A fluid design (one with unspecified keys).
 * @property keys
 * The keys identifying which tokens in the design to apply.
 *
 * @example
 * This may be used in conjunction with Design Context to create
 * elements which reuse a global typogrphy, for example to create a single design
 * containing reusable typography, and individual elements
 * which consume it.
 * ```
 * const Typogrpahy = () => {
 *   H1: 'text-2xl font-bold text-blue',
 *   H2: 'text-xl underline',
 *   ...
 * };
 * const H1 = flowHoc(
 *   withTokensFromDesign,
 *   withApplyDesignContext('Typography'),
 *   addProps({ designKeys: 'H1' }),
 * )(H1);
 *
 * const DesignContextProvider = withRegisterDesignContext({ Typography })(Fragment);
 *
 * <DesignContextProvider>
 *   ...
 *   <H1>This will be styled from the design context</H1>
 * </DesignContextProvider>
 * ```
 */
const withTokensFromDesign: Enhancer<WithTokensFromDesignProps> = Element => {
  const WithTokensFromDesign: FC<any> = props => {
    const { designKeys = [], design = {}, ...rest } = props as WithTokensFromDesignProps;
    const keys$ = Array.isArray(designKeys) ? designKeys : [designKeys];
    const tokens = keys$.map(key => design[key]).filter(Boolean);
    // Memoize the component so that it is not recreated on every render.
    const WrappedComponent = useMemo(
      () => (tokens.length > 0 ? as(replaceable, ...tokens)(Element) : Element),
      [design, designKeys],
    );
    return <WrappedComponent {...rest as any} />;
  };
  return WithTokensFromDesign;
};

export {
  withApplyDesignContext,
  withRegisterDesignContext,
  withResetDesignContext,
  withTokensFromDesign,
};
