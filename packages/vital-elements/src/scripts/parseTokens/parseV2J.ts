/* eslint-disable no-console */
import { FigmaVariableName } from './FigmaVariableName';
import {
  Data, AliasVariable, TwColorTargetPrefixes, ColorTargets, Variable, isAliasVariable, Collections
} from './types';
import { writeTokenCollection } from './util';

const getColorTokensForVariable = (next: AliasVariable): Record<string, string> => {
  const name = new FigmaVariableName(next.name);
  const aliasName = new FigmaVariableName(next.value.name);
  if (name.isInteractive) {
    if (!name.state) return {};
    const tokens = Object.keys(TwColorTargetPrefixes).reduce(
      (tokenAcc, colorTarget) => ({
        ...tokenAcc,
        [name.toVitalTokenName(colorTarget as ColorTargets)]:
          aliasName.toTwColorName(colorTarget as ColorTargets)
      }), {}
    );
    return tokens;
  }
  if (!name.target) return {};
  return {
    [name.toVitalTokenName()]: aliasName.toTwColorName(name.target),
  };
};

/**
 * Recursively resolve a variable which may be an alias to anothr brand variable.
 *
 * @param v The variable to resolve.
 * @param vars The list of all variables.
 * @param depth The current depth (used to catch circular references).
 * @returns
 * The resolved variable, which is guaranteed to be a Core alias, or undefined if it
 * cannot be resolved.
 */
const resolveBrandAlias = (
  v?: Variable, vars?: Variable[], depth = 0
): AliasVariable|undefined => {
  if (!isAliasVariable(v)) {
    console.warn('Non Alias Variable', v?.name);
    return undefined;
  }
  if (v.value.collection === Collections.Core) return v;
  if (v.value.collection !== Collections.Brand) {
    console.warn('Non Brnd or Core Alias', v.value.collection);
    return undefined;
  }
  if (depth > 10) return undefined;
  const reference = vars?.find(v$ => v$.name === v.value.name);
  return resolveBrandAlias(reference, vars, depth + 1);
};

const getColorTokensForComponent = (
  vars: Variable[], semantic?: Record<string, string>
) => vars.reduce(
  (acc, next) => {
    if (next.type !== 'color') return acc;
    if (!isAliasVariable(next)) {
      console.warn('Non alias variable', JSON.stringify(next, undefined, 2));
      return acc;
    }
    if (next.value.collection !== Collections.Brand) {
      console.warn('Non brand alias', JSON.stringify(next, undefined, 2));
      return acc;
    }
    const name = new FigmaVariableName(next.name);
    const aliasName = new FigmaVariableName(next.value.name);
    const value = aliasName.toVitalTokenName(aliasName.isInteractive ? name.target : undefined);
    if (semantic && !semantic[value]) {
      console.warn('Missing semantic value', value);
      return acc;
    }
    return {
      ...acc,
      [name.toVitalTokenName()]: `vitalColor.${value}`,
    };
  },
  {},
);

export const getSemanticColors = (data: Data, brand: string): Record<string, string> => {
  const brandTokens = data.collections.find(c => c.name === Collections.Brand);
  const colors = brandTokens?.modes.find(b => b.name === brand);
  const semanticColors = colors?.variables.filter(v => /^Semantic/.test(v.name));
  const result = semanticColors?.reduce((acc, next) => {
    const resolved = resolveBrandAlias(next, semanticColors);
    if (!resolved) {
      console.warn('Could not resolve', JSON.stringify(next, undefined, 2));
      return acc;
    }
    return {
      ...acc,
      ...getColorTokensForVariable(resolved),
    };
  }, {});
  return result || {};
};

export const getComponentColors = (
  data: Data, brand: string,
): Record<string, Record<string, string>> => {
  console.log('brand', brand);
  const brandTokens = data.collections.find(c => c.name === Collections.Brand);
  const colors = brandTokens?.modes.find(b => b.name === brand);
  console.log(Object.keys(colors || {}));
  const componentColors = colors?.variables.filter(v => /^Components/.test(v.name));
  const semantic = getSemanticColors(data, brand);
  const components = (componentColors || []).reduce(
    (acc, next) => {
      const componentName = next.name.split('/')[1].replace(/ /g, '');
      return {
        ...acc,
        [componentName]: acc[componentName] ? [...acc[componentName], next] : [next],
      };
    }, {} as Record<string, Variable[]>
  );
  console.log('comps', components);
  const result = Object.keys(components)
    .reduce(
      (acc, next) => {
        const tokens = getColorTokensForComponent(components[next], semantic);
        if (Object.keys(tokens).length === 0) return acc;
        return {
          ...acc,
          [next]: tokens,
        };
      },
      {},
    );
  return result;
};

export const writeComponentTokens = async (
  components: Record<string, Record<string, string>>, libraryName: string = 'vital',
) => {
  const imports = {
    '../util': ['asTokenGroup'],
    './semantic': ['vitalColor'],
  };

  const promises = Object.keys(components).map(key => writeTokenCollection({
    imports,
    group: `${key}Element`,
    libraryName,
    tokens: components[key],
  }));

  return Promise.all(promises);
};
