/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  stylable, addClasses, removeClasses,
  addClassesIf,
  removeClassesIf,
} from './FClasses';

import type {
  StylableProps,
} from './FClasses';

import addProps, { addPropsIf } from './addProps';
import {
  applyDesign,
  designable,
  extendDesignable,
  withFinalDesign,
  varyDesign,
  varyDesigns,
  extendDesigns
} from './Design';

import type {
  Designable,
  DesignableProps,
  DesignableComponentsProps,
  DesignableComponents,
} from './types';
import {
  flowIf, hasProp, withoutProps, withOnlyProps, replaceOnEffect,
  withDisplayName, or, and, not, replaceWith, startWith, remove, asComponent,
} from './hoc-util';
import type { Condition } from './hoc-util';
import Fragment from './Fragment';
import withDesignAt from './withDesignAt';
import { extendDesign } from './tokenSpec';

export * from './StyledHTML';

export { asToken, withTokenFilter, extendMeta } from './Tokens';
export * from './types';
export * from './tokenSpec';

export { withShowDesignKeys } from './Context';

export {
  addProps,
  addPropsIf,
  stylable,
  addClasses,
  removeClasses,
  withFinalDesign,
  withDesignAt,
  applyDesign,
  replaceWith,
  replaceOnEffect,
  startWith,
  remove,
  flowIf,
  hasProp,
  withoutProps,
  withOnlyProps,
  designable,
  extendDesignable,
  varyDesign,
  varyDesigns,
  extendDesign,
  extendDesigns,
  asComponent,
  addClassesIf,
  removeClassesIf,
  Fragment,
  withDisplayName,
  and,
  or,
  not,
};

export type {
  StylableProps,
  Designable,
  DesignableProps,
  DesignableComponentsProps,
  DesignableComponents,
  Condition,
};
