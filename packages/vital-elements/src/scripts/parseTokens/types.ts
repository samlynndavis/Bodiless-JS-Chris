export enum Collections {
  Core = 'Core Values',
  Brand = 'Brand Tokens',
  Device = 'Device Tokens'
}

export enum Brands {
  Kenvue = 'White Label',
  Motrin = 'Motrin',
}

export enum Types {
  Color = 'color',
}

export enum Levels {
  Component = 'Components',
  Semantic = 'Semantic',
  Core = 'Core',
}

export const isLevel = (l: string): l is Levels => Object.values(Levels).includes(l as Levels);

export enum ColorTargets {
  Border = 'Border',
  Background = 'Background',
  Text = 'Text',
  Scrollbar = 'Scrollbar'
}
export const isColorTarget = (
  t: string
): t is ColorTargets => Object.values(ColorTargets).includes(t as ColorTargets);

export enum ColorStates {
  Idle = 'Idle',
  Hover = 'Hover',
  Disabled = 'Disabled',
  Pressed = 'Pressed',
  Focus = 'Focus'
}

export const TwColorTargetPrefixes: Record<ColorTargets, string> = {
  Border: 'border-',
  Background: 'bg-',
  Text: 'text-',
  Scrollbar: 'scrollbar-',
};

export const TwColorStatePrefixes: Partial<Record<ColorStates, string>> = {
  Idle: '',
  Hover: 'hover:',
  // @todo Is there a tw resposive variant for disabled?
  Disabled: 'aria-disabled:',
  Pressed: 'active:',
  Focus: 'focus:',
};

export type Data = {
  version: string;
  collections: Collection[];
};

export type Mode = {
  name: string;
  variables: Variable[];
};

export type AliasValue = {
  collection: string;
  name: string;
};

export type Variable = {
  name: string;
  type?: string;
  isAlias?: boolean;
  collection?: string;
  mode?: string;
  value?: any;
};

export type AliasVariable = Omit<Variable, 'value'> & {
  value: AliasValue;
};

export const isAliasVariable = (v?: Variable): v is AliasVariable => Boolean(v?.isAlias);

type Collection = {
  name: string;
  modes: Mode[];
};
