/* eslint-disable no-console */
import {
  ColorTargets, TwColorTargetPrefixes, ColorStates, TwColorStatePrefixes,
  Levels, isLevel, Variable, Collections, AliasValue, isColorTarget, SpacingTargets,
  isSpacingTarget,
  Data,
  isSpacingSide,
  TwSpacingPrefixes,
  SpacingSides,
  TwSpacingSidePrefixes,
  isAliasVariable,
  Types,
  FigmaVariableInterface,
  isSpacingVariable,
  isColorVariable,
} from './types';
import { findVariables } from './util';

class FigmaVariable implements Variable, FigmaVariableInterface {
  protected segments: string[];

  readonly name: string;

  readonly type?: string;

  readonly isAlias?: boolean;

  readonly collection?: Collections;

  readonly mode?: string;

  readonly value?: string|AliasValue;

  constructor(variable$: string|Variable) {
    const variable: Variable = typeof variable$ === 'string' ? { name: variable$ } : variable$;
    Object.assign(this, variable);
    this.name = variable.name;
    this.segments = this.name.split('/');
  }

  resolve(
    data: Data,
    params: Pick<Variable, 'mode'|'collection'> = {},
  ): FigmaVariable|undefined {
    const { mode, collection, name}= {
      ...this,
      ...params,
    };
    const condition = (v: Variable) => (
      (!mode || v.mode === mode)
      && (v.name === name)
      && (!collection || v.collection === collection)
    );
    const candidates = findVariables(data, condition);
    if (candidates.length > 1) {
      console.warn('Multiple resolutions for ', collection, mode, name);
    }
    if (candidates.length < 1) {
      console.warn('No resolutions for ', collection, mode, name);
      return undefined;
    }
    return new FigmaVariable(candidates[0]);
  }

  get isInteractive() {
    return this.segments[2] === 'Interactive';
  }

  get alias(): FigmaVariable|undefined {
    if (!isAliasVariable(this)) return undefined;
    return new FigmaVariable(this.value);
  }

  get isColor(): boolean {
    if (this.type !== Types.Color) return false;
    if (this.isCore) return true;
    if (!this.alias) {
      console.warn('Non alias semantic or component color', JSON.stringify(this));
      return false;
    }
    if (this.isComponent && !this.alias.isSemantic) {
      console.warn('Non semantic alias for component color', JSON.stringify(this));
      return false;
    }
    if (!isColorTarget(this.target)) {
      console.warn('Invalid target for color variable', JSON.stringify(this));
      return false;
    }
    return true;
  }

  get isComponent(): Boolean {
    return this.collection === Collections.Brand && this.level === Levels.Component;
  }

  get isCore(): Boolean {
    return this.collection === Collections.Core;
  }

  get isSemantic(): Boolean {
    return this.collection === Collections.Brand && this.level === Levels.Semantic;
  }

  toString() {
    return JSON.stringify(this);
  }

  get isSpacing(): boolean {
    if (!this.isComponent || !isSpacingTarget(this.target)) return false;
    if (!isAliasVariable(this)) {
      console.warn('Non-alias spacing variable', this);
      return false;
    }
    if (this.alias?.collection !== Collections.Core) {
      console.warn('Non-core alias for spacing variable', this);
      return false;
    }
    return true;
  }

  get level(): Levels|undefined {
    return isLevel(this.segments[0]) ? this.segments[0] : undefined;
  }

  get componentName(): string|undefined {
    if (this.isComponent) return this.segments[1]?.replace(/ /g, '').replace(/-/g, '_');
    return undefined;
  }

  protected findTarget(): [number, ColorTargets | SpacingTargets | undefined] {
    // Special cases for some components
    if (this.componentName === 'ScrollIndicator') return [-1, ColorTargets.Scrollbar];
    if (this.componentName === 'Divider') return [-2, ColorTargets.Border];

    // The target can be in segment 2, 3 or 4
    for (let s = 2; s <= 4; s += 1) {
      const seg = this.segments[s];
      if (isColorTarget(seg)) return [s, seg];
      // For no-component tokens, only color targets are supported and only in segment 2
      if (!this.isComponent) break;
      if (isSpacingTarget(seg)) return [s, seg];
    }
    return [-1, undefined];
  }

  get target(): ColorTargets | SpacingTargets | undefined {
    const [_, target] = this.findTarget();
    return target;
  }

  get state(): ColorStates | undefined {
    const state = this.segments[this.segments.length - 1];
    if (!Object.keys(TwColorStatePrefixes).includes(state)) {
      console.warn('Invalid color state in', this.segments.join('/'));
      return undefined;
    }
    return state as ColorStates;
  }

  toVitalTokenName(target?: ColorTargets) {
    const cleanedName = this.segments.slice(2).map(s => s.replace(/[ ]/g, '')).join('');
    return `${target || ''}${cleanedName}`;
  }

  toTwColorName(target: ColorTargets, state: ColorStates = ColorStates.Idle): string {
    const cleanedName = this.segments.slice(1).join('/').replace(/[/ ]/g, '-')
      .toLowerCase();
    const statePrefix = TwColorStatePrefixes[state];
    const typePrefix = TwColorTargetPrefixes[target];
    return `'${statePrefix}${typePrefix}${cleanedName}'`;
  }

  get spacingSide(): SpacingSides|undefined {
    const [s, target] = this.findTarget();
    if (!isSpacingTarget(target)) {
      console.warn('No spacing target for', this.name);
      return undefined;
    }
    const side = this.segments[s + 1];
    if (isSpacingSide(side)) return side;
    console.warn('No valid spacing side found for ', this.name);
    return SpacingSides.ALL;
  }

  get parsedValue(): string|undefined {
    if (isSpacingVariable(this)) {
      const prefix = `${TwSpacingPrefixes[this.target]}${TwSpacingSidePrefixes[this.spacingSide]}`;
      const valueSegments = this.alias.name.split('/');
      const value = valueSegments[valueSegments.length - 1];
      return `'${prefix}-${value}px'`;
    }
    if (isColorVariable(this) && this.isComponent) {
      const value = this.alias.toVitalTokenName(
        this.alias.isInteractive ? this.target : undefined
      );
      return `vitalColor.${value}`;
    }
    console.warn('Could not parse value of', this);
    return undefined;
  }
}

export default FigmaVariable;
