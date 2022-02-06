/**
 * Copyright © 2021 Johnson & Johnson
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

import React from 'react';
import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';
import union from 'lodash/union';
import flow from 'lodash/flow';
import identity from 'lodash/identity';
import type {
  TokenDef, HOCBase, ComponentOrTag, ComponentWithMeta, TokenMeta,
  HOC, TokenFilterTest, AsToken as AsTokenBase,
} from './types';

const isToken = (def: TokenDef<any, any, any>) => typeof def === 'function';

// Custom merge behavior for token categories.
function mergeMeta(objValue:any, srcValue:any) {
  if (isArray(objValue) && isArray(srcValue)) {
    return union(objValue, srcValue);
  }
  return undefined;
}

/**
 * @private
 * Enhances an HOC so as to reserve metadata attached to the component it wraps.
 */
const preserveMeta = (hoc: HOCBase): HOCBase => <P extends object, Q extends object = P>(
  Component: ComponentOrTag<P>,
): ComponentWithMeta<Q> => {
  const NewComponent = hoc(Component) as ComponentWithMeta<Q>;
  const finalMeta = mergeWith({}, Component, NewComponent, mergeMeta);
  return Object.assign(NewComponent, finalMeta);
};

/**
 * @private
 * Attaches metadata to a component.
 *
 * @param meta The metadata to attach.
 */
export const withMeta = (meta: TokenMeta): HOCBase => Component => {
  const WithMeta = (props: any) => <Component {...props} />;
  return Object.assign(WithMeta, meta);
};

type TokenWithParents = HOC & {
  parents?: HOC[],
};

/**
 * @private
 *
 * Flattens an array of tokens recursively. Each token in the flattened array has
 * an additional "parents" property listing the tokens to which it belongs.
 * @param tokens The list of tokens to flatten
 * @param parents The current list of parents
 */
const flattenTokens = <P extends object>(
  tokens: HOC[] = [], parents: HOC[] = [],
): TokenWithParents[] => tokens.reduce(
    (acc, token) => [
      ...acc,
      ...flattenTokens(token.members, [...parents, token]),
      // exclude any token with members, bc we will already be applying the members.
      ...token.members ? [] : [Object.assign(token, { parents })],
    ],
    [] as TokenWithParents[],
  );

/**
 * @private
 *
 * Generates a token fliter which applies to a token and any of its parents.
 * Used to ensure that a token is removed if any of its parents match
 * the filter criteria.
 *
 * @param filter
 * The token filter to apply
 *
 * @return
 * A TokenFilter which which applies the supplied filter to a HOC and
 * all its parents.
 */
const createTokenAndParentFilter = <P extends object>(
  filter: TokenFilterTest,
): TokenFilterTest => (token: TokenWithParents): boolean => (token.parents || []).reduce(
    (result, parent) => result && filter(parent),
    filter(token),
  );

/**
 * Recursively filters a list of tokens by applying any filters
 * @param tokens The list of tokens to filter.
 * @return A flat list of filtered tokens
 */
const filterMembers = <P extends object>(tokens: HOC[]): HOC[] => {
  const filtered: HOCBase[] = [];
  let rest = flattenTokens(tokens).reverse();
  while (rest.length > 0) {
    const [next, ...nextRest] = rest;
    rest = nextRest;
    if (next.filter) {
      rest = rest.filter(createTokenAndParentFilter(next.filter));
    }
    filtered.push(next);
  }
  return filtered.reverse();
};

type AsToken<B = {}> = AsTokenBase<B> & {
  meta: {
    term: (c: string) => (t: string) => TokenMeta;
    cat: (c: string) => TokenMeta;
  };
};

/**
 * Composes one or more tokens into a single token.
 *
 * Tokens will be composed left-to-right (in lodash "flow" order).
 *
 * You can also attach metadata to this token by providing plain TokenMeta
 * objects as arguments in addition to tokens.
 *
 * @see TokenProps
 * @see TokenDefinition
 *
 * @param tokens
 * List of tokens and token metadata objects to compose.
 *
 * @return
 * A composed token.
 */
const flowHoc: AsToken = (...args) => {
  // We allow "undefined" in args and simply ignore them.
  const args$ = args.filter(a => a !== undefined);
  const metaBits: TokenMeta[] = args$.filter(a => !isToken(a)) as TokenMeta[];
  const meta = mergeWith({}, ...metaBits, mergeMeta);
  const members: HOC[] = [
    ...args$.filter(a => isToken(a)) as HOC[],
    withMeta(meta),
  ];
  const hocs = filterMembers(members);
  const hocs$ = hocs.map(t => preserveMeta(t));
  return Object.assign(flow(hocs$), { meta, members, hocs });
};

/**
 * Creates a token filter (a special kind of token which, when composed with other tokens,
 * filters out those which match a provided test function.
 *
 * @param filter
 * The test function which will be used to determine whether tokens
 * should be filtered.
 *
 * @returns
 * A token filter.
 */
const withTokenFilter = <P extends object>(test: TokenFilterTest): HOC => (
  Object.assign(identity, { filter: test })
);

/**
 * Utilities for adding metadata to tokens.
 */
flowHoc.meta = {
  term: (c: string) => (t: string) => ({
    categories: {
      [c]: [t],
    },
  }),
  cat: (c: string) => ({
    categories: {
      [c]: [],
    },
  }),
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
const extendMeta = (
  ...args: (TokenMeta|undefined)[]
) => mergeWith({}, ...args.map(a => (a === undefined ? {} : a)), (objValue: any, srcValue: any) => {
  if (isArray(objValue) && isArray(srcValue)) {
    return union(objValue, srcValue);
  }
  return undefined;
});

export { flowHoc, withTokenFilter, extendMeta };
