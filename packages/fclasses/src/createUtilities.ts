import { startWith } from './hoc-util';
import {
  TokenDef, AsToken, 
  DesignableComponents, HocDesign, RequiredDomains, TokenSpec,
  ReservedDomains, Design, TokenCollection, TokenX,
} from './types';
import { asToken } from './Tokens';
import { addClasses } from './FClasses';
import { withHocDesign } from './withHocDesigh';
import mergeWith from 'lodash/mergeWith';
import flow from 'lodash/flow';
import { ComponentType } from 'react';
import identity from 'lodash/identity';
import { extendMeta } from './Tokens';
import omit from 'lodash/omit';
import { pick } from 'lodash';

/**
 * Helper function to improve type inference in token specifications, and to ensure that
 * the order of domains is consistent for all tokens.
 *
 * @param d
 * If specified, defines a circumscribed set of allowed token domains.
 *
 * @returns
 * Function which recieves an object as a parameter and returns a normalized token
 * specification based on that object.
 *
 * @see https://stackoverflow.com/questions/54598322/how-to-make-typescript-infer-the-keys-of-an-object-but-define-type-of-its-value
 */
const asTokenSpec = <C extends DesignableComponents, D extends RequiredDomains = any>(
  d?: D,
) => (s: Partial <TokenSpec<C, D>>): Partial<TokenSpec<C, D>> => (
    // Ensure keys of the spec are in the order defined by the domain set.
    typeof d === 'undefined' ? s : { ...pick(d, Object.getOwnPropertyNames(s)), ...s }
  );

/**
     * @private
     * Converts a domain into an HOC which applies the extended design defined
     * by that domain.  Properly handles special domain names ('Condition',
     * 'Compose' and 'Meta').
     *
     * @param domainName
     * @param domain
     */
const getHocForDomain = <C extends DesignableComponents, D extends RequiredDomains = any>(
  domainName: keyof TokenSpec<C, D>,
  domain?: Design<C> | ReservedDomains<C, D>[keyof ReservedDomains<C, D>]
): TokenDef | undefined  => {
  if (!domain)
    return undefined;
  if (domainName === 'Flow')
    return undefined;
  if (domainName === 'Meta')
    return Array.isArray(domain) ? extendMeta(...domain) : domain;
  if (domainName === 'Compose') {
    const compose = domain as ReservedDomains<C, D>['Compose'];
    return as(...Object.values(compose));
  }
  return withDesign(domain as Design<C, D>);
};


/**
     * Converts a list of token into an HOC which can be applied to
     * a component. Tokens to apply may be expressed in token object notation, as HOC's
     * or as className strings.
     *
     * @param specs
     * A list of token to be composed.
     *
     * @returns
     * An HOC which can be applied to a component.
     */
const as = <D extends RequiredDomains = any>(
  ...args$: TokenX<any, D>[]
) => {
  const args = args$.filter(Boolean);
  const tokens: TokenDef[] = args.map(arg => {
    if (typeof arg === 'function' || typeof arg === 'undefined')
      return arg;
    if (typeof arg === 'string')
      return addClasses(arg);
    const specTokens: TokenDef[] = [];
    // Use keys of the base token spec to ensure correct order of domains.
    const keys = [
      ...Object.getOwnPropertyNames(omit(arg, 'Meta', 'Compose', 'Flow')),
      'Meta',
      'Compose',
      'Flow',
    ];
    specTokens.push(...keys
      .map(domainName => getHocForDomain(
        domainName as keyof TokenSpec<any, D>,
        arg[domainName as keyof TokenSpec<any, D>])));

    if (arg.Flow) {
      return arg.Flow(...specTokens);
    }
    return asToken(...specTokens);
  });
  return asToken(...tokens);
};

/**
 * Applies a design to a component.
 *
 * @param design
 * The design to apply.
 *
 * @returns
 * An hoc which applies the design.
 */
function withDesign<C extends DesignableComponents = any, D extends RequiredDomains = any>(
  design: Design<C, D>
) {
  const hocDesign: HocDesign<C> = Object.keys(design)
    .filter(k => k !== '_')
    .reduce(
      (d, k) => ({
        ...d,
        [k]: as(design[k]),
      }),
      {} as HocDesign<any>);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return as(
    design._,
    withHocDesign(hocDesign)
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
    if (key === 'Meta')
      return extendMeta(a, b);
    if (key === 'Flow') {
      const finalFlow: AsToken<any> = flow(a || identity, b || identity);
      return finalFlow;
    }
    return undefined;
  }
  if (!a || !b)
    return undefined;
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
function extend<C extends DesignableComponents, D extends RequiredDomains = any>(
  ...specs: Partial<TokenSpec<C, D>>[]
) {
  return mergeWith({}, ...specs, tokenMergeCustomizer) as TokenSpec<C, D>;
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
function extendDesign<C extends DesignableComponents, D extends RequiredDomains = any>(
  d: Design<C, D>,
  ...designs: Design<C, D>[]
): Design<C, D> {
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
const asSimpleToken = <D extends RequiredDomains>(
  domain: keyof TokenSpec<{}, D> = 'Core') => (...tokens: TokenX<{}, D>[]) => asElementToken({
    [domain]: {
      _: as(...tokens),
    },
  } as Partial<TokenSpec<{}, D>>);

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
const on = (
  CleanComponent: ComponentType<any>
) => <C extends DesignableComponents, D extends RequiredDomains = any>(
  ...specs: TokenX<C, D>[]
) => as(
    startWith(CleanComponent),
    ...specs);
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
const designToTokens = <C extends DesignableComponents, D extends RequiredDomains = any>(
  design: Design<any, D>): TokenCollection<C> => Object.keys(design).reduce(
    (tokens, key) => ({
      ...tokens,
      [key]: asSimpleToken()(design[key]),
    }),
    {});
  /**
     * Converts a collection of tokens to a design.  Useful when you want to
     * generate a set of flow container variations or rich text components
     * from eisting tokens.
     *
     * @param tokenCollection
     * The collection of tokens which should be converted to a design.
     */
const tokensToDesign = <C extends DesignableComponents, D extends RequiredDomains = any>(
  tokenCollection: TokenCollection<C, D>): HocDesign<C> => Object.keys(tokenCollection).reduce(
    (design, key) => ({
      ...design,
      [key]: as<D>(tokenCollection[key]),
    }),
    {} as HocDesign<C>);

export {
  asTokenSpec,
  as,
  on,
  withDesign,
  extend,
  extendDesign,
  designToTokens,
  tokensToDesign,
  asSimpleToken,
  asElementToken,
};
