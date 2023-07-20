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

export enum ColorTargets {
  Interactive = 'Interactive',
  Border = 'Border',
  Background = 'Background',
  Text = 'Text'
}

export enum ColorStates {
  Idle = 'Idle',
  Hover = 'Hover',
  Disabled = 'Disabled',
  Pressed = 'Pressed',
  Focus = 'Focus'
}

export const TwColorTargetPrefixes: Partial<Record<ColorTargets, string>> = {
  Border: 'border-',
  Background: 'bg-',
  Text: 'text-',
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
  type: string;
  isAlias: boolean;
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
