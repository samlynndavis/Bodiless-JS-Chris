/* eslint-disable no-console */
import FigmaVariable from './FigmaVariable';
import {
  Data, ColorTargets,
  Variable, Collections, isColorTarget, isColorVariable, ColorVariable, isComponentVariable
} from './types';
import { findVariables, logErrors, writeTokenCollection } from './util';

const getColorTokensForVariable = (next: ColorVariable): Record<string, string> => {
  if (!isColorVariable(next)) {
    logErrors(next);
    return {};
  }
  const alias = new FigmaVariable(next.value);
  if (next.isInteractive) {
    if (!next.state) return {};
    const tokens = Object.values(ColorTargets).reduce(
      (tokenAcc, colorTarget) => ({
        ...tokenAcc,
        [next.toVitalTokenName(colorTarget)]:
          alias.toTwColorName(colorTarget)
      }), {}
    );
    return tokens;
  }
  if (!isColorTarget(next.target)) return {};
  return {
    [next.toVitalTokenName()]: alias.toTwColorName(next.target),
  };
};

const getColorTokensForComponent = (
  vars: Variable[], semantic?: Record<string, string>
) => vars.reduce(
  (acc, next$) => {
    const next = new FigmaVariable(next$);
    const value = next.parsedValue;
    if (!value) {
      logErrors(next);
      return acc;
    }
    if (isColorVariable(next)) {
      const key = value.replace('vitalColor.', '');
      if (semantic && !semantic[key]) {
        console.warn('Missing semantic value', value);
        return acc;
      }
    }
    return {
      ...acc,
      [next.toVitalTokenName()]: value,
    };
  },
  {},
);

export const getSemanticColors = (data: Data, brand: string): Record<string, string> => {
  const semanticColors = findVariables(data, v => (
    v.collection === Collections.Brand
    && v.mode === brand
    && v.isSemantic
  ));
  const result = semanticColors?.reduce((acc, next) => {
    if (!isColorVariable(next)) {
      logErrors(next);
      return acc;
    }
    const resolved = next.resolveBrandAlias(semanticColors);
    if (!resolved) {
      logErrors(next);
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
  data: Data,
  brand: string,
  semanticTokens: Record<string, string>
): Record<string, Record<string, string>> => {
  const componentVars = findVariables(data, v => (
    v.collection === Collections.Brand
      && v.mode === brand
      && v.isComponent
  )).reduce(
    (acc, v) => {
      if (!isComponentVariable(v)) {
        logErrors(v);
        return acc;
      }
      return {
        ...acc,
        [v.componentName]: acc[v.componentName] ? [...acc[v.componentName], v] : [v],
      };
    }, {} as Record<string, Variable[]>
  );
  const colors = Object.keys(componentVars)
    .reduce(
      (acc, next) => {
        const tokens = getColorTokensForComponent(componentVars[next], semanticTokens);
        if (Object.keys(tokens).length === 0) return acc;
        return {
          ...acc,
          [next]: tokens,
        };
      },
      {},
    );
  return colors;
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
