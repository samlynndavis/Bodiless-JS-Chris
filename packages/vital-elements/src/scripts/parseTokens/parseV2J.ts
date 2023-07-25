/* eslint-disable no-console */
import {
  Data, ColorTargets,
  Collections, isColorVariable, ColorVariable,
  isComponentVariable, FigmaVariableInterface, ComponentVariable
} from './types';
import { findVariables, logErrors, writeTokenCollection } from './util';

const getColorTokensForVariable = (next: ColorVariable): Record<string, string> => {
  let result: Record<string, string> = {};
  if (next.isInteractive) {
    result = Object.values(ColorTargets).reduce(
      (tokenAcc, colorTarget) => {
        next.setInteractiveTarget(colorTarget);
        return next.parsedValue ? {
          ...tokenAcc,
          [next.vitalName]: next.parsedValue,
        } : tokenAcc;
      }, {}
    );
  } else if (next.parsedValue) {
    result = {
      [next.vitalName]: next.parsedValue,
    };
  }
  logErrors(next);
  return next.errors.size === 0 ? result : {};
};

const getTokensForComponent = (
  vars: FigmaVariableInterface[], semantic?: Record<string, string>
) => vars.reduce(
  (acc, next) => {
    let result: Record<string, string> = acc;
    const value = next.validatedValue(semantic && Object.keys(semantic));
    if (value) {
      result = {
        ...acc,
        [next.vitalName]: value,
      };
    }
    logErrors(next);
    return result;
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
