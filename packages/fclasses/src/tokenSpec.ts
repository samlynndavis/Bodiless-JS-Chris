/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import mergeWith from 'lodash/mergeWith';
import flow from 'lodash/flow';
import { ComponentType } from 'react';
import { startWith } from './replaceable';
import type {
  HOCDef,
  DesignableComponents, HocDesign,
   Design, Token, HOD, AsTokenSpec, FinalDesign, FinalDomains, TokenMeta, ComposedToken,
} from './types';
import { $TokenSpec, HOC } from './types';
import { flowHoc, extendMeta } from './flowHoc';
import { addClasses } from './addClasses';
import { withHocDesign } from './withHocDesign';

/*
type ComposeValue<C extends DesignableComponents, D extends object> =  Record<string, ComposedToken<C, D>>;
type TokenSpecValue<C extends DesignableComponents, D extends object> = FinalDesign<C, D> | TokenMeta | Record<string, ComposedToken<C, D>>;
type TokenSpec<C extends DesignableComponents, D extends object> = Record<string, TokenSpecValue<C, D>>;
type TSEntry<C extends DesignableComponents, D extends object> = [string, TokenSpecValue<C, D>];

type ComposeEntry<C extends DesignableComponents, D extends object> = [ string, ComposeValue<C, D>];
const isComposeEntry = <C extends DesignableComponents, D extends object>(
  e: TSEntry<C, D>
): e is ComposeEntry<C, D> => e[0] === 'Compose';
*/

type TokenMember<C extends DesignableComponents, D extends object> = {
  Meta: TokenMeta,
  Design: Design<C, D>;
}

type TokenSpec



/**
 * @private
 * Collapses a token to an internal representation
 * @param spec 
 * @returns 
 */
const tokenSpecToMember = <C extends DesignableComponents = any, D extends object = any>(
  spec: TokenSpec<C, D>
): TokenMember<C, D> => {
  const { Meta, ...rest } = spec;
  const designs: Design<C>[] = Object.entries(rest).map(
    entry => {
      if (isComposeEntry(entry)) {
        const [_, composed] = entry;
        return { _: as(...Object.values(composed)) } as Design<C>;
      }
      const [_, design] = entry;
      return design as Design<C>;
    },
  );
  const Design = extendDesign(...designs);
  return { Meta, Design};
}

/**
 * Converts a list of token into a HOC which can be applied to
 * a component. Tokens to apply may be expressed in token object notation, as HOCs
 * or as className strings.
 *
 * @param specs
 * A list of token to be composed.
 *
 * @returns
 * A HOC which can be applied to a component.
 *
 * @category Token API
 */
function as(
  ...args$: Token[]

): HOC<any, any, any> {
  const args = args$.filter(Boolean) as Exclude<Token, undefined>[];
  const members: TokenSpec<any, any>[] = args.reduce(
    (acc, arg) => {
      if (typeof arg === 'function' || typeof arg === 'string') {
        if (typeof arg === 'function' && arg.members) {
          return [...acc, ...arg.members];
        }
        return [...acc, {
          Core: {
            _: arg,
          }
        }];
      }
      return [...acc, arg];
    },
    [] as TokenSpec<any, any>[],
  );
  const asHoc: TokenHOC = Component => {
    const 
    const designs = members.(
      (acc, member)
    )


  };
  asHoc.members = members;
  return asHoc;

        /*
      if (typeof arg === 'function') {
        if (arg.members) {
          return [...acc, ...arg.members];
        } 
        else {
          const spec: Partial<TokenSpec<any, any>> = {
            Core: {
              _: arg,
            } 
          };
          return [...acc, spec]
        };
      }
      return [...acc];
    },
    [] as Partial<TokenSpec<any, any>>[],
  );
        */




      if (typeof arg === 'function' || typeof arg === 'undefined') return arg;
      if (typeof arg === 'string') return addClasses(arg);
      const specTokens: HOCDef[] = [];
      const keys = Object.getOwnPropertyNames(arg);
      specTokens.push(...keys
        .map(domainName => getHocForDomain(
          domainName,
          arg[domainName as keyof Omit<typeof arg, typeof $TokenSpec>],
        )));

      if (arg.Flow) {
        return arg.Flow(...specTokens);
      }
      return flowHoc(...specTokens);
    }
  );
  return flowHoc(...tokens);
}

/**
 * Applies a design to a component.
 *
 * @param design
 * The design to apply.
 *
 * @returns
 * A HOC which applies the design.
 *
 * @category Design API
 */
function withDesign<C extends DesignableComponents = any, D extends object = any>(
  design: Design<C, D>
): HOC {
  const hocDesign: HocDesign<C> = Object.keys(design)
    .filter(k => k !== '_')
    .reduce(
      (d, k) => ({
        ...d,
        [k]: as(design[k]),
      }),
      {} as HocDesign<any>
    );
  return flowHoc(
    as(design._),
    withHocDesign(hocDesign)
  );
  // return withHocDesign(hocDesign);
}

/**
 * Customizer for merging two token specifications.
 */
const tokenMergeCustomizer = (...args: any) => {
  const stack = args[5];
  const [a, b, key] = args;
  if (stack.size === 0) {
    if (key === 'Meta') return extendMeta(a, b);
    if (key === 'Flow') {
      if (a && b) return flow(a, b);
      if (a) return a;
      if (b) return b;
    }
    return undefined;
  }
  if (!a) return b;
  if (!b) return a;
  return as(a, b);
};

/**
 * Alias for `extendDomain`.
 *
 * @see `extendDomain`
 * @category Design API
 */
function extendDesign<C extends DesignableComponents, D extends object = any>(
  ...designs: Design<C, D>[]
): Design<C, D> {
  return mergeWith({}, ...designs, (a: any, b: any) => (a && b ? as(a, b) : undefined));
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
 *
 * @category Token API
 */
const extendDomain = extendDesign;

/**
 * Takes a set of designs or HODs and returns a single HOD which extends
 * its argument (a design) with the supplied designs. HODs in the argument
 * list will be converted to designs by invoking them on an empty design.
 *
 * @param dx
 * List of designs or HODs which will be used as extensions.
 *
 * @returns
 * A HOD which will extend the base design with the supplied designs.
 *
 * @category Design API
 */
const extendDesignWith = (
  ...dx: (Design | HOD<any, any>)[]
) => (
  d?: Design
) => extendDesign(d || {}, ...dx.map(
  dx$ => (typeof dx$ === 'function' ? dx$() : dx$)
));

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
 * on(FooClean)(vitalFoo.Default, 'bar');
 * ```
 * is equivalent to
 * ```
 * as(startWith(FooClean), vitalFoo.Default, 'bar');
 * ```
 *
 * @category Token API
 */
const on = (
  CleanComponent: ComponentType<any>
) => <C extends DesignableComponents, D extends object = any>(
  ...specs: Token[]
) => as(
    startWith(CleanComponent),
    ...specs
  );

/**
 * Used to create a token specification.
 *
 * A token specification is an object which organizes Token HOCs into "domains" which
 * can then be selectively overridden. With the exception of certain [[ReservedDomains]],
 * each domain is a [[Design]], defining a set of HOCs which should be applied to
 * the individual design keys (or slots) in the target component.
 *
 * Normally, each component will use this create its own `as...Token` function in order
 * to ensure type safety for the keys in the design.
 *
 * @param d
 * If specified, defines a circumscribed set of allowed token domains.  If omitted, a single
 * 'Core' domain will be allowed.  The resulting function will produce a token specification
 * in which all domains are guaranteed to be present (those which were not defined will be
 * empty objects). The order of the domains is consistent and defined by the order of the keys
 * in this parameter.
 *
 * @returns
 * Function which receives a set of partial token specifications and returns a normalized token
 * specification created by merging those partials.  Each parameter may be:
 * - a partial tokens specification object, in which case the keys must belong to the set of
 *   allowed domains.  Keys will be re-ordered to match the canonical order, and missing keys
 *   will be supplied.
 * - a string, which will be treated as a set of classes to be applied to the `_` key of the
 *   `Core` domain.  The `_` key in a design applies HOCs or classes to the component as a
 *   whole rather than one of its slots.
 * - a function, which will be treated as a HOC to be applied to the `_` key of the `Core`
 *   domain.
 *
 * @example
 * Create an `asTokenSpec` utility which restricts domains:
 * ```
 * const domains = {
 *   Core: any,
 *   Theme: any,
 *   Layout: any,
 * };
 * const asMyTokenSpec = <
 *   C extends DesignableComponents
 * >() => asTokenSpec<C, DefaultDomains>(domains);
 * ```
 * And use it to create an `as...Token` utility which restricts domains.
 * ```
 * type FooComponents = {
 *   Wrapper: ComponentOrTag<any>,
 *   Title: ComponentOrTag<any>,
 *   Body: ComponentOrTag<any>,
 *  };
 * const asFooToken = asMyTokenSpec<FooComponents>();
 * ```
 *
 * @category Token API
 */
const asTokenSpec = <
  C extends DesignableComponents,
  D extends object = { Core: any },
  >(d: D = { Core: undefined } as D): AsTokenSpec<C, D> => (...specs) => {
    const spec: FinalDomains<C, D> = Object.keys(d || {}).reduce(
      (acc, next) => ({
        ...acc,
        [next]: {},
      }), {},
    );
    spec.Compose = {};
    spec.Flow = undefined;
    spec.Meta = {};
    const coreDomain = Object.keys(d)[0];
    const normalSpecs = specs.map(s => (
      typeof s === 'string' || typeof s === 'function' ? { [coreDomain]: { _: s } } : s
    ));
    mergeWith(spec, ...normalSpecs, tokenMergeCustomizer);
    return { ...spec, [$TokenSpec]: true } as TokenSpec<C, D>;
  };

export {
  asTokenSpec,
  as,
  on,
  withDesign,
  extendDesign,
  extendDomain,
  extendDesignWith,
};

/**
 * Type guard to ensure that a `Token` is a `TokenSpec`.
 *
 * @param a
 * The Token to test.
 *
 * @category Token API
 */
export const isTokenSpec = (a: Token): a is TokenSpec<any, any> => (
  typeof a !== 'function' && typeof a !== 'string'
);
