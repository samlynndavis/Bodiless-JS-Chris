/* eslint-disable no-console */
import {
  ColorTargets, TwColorTargetPrefixes, ColorStates, TwColorStatePrefixes,
  Levels, isLevel, Variable, Collections, AliasValue, isColorTarget, SpacingTargets,
  isSpacingTarget,
  isSpacingSide,
  TwSpacingPrefixes,
  SpacingSides,
  TwSpacingSidePrefixes,
  isAliasVariable,
  Types,
  FigmaVariableInterface,
  isSpacingVariable,
  isColorVariable,
  ColorVariable,
  BORDER_RADIUS,
} from './types';

class FigmaVariable implements Variable, FigmaVariableInterface {
  protected segments: string[];

  readonly name: string;

  readonly type?: string;

  readonly isAlias?: boolean;

  readonly collection?: Collections;

  readonly mode?: string;

  readonly value?: string|AliasValue;

  readonly errors = new Set<string>();

  constructor(variable$: string|Variable) {
    const variable: Variable = typeof variable$ === 'string' ? { name: variable$ } : variable$;
    Object.assign(this, variable);
    this.name = variable.name;
    this.segments = this.name.split('/');
  }

  get isInteractive() {
    return this.segments[2] === 'Interactive';
  }

  resolveBrandAlias(
    vars: Variable[], v$?: FigmaVariableInterface, depth = 0
  ): ColorVariable|undefined {
    const v = v$ || this;
    if (!isColorVariable(v)) {
      this.errors.add('Attempt to resolve alias for non color variable');
      return undefined;
    }
    if (v.value.collection === Collections.Core) return v;
    if (v.value.collection !== Collections.Brand) {
      this.errors.add(`Attempt to resolve alias to ${v.value.collection}`);
      return undefined;
    }
    if (depth > 10) {
      this.errors.add('Max depth exceeded resolving alias');
      return undefined;
    }
    const reference = vars?.find(vv => vv.name === v.value.name);
    if (!reference) {
      this.errors.add(`Reference not found "${v.value.collection}/${v.value.name}"`);
      return undefined;
    }
    return this.resolveBrandAlias(vars, new FigmaVariable(reference), depth + 1);
  }

  get alias(): FigmaVariable|undefined {
    if (!isAliasVariable(this)) return undefined;
    return new FigmaVariable(this.value);
  }

  get isColor(): boolean {
    return (this.type === Types.Color);
  }

  validate(): boolean {
    if (this.isComponent) {
      if (!this.componentName) {
        this.errors.add('Component variable has no component');
        return false;
      }
    }
    if (isSpacingVariable(this)) {
      if (!isAliasVariable(this)) {
        this.errors.add(`Spacing value "${this.value}" is not an alias`);
        return false;
      }
      if (this.alias?.collection !== Collections.Core) {
        this.errors.add(`Spaing alias collection "${this.alias.collection}" is not core`);
        return false;
      }
      if (!isSpacingTarget(this.target)) {
        this.errors.add(`Invalid spacing target ${this.target}`);
      }
      return true;
    }
    if (isColorVariable(this)) {
      if (!this.alias) {
        this.errors.add(`Color value "${this.value}" is not an alias`);
        return false;
      }
      if (this.isInteractive && !this.state) {
        this.errors.add('Interactive color has no state');
        return false;
      }
      if (this.isComponent) {
        if (!this.alias.isSemantic) {
          this.errors.add(`Component color alias "(${this.alias.name}" is not semantic`);
          return false;
        }
        if (!isColorTarget(this.target)) {
          this.errors.add(`Component color target "${this.target}" invalid`);
          return false;
        }
      }
      return true;
    }
    this.errors.add('Could not determine variable tupe');
    return false;
  }

  get isComponent(): boolean {
    if (this.collection !== Collections.Brand || this.level !== Levels.Component) return false;
    return true;
  }

  get isCore(): Boolean {
    return this.collection === Collections.Core;
  }

  get isSemantic(): boolean {
    return this.collection === Collections.Brand && this.level === Levels.Semantic;
  }

  toString() {
    return JSON.stringify(this);
  }

  get isSpacing(): boolean {
    return this.isComponent && isSpacingTarget(this.target);
  }

  get isRadius(): boolean {
    return this.isComponent && this.target === BORDER_RADIUS;
  }

  get level(): Levels|undefined {
    return isLevel(this.segments[0]) ? this.segments[0] : undefined;
  }

  get componentName(): string {
    return this.segments[1]?.replace(/ /g, '').replace(/-/g, '_');
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

  get target(): ColorTargets | SpacingTargets | typeof BORDER_RADIUS | undefined {
    const [_, target] = this.findTarget();
    return target;
  }

  get state(): ColorStates | undefined {
    const state = this.segments[this.segments.length - 1];
    if (!Object.keys(TwColorStatePrefixes).includes(state)) {
      this.errors.add('Invalid color state in');
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
    const [s] = this.findTarget();
    const side = this.segments[s + 1];
    if (isSpacingSide(side)) return side;
    this.errors.add('No valid spacing side found');
    return SpacingSides.ALL;
  }

  get parsedValue(): string|undefined {
    if (!this.validate()) return undefined;
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
    this.errors.add('Could not parse value');
    return undefined;
  }
}

export default FigmaVariable;
