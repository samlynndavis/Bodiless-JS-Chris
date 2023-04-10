/**
 * Copyright © 2022 Johnson & Johnson
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

import GenericTemplateClean from './GenericTemplateClean';
import vitalGenericTemplate from './tokens';
import type { GenericTemplateComponents } from './types';

export const knapsackGenericTemplateSpec: KnapsackBodilessSpec<GenericTemplateComponents> = {
  tokens: vitalGenericTemplate,
  tokensExportName: 'vitalGenericTemplate',
  component: GenericTemplateClean,
  componentExportName: 'GenericTemplateClean',
  slots: {
    TopContent: {
      title: 'Top Content',
      description: 'The Top Content section of the Generic Template',
      allowedPatternIds: ['font-size', 'text-decoration', 'typography', 'color', 'card'],
    },
    Content: {
      title: 'Content',
      description: 'The Central Section of the Generic Template',
      allowedPatternIds: ['font-size', 'text-decoration', 'typography', 'color', 'card'],
    },
    BottomContent: {
      title: 'Bottom Content',
      description: 'The Bottom Content of the Generic Template',
      allowedPatternIds: ['font-size', 'text-decoration', 'typography', 'color', 'card'],
    }
  },
};
