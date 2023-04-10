/**
 * Copyright © 2023 Johnson & Johnson
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
import type { KnapsackBodilessSpec } from '@bodiless/knapsack-renderer';

import ButtonClean from './ButtonClean';
import type { ButtonComponent } from './ButtonClean';
import vitalButtons from './tokens';

export const knapsackButtonSpec: KnapsackBodilessSpec<ButtonComponent> = {
  tokens: vitalButtons,
  tokensExportName: 'vitalButtons',
  component: ButtonClean,
  componentExportName: 'ButtonClean',
  slots: {
    Icon: {
      title: 'Button Icon',
      description: 'Icon to be use in Button Component',
      allowedPatternIds: ['font-size'],
    },
    Body: {
      title: 'Button Body',
      description: 'The main content of a button',
      allowedPatternIds: ['font-size', 'text-decoration', 'typography', 'color'],
    },
  },
};
