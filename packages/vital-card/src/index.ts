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
// import { TokenCollection } from '@bodiless/fclasses';
import vitalCard from './components/Card/tokens/vitalCard';
import CardClean, { CardComponents } from './components/Card/CardClean';

export * from './components/Card';
export * from './components/FlowContainer';

// @todo - Ivan please remove the `as`
// const tokens = vitalCard as unknown as TokenCollection<any, any>;

// @todo - Ivan please make sure `CardComponents` has type errors fixed
export const cardSpec: KnapsackBodilessSpec<CardComponents> = {
  tokens: vitalCard,
  tokensExportName: 'vitalCard',
  component: CardClean,
  componentExportName: 'CardClean',
  slots: {
    Title: {
      title: 'Title',
      description: 'The title of the card',
      allowedPatternIds: ['element'],
    },
    Body: {
      title: 'Body',
      description: 'The body of the card',
      allowedPatternIds: ['element'],
    },
    ContentWrapper: {
      title: 'Content Wrapper',
      description: 'The wrapper for the card content',
      allowedPatternIds: ['element'],
    }
  },
};
