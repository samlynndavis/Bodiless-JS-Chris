export interface FigmaVariableInterface extends Variable {
  isColor: boolean,
  isSpacing: boolean,
  target: ColorTargets | SpacingTargets | undefined,
}

export interface ColorVariable extends FigmaVariableInterface {
  target: ColorTargets,
  alias: ColorVariable,
}

export const isColorVariable = (v: FigmaVariableInterface): v is ColorVariable => v.isColor;

export interface SpacingVariable extends FigmaVariableInterface {
  target: SpacingTargets,
  spacingSide: SpacingSides,
  alias: FigmaVariableInterface,
}

export const isSpacingVariable = (v: FigmaVariableInterface): v is SpacingVariable => v.isSpacing;

export enum Collections {
  Core = 'Core Values',
  Brand = 'Brand Tokens',
  Device = 'Device Tokens'
}

export enum Brands {
  Kenvue = 'White Label',
  Motrin = 'Motrin',
}

/**
 * Figma variable types.
 */
export enum Types {
  Color = 'color',
  Number = 'number',
}

export enum Levels {
  Component = 'Components',
  Semantic = 'Semantic',
  Core = 'Core',
}

export const isLevel = (l?: string): l is Levels => Object.values(Levels).includes(l as Levels);

export enum ColorTargets {
  Border = 'Border',
  Background = 'Background',
  Text = 'Text',
  Scrollbar = 'Scrollbar'
}
export const isColorTarget = (
  t?: string
): t is ColorTargets => !!t && Object.values(ColorTargets).includes(t as ColorTargets);

export enum ColorStates {
  Idle = 'Idle',
  Hover = 'Hover',
  Disabled = 'Disabled',
  Pressed = 'Pressed',
  Focus = 'Focus'
}

export enum SpacingTargets {
  Padding = 'Padding',
  Margin = 'Margin',
}

export const isSpacingTarget = (
  t?: string
): t is SpacingTargets => !!t && Object.values(SpacingTargets).includes(t as SpacingTargets);

export const TwSpacingPrefixes: Record<SpacingTargets, string> = {
  Padding: 'p',
  Margin: 'm',
};

export enum SpacingSides {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom',
  X = 'X',
  Y = 'Y',
  ALL = 'ALL',
}
export const TwSpacingSidePrefixes: Record<SpacingSides, string> = {
  Left: 'l',
  Right: 'r',
  Top: 't',
  Bottom: 'b',
  X: 'x',
  Y: 'y',
  ALL: '',
};
export const isSpacingSide = (
  s?: string
): s is SpacingSides => Boolean(s && Object.values(SpacingSides).includes(s as SpacingSides));

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
