/* eslint-disable no-console */
import {
  ColorTargets, TwColorTargetPrefixes, ColorStates, TwColorStatePrefixes,
  Levels, isLevel, Variable, Collections, AliasValue, isColorTarget,
} from './types';

class FigmaVariable implements Variable {
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

  get isInteractive() {
    return this.segments[2] === 'Interactive';
  }

  get isComponentSpacing(): Boolean {
    if (this.segments.length < 2) return false;
    if (this.segments[0] !== Levels.Component) return false;
    const segment = this.segments[this.segments.length - 2];
    return (segment === 'Padding' || segment === 'Margin');
  }

  get level(): Levels|undefined {
    return isLevel(this.segments[0]) ? this.segments[0] : undefined;
  }

  get isComponent(): boolean {
    return this.segments[0] === Levels.Component;
  }

  get componentName(): string|undefined {
    if (this.isComponent) return this.segments[1].replace(/ /g, '').replace(/-/g, '_');
    return undefined;
  }

  get target(): ColorTargets | undefined {
    // Special cases for some components
    if (this.componentName === 'ScrollIndicator') return ColorTargets.Scrollbar;
    if (this.componentName === 'Divider') return ColorTargets.Border;
    if (isColorTarget(this.segments[2])) return this.segments[2];
    // For components, segments[2/3] can be a variant and/or subcomponent
    // so we have to look farther.
    if (this.isComponent) {
      if (isColorTarget(this.segments[3])) return this.segments[3];
      if (isColorTarget(this.segments[4])) return this.segments[4];
    }
    return undefined;
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
}

export default FigmaVariable;
