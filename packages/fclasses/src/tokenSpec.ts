import { DesignableComponents, Design, startWith } from './Design';
import type { TokenDef, HOC, TokenMeta, AsToken, Enhancer } from './types';

import { asToken } from './Tokens';
import { addClasses } from './FClasses';
import { withDesign } from './Design';

import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import union from 'lodash/union';
import flow from 'lodash/flow';
import { ComponentType } from 'react';
import identity from 'lodash/identity';

type RequiredDomains = {
  Core: any,
};

type Domains<C extends DesignableComponents, D extends RequiredDomains> = {
  [k in keyof D]: ExtDesign<C>
};

export type ReservedDomains<
C extends DesignableComponents,
P = any,
D extends RequiredDomains = RequiredDomains,
> = {
  /**
     * A list of other tokens which should be applied.
     */
  Compose: {
    [key: string]: Partial<TokenSpec<C, any, D>>|HOC|string,
  },
  /**
     * If specified, the entire token will be wrapped in a flow toggle using
     * this condition hook. Note, the condition is applied to the whole token,
     * so it will not have access to any contexts or content nodes provided by
     * the token itself.
     */
  Flow?: AsToken<P>,
  /**
     * Metadata which should be attached to this token (and to any component to
     * to which the token is applied).
     */
  Meta: TokenMeta,
};
  
/**
   * Type of a token specification, a token expressed in the
   * Token Object Notation.
   *
   * This is a nested object with two levels of keys:
   * - The inner keys are to the design keys of the target component, and their
   *   values extended CanvasX token definitions which should be applied to
   *   each key. In addition to the design keys of the component, the special `_`
   *   key is supported to denote a token which should be applied to the component
   *   as a whole.
   * - The top-level keys are "domains" -- areas of styling or behavior which can
   *   be individually reused, extended or overridden by downstream consumers.
   *
   * @param C
   * The type of the design elements for the target componetn.
   *
   * @param D
   * An object type describing the domain keys available in this token.
   */
export type TokenSpec<
  C extends DesignableComponents,
  P = any,
  D extends RequiredDomains = RequiredDomains,
> = Domains<C, D> & ReservedDomains<C, P, D>;

/**
 * Type of an argument to `as` and/or the value of a key in an Extended Design.
 * May be:
 * - A token specified in token object notation
 * - A token specified as an HOC
 * - A token specified as a string of classes.
 */
type As<
  C extends DesignableComponents,
  P = any,
  D extends RequiredDomains = RequiredDomains,
> = Partial<TokenSpec<C, P, D>> | string | HOC | undefined;
  
/**
   * Type of a collection of tokens which apply to a specific designable component.
   *
   * @param C
   * The designable components which are exposed by the component to which these
   * tokens apply.
   */
export type TokenCollection<
  C extends DesignableComponents,
  D extends RequiredDomains = RequiredDomains,
> = {
  [name: string]: Partial<TokenSpec<C, any, D>>,
};
  
  
  
/**
   * Overloaded design type:
   * - includes a special key which contains tokens to be applied to the
   *   component as a whole.
   * - Allows each value to be speciried as a CanvasX extened token definition.
   */
export type ExtDesign<
  C extends DesignableComponents,
  D extends RequiredDomains = RequiredDomains,
> = {
  [k in keyof Partial<C & { _?: As<C, any, D> }>]: As<C, any, D>
};

/**
 * Creates token manipulation utilites using the supplied set of domains.
 * Useful if you wish to define your own set of token domains.
 *
 * @param baseDomains
 * An object whose keys are the domain names to use in your token taxonomy.
 *
 * @returns
 * Token maniuplation utilities to use with your design system.
 */
export function createUtilities<D extends RequiredDomains = RequiredDomains>(baseDomains: D) {
  /**
     * Helper function to improve type inference in token specifications, and to ensure that
     * the order of domains is consistent for all tokens.
     *
     * @returns
     * Function which recieves an object as a parameter and returns a normalized token
     * specification based on that object.
     *
     * @see https://stackoverflow.com/questions/54598322/how-to-make-typescript-infer-the-keys-of-an-object-but-define-type-of-its-value
     */
  const asTokenSpec = <C extends DesignableComponents>() => (
    s: Partial<TokenSpec<C, any, D>>,
  ): Partial<TokenSpec<C, any, D>> => s;
  /**
     * @private
     * Converts a domain into an HOC which applies the extended design defined
     * by that domain.  Properly handles special domain names ('Condition',
     * 'Compose' and 'Meta').
     *
     * @param domainName
     * @param domain
     */
  function getHocForDomain<C extends DesignableComponents>(
    // domainName: keyof TokenSpec<C, any, D>,
    // domain?: TokenSpec<C, any, D>[keyof TokenSpec<C, any, D>],
    domainName: keyof (D & ReservedDomains<C, any, D>),
    domain?: ExtDesign<C> | ReservedDomains<C, any, D>[keyof ReservedDomains<C, any, D>],
  ): TokenDef|undefined {
    if (!domain) return undefined;
    if (domainName === 'Flow') return undefined;
    if (domainName === 'Meta') return Array.isArray(domain) ? extendMeta(...domain) : domain;
    if (domainName === 'Compose') {
      const compose = domain as ReservedDomains<C, any, D>['Compose'];
      return as(...Object.values(compose));
    }
    return withExtDesign(domain as ExtDesign<C>);
  }

  /**
     * Converts a list of token specifications into a token hoc which can be applied to
     * a component. Tokens to apply may be expressed in token object notation, as HOC's
     * or as className strings.
     *
     * @param specs
     * A list of token specifications to be composed into a single Token HOC.
     */
  function as <
      C extends DesignableComponents,
      P0, P1, P2, P3, P4, P5, P6, P7, P8, P9,
    >(
    a0?: As<C, P0, D>,
    a1?: As<C, P1, D>,
    a2?: As<C, P2, D>,
    a3?: As<C, P3, D>,
    a4?: As<C, P4, D>,
    a5?: As<C, P5, D>,
    a6?: As<C, P6, D>,
    a7?: As<C, P7, D>,
    a8?: As<C, P8, D>,
    a9?: As<C, P9, D>,
    ...restArgs: As<C, any, D>[]
  ): Enhancer<P0 & P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9> {
    const args = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, ...restArgs]
      .filter(Boolean);
    const tokens: TokenDef[] = args.map(arg => {
      if (typeof arg === 'function' || typeof arg === 'undefined') return arg;
      if (typeof arg === 'string') return addClasses(arg);
      const specTokens: TokenDef[] = [];
      // Use keys of the base token spec to ensure correct order of domains.
      const keys = [
        ...Object.keys(baseDomains),
        'Meta',
        'Compose',
        'Flow',
      ];
      specTokens.push(...keys
        .map(domainName => getHocForDomain(
          domainName as keyof TokenSpec<C>,
          arg[domainName as keyof TokenSpec<C>],
        )));
    
      if (arg.Flow) {
        return arg.Flow(...specTokens);
      }
      return asToken(...specTokens);
    });
    return asToken(...tokens);
  }
  /**
     * @private
     * Applies an extended design.
     *
     * @param designx
     * The extended design.
     *
     * @returns
     * A token hoc which applies the design.
     */
  function withExtDesign <C extends DesignableComponents>(designx: ExtDesign<C, D>) {
    const design: Design<C> = Object.keys(designx)
      .filter(k => k !== '_')
      .reduce(
        (d, k) => ({
          ...d,
          [k]: as(designx[k]),
        }),
        {} as Design<any>,
      );
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return as(
      designx._,
      withDesign(design),
    );
  }
  /**
     * @private
     * Customizer for merging two token specifications.
     */
  const tokenMergeCustomizer = (...args: any) => {
    const stack = args[5];
    const [a, b, key] = args;
    if (stack.size === 0) {
      if (key === 'Meta') return extendMeta(a, b);
      if (key === 'Flow') {
        const finalFlow: AsToken<any> = flow(a || identity, b || identity);
        return finalFlow;
      }
      return undefined;
    }
    if (!a || !b) return undefined;
    return as(a, b);
  };
    
  /**
     * Utiity to merge two tokens. inner key values are composed together via `t`.
     *
     * @param a, b
     * Token specifications to merge.
     *
     * @return
     * A new token specification containing the merged keys.
     *
     * @example
     * ```
     * const asTestTokenSpec = asTokenSpec<{
     *   A: ComponentType<any>,
     *   B: ComponentType<any>,
     * }>();
     * const Left = asTestTokenSpec({
     *   Foo: {
     *     B: 'b',
     *   },
     *   Bar: {@typescript-eslint/space-infix-ops
     *     B: 'b2',
     *   },
     * });
     * const Right = asTestTokenSpec({
     *   Foo: {
     *     B: 'b1',
     *     A: 'a',
     *   },
     *   Baz: {
     *     A: 'a2',
     *   },
     * });
     * const Test = extend(Left, Right);
     * const Expected = asTestTokenSpec({
     *     Foo: {
     *       B: as('b', 'b1'), // Note this will create `className="b1 b"`
     *       A: 'a',
     *     },
     *     Bar: {
     *       B: 'b2',
     *     },
     *     Baz: {
     *       A: 'a2',
     *     },
     * });
     * ```
     */
  function extend<C extends DesignableComponents>(
    ...specs: Partial<TokenSpec<C, any, D>>[]
  ) {
    return mergeWith({}, ...specs, tokenMergeCustomizer) as TokenSpec<C, any, D>;
  }
  /**
     * Utility to extend a domain value. The final domain will contain the union of
     * keys from all merged designs. In the case where two or more designs have the
     * same key, the value of that key will be composed using `t`.
     *
     * @param d
     * The base design to be extended.
     *
     * @param ...designs
     * Designs to extend the base design.
     */
  function extendDomain<C extends DesignableComponents>(
    d: ExtDesign<C>,
    ...designs: ExtDesign<C>[]
  ): ExtDesign<C> {
    return mergeWith(d, ...designs, (a: any, b: any) => (a && b ? as(a, b) : undefined));
  }
  /**
     * Creates an element level token (one in which only the `_` inner key is allowed).
     */
  const asElementToken = asTokenSpec<{}>();
    
  /**
     * Creates an element level token with a single domain.
     *
     * @param domain
     * The name of the domain to use for the token. Defaults to `Core`.
     *
     * @returns
     * A function which accepts a list of tokens (expressed as token specifications,
     * strings or HOCs), and returns a token specification with a single domain which
     * applies the tokens to the whole element.
     */
  const asSimpleToken = (
    domain: keyof TokenSpec<{}, any, D> = 'Core',
  ) => (...tokens: As<{}, any, D>[]) => asElementToken({
    [domain]: {
      _: Array.isArray(tokens) ? as(...tokens) : tokens,
    },
  } as Partial<TokenSpec<{}, any, D>>);
    
  /**
     * Utility to apply tokens to a specified clean component.
     *
     * @param CleanComponent
     * The clean starting component to which tokens should be applied.
     *
     * @returns
     * A function which applies tokens to the clean component.
     *
     * @example
     * ```
     * on(FooClean)(cxFoo.Default, 'bar');
     * ```
     * is equivalent to
     * ```
     * as(startWith(FooClean), cxFoo.Default, 'bar');
     * ```
     */
  const on = (CleanComponent: ComponentType<any>) => <C extends DesignableComponents>(
    ...specs: As<C, any, D>[]
  ) => as(
      startWith(CleanComponent),
      ...specs,
    );
  /**
     * Helper function to create a collection of element tokens from a fluid ExtDesign.
     *
     * @param design
     * A fluid extended design specifying the token HOC's which should be applied by
     * each token spec.
     *
     * @example
     * ```
     * const brandElement = designToTokens({
     *   H1: 'text-3xl',
     *   H2: 'text-2xl',
     * });
     * ...
     * brandElement.H1 === {
     *   Core: {
     *     _: 'text-3xl',
     *   },
     * };
     * ```
     */
  const designToTokens = <C extends DesignableComponents>(
    design: ExtDesign<any, D>,
  ): TokenCollection<C> => Object.keys(design).reduce(
      (tokens, key) => ({
        ...tokens,
        [key]: asSimpleToken()(design[key]),
      }),
      {},
    );
  /**
     * Converts a collection of tokens to a design.  Useful when you want to
     * generate a set of flow container variations or rich text components
     * from eisting tokens.
     *
     * @param tokenCollection
     * The collection of tokens which should be converted to a design.
     */
  const tokensToDesign = <C extends DesignableComponents>(
    tokenCollection: TokenCollection<C, D>,
  ): Design<C> => Object.keys(tokenCollection).reduce(
      (design, key) => ({
        ...design,
        [key]: as(tokenCollection[key]),
      }),
      {} as Design<C>,
    );

  return {
    as, asTokenSpec, extend, extendDomain, asElementToken, asSimpleToken, on,
    designToTokens, tokensToDesign,
  };
}

const defaultDomains = {
  Core: {},
  Analytics: {},
  SEO: {},
  Components: {},
  Layout: {},
  Spacing: {},
  Theme: {},
  Editors: {},
  Content: {},
  Behavior: {},
  Schema: {},
};

const {
  as, asTokenSpec, extend, extendDomain, asElementToken, asSimpleToken, on,
  designToTokens, tokensToDesign,
} = createUtilities(defaultDomains);

export {
  as, asTokenSpec, extend, extendDomain, asElementToken, asSimpleToken, on,
  designToTokens, tokensToDesign,
};
  
/**
   * Merges token metadata objects. Keys are merged normally, except that
   * arrays are combined via `union`.
   *
   * @param args
   * A list of token meta objects
   *
   * @returns
   * A single token meta object which merges the arguments.
   */
export const extendMeta = (
  ...args: (TokenMeta|undefined)[]
) => mergeWith({}, ...args.map(a => (a === undefined ? {} : a)), (objValue: any, srcValue: any) => {
  if (isArray(objValue) && isArray(srcValue)) {
    return union(objValue, srcValue);
  }
  return undefined;
});
  
  
  
  
  
  
  
  
  
/**
   * Helper function to insert elements into a design at a
   * particular key.  Useful when you want to manage the order
   * in which components appear in the component selector or
   * editor toolbar.
   *
   * @param key The design key at which to insert the new elements
   * @param values The design elements to insert
   */
export const insertDesignAt = (
  key: string, values: ExtDesign<any>,
) => (obj: ExtDesign<any>) => Object.keys(obj).reduce(
  (acc, k) => ({
    ...acc,
    [k]: obj[k],
    ...(k === key ? values : {}),
  }),
  {} as ExtDesign<any>,
);
  