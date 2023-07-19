/* eslint-disable no-console */
import fs from 'fs';

const args = {
  jsonFile: 'v2j.json',
  brand: 'White Label',
};

enum Collections {
  Core = 'Core Values',
  Brand = 'Brand Tokens',
  Device = 'Device Tokens',
}

enum ColorTargets {
  Interactive = 'Interactive',
  Border = 'Border',
  Background = 'Background',
  Text = 'Text',
}

enum ColorStates {
  Idle = 'Idle',
  Hover = 'Hover',
  Disabled = 'Disabled',
  Pressed = 'Pressed',
  Focus = 'Focus',
}

const TwColorTargetPrefixes: Partial<Record<ColorTargets, string>> = {
  Border: 'border-',
  Background: 'bg-',
  Text: 'text-',
};

const TwColorStatePrefixes: Partial<Record<ColorStates, string>> = {
  Idle: '',
  Hover: 'hover:',
  // @todo Is there a tw resposive variant for disabled?
  Disabled: 'aria-disabled:',
  Pressed: 'active:', // or should this be aria-pressed?
  Focus: 'focus:',
};

type Data = {
  version: string,
  collections: Collection[],
};

type Mode = {
  name: string,
  variables: Variable[],
};

type AliasValue = {
  collection: string,
  name: string,
};

type Variable = {
  name: string,
  type: string,
  isAlias: boolean,
};

type AliasVariable = Variable & {
  value: AliasValue,
};

const isAliasVariable = (v: Variable): v is AliasVariable => v.isAlias;

type Collection = {
  name: string,
  modes: Mode[],
};

const readData = async (file: string): Promise<Data> => {
  const json = await fs.promises.readFile(file);
  return JSON.parse(json.toString());
};

const toVitalTokenName = (exportName: string, typePrefix: ColorTargets|'' = '') => {
  const cleanedName = exportName.split('/').slice(2).map(s => s.replace(/[ ]/g, '')).join('');
  return `${typePrefix}${cleanedName}`;
};

const toTwColorName = (
  aliasName: string,
  type: ColorTargets,
  state: ColorStates = ColorStates.Idle,
): string => {
  const cleanedName = aliasName.split('/').slice(1).join('/').replace(/[/ ]/g, '-')
    .toLowerCase();
  const statePrefix = TwColorStatePrefixes[state];
  const typePrefix = TwColorTargetPrefixes[type];
  return `${statePrefix}${typePrefix}${cleanedName}`;
};

const isInteractive = (exportName: string) => exportName.split('/')[2] === ColorTargets.Interactive;
const isColorTarget = (
  s: string
): s is ColorTargets => Object.keys(TwColorTargetPrefixes).includes(s);

const isColorState = (
  s: string
): s is ColorStates => Object.values(ColorStates).includes(s as ColorStates);

export const getSemanticColors = (data: Data, brand: string): Record<string, string> => {
  const brandTokens = data.collections.find(c => c.name === Collections.Brand);
  const colors = brandTokens?.modes.find(b => b.name === brand);
  const semanticColors = colors?.variables.filter(v => /^Semantic/.test(v.name));
  const result = semanticColors?.reduce((acc, next) => {
    if (!isAliasVariable(next)) {
      console.warn('Non Alias Variable ', next.name);
      return acc;
    }
    if (next.value.collection !== Collections.Core) {
      console.warn('Non Core Alias ', next.name, next.value.collection);
      return acc;
    }
    if (isInteractive(next.name)) {
      const segments = next.name.split('/');
      const colorState = segments[segments.length - 1];
      if (!isColorState(colorState)) {
        console.warn('Invalid color state', colorState, 'in', next.name);
        return acc;
      }
      const tokens = Object.keys(TwColorTargetPrefixes).reduce(
        (tokenAcc, ColorTarget) => ({
          ...tokenAcc,
          [toVitalTokenName(next.name, ColorTarget as ColorTargets)]:
              toTwColorName(next.value.name, ColorTarget as ColorTargets, colorState),
        }), {}
      );
      return {
        ...acc,
        ...tokens,
      };
    }
    const ColorTarget = next.name.split('/')[2];
    if (!isColorTarget(ColorTarget)) {
      console.warn('Invalid color type', ColorTarget, 'in', next.name);
      return acc;
    }
    return {
      ...acc,
      [toVitalTokenName(next.name)]: toTwColorName(next.value.name, ColorTarget),
    };
  }, {});
  console.log(result);
  return result || {};
};

const main = async () => {
  const data = await readData(args.jsonFile);
  getSemanticColors(data, args.brand);
};

main();
