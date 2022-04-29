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

import { withNodeKey } from '@bodiless/core';
import { as } from '@bodiless/fclasses';
import {
  withSingleAllowedTag,
  withMultipleAllowedTags,
} from '@bodiless/filtering';
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';
import { vitalFilter } from '../../Filter';
import { asFilterByGroupToken } from '../FilterByGroupClean';
import { FilterByGroupNodeKeys } from './constants';

const Default = asFilterByGroupToken({
  Components: {
    Filter: vitalFilter.Default,
  },
  Layout: {
    Wrapper: 'flex flex-col lg:flex-row lg:min-h-screen',
    FilterHeader: 'flex flex-col w-full lg:flex-row lg:justify-between lg:items-center',
    ResetButton: 'self-start',
  },
  Spacing: {
    Wrapper: 'my-4',
    FilterWrapper: 'lg:w-1/3 lg:mr-5 lg:rtl:ml-5 lg:rtl:mr-0',
    FilterTitle: 'my-2 lg:my-0',
    ContentWrapper: 'w-full',
    ResetButton: 'my-2',
  },
  Theme: {
    FilterWrapper: vitalColor.BgPrimaryPage,
    FilterHeader: 'p-2',
    FilterTitle: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalTextDecoration.Bold,
      'text-xl',
    ),
    ResetButton: vitalTextDecoration.Underline,
  },
  Schema: {
    Filter: withNodeKey(FilterByGroupNodeKeys.Filter),
  },
});

const SiteWide = asFilterByGroupToken({
  ...Default,
  Schema: {
    Filter: withNodeKey({ nodeKey: FilterByGroupNodeKeys.Filter, nodeCollection: 'site' }),
  },
});

const WithMultipleAllowedTags = asFilterByGroupToken({
  Core: {
    _: withMultipleAllowedTags,
  },
});

const WithSingleAllowedTag = asFilterByGroupToken({
  Core: {
    _: withSingleAllowedTag,
  },
});

export default {
  Default,
  SiteWide,
  WithMultipleAllowedTags,
  WithSingleAllowedTag,
};
