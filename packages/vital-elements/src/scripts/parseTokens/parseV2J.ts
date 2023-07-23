/* eslint-disable no-console */
import FigmaVariable from './FigmaVariable';
import {
  Data, ColorTargets,
  Collections, isColorVariable, ColorVariable,
  isComponentVariable, FigmaVariableInterface, ComponentVariable
} from './types';
import { findVariables, logErrors, writeTokenCollection } from './util';

const getColorTokensForVariable = (next: ColorVariable): Record<string, string> => {
  if (!next.validate()) {
    logErrors(next);
    return {};
  }
  const alias = new FigmaVariable(next.value);
  if (next.isInteractive) {
    const tokens = Object.values(ColorTargets).reduce(
      (tokenAcc, colorTarget) => ({
        ...tokenAcc,
        [next.toVitalTokenName(colorTarget)]:
          alias.toTwColorName(colorTarget)
      }), {}
    );
    return tokens;
  }
  return {
    [next.toVitalTokenName()]: alias.toTwColorName(next.target),
  };
};

const getTokensForComponent = (
  vars: FigmaVariableInterface[], semantic?: Record<string, string>
) => vars.reduce(
  (acc, next) => {
    const value = next.parsedValue;
    if (!value) {
      logErrors(next);
      return acc;
    }
    if (isColorVariable(next)) {
      const key = value.replace('vitalColor.', '');
      if (semantic && !semantic[key]) {
        logErrors(next, [`Semantic token for value "${key}" not found`]);
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

export const getSemanticTokens = (data: Data, brand: string): Record<string, string> => {
  const semanticVars = findVariables(data, v => (
    v.collection === Collections.Brand
    && v.mode === brand
    && v.isSemantic
  ));
  const result = semanticVars.reduce((acc, next) => {
    const resolved = next.resolveSemanticAlias(semanticVars);
    if (!isColorVariable(resolved)) {
      logErrors(next, ['Resolved semantic variable is not a color']);
      return acc;
    }
    return {
      ...acc,
      ...getColorTokensForVariable(resolved),
    };
  }, {});
  return result || {};
};

export const getComponentTokens = (
  data: Data,
  brand: string,
  semanticTokens: Record<string, string>
): Record<string, Record<string, string>> => {
  const componentVars = findVariables(data, v => (
    v.collection === Collections.Brand
      && v.mode === brand
  )).reduce(
    (acc, v) => {
      if (!isComponentVariable(v)) return acc;
      return ({
        ...acc,
        [v.componentName]: acc[v.componentName] ? [...acc[v.componentName], v] : [v],
      });
    }, {} as Record<string, ComponentVariable[]>
  );
  const colors = Object.keys(componentVars)
    .reduce(
      (acc, next) => {
        const tokens = getTokensForComponent(componentVars[next], semanticTokens);
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
