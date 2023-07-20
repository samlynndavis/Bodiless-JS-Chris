/* eslint-disable no-console */
import {
  ColorTargets, TwColorTargetPrefixes, ColorStates, TwColorStatePrefixes
} from './types';

export class FigmaVariableName {
  protected segments: string[];

  constructor(name: string) {
    this.segments = name.split('/');
  }

  get isInteractive() {
    return this.segments[2] === ColorTargets.Interactive;
  }

  get target(): ColorTargets | undefined {
    for (let i = 2; i < this.segments.length; i += 1) {
      if (Object.keys(TwColorTargetPrefixes).includes(this.segments[i])) {
        return this.segments[i] as ColorTargets;
      }
    }
    // console.warn('No valid color target in', this.segments.join('/'));
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
