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
import { vitalContentListingFilters } from '../../ContentListingFilters';
import { vitalContentListingFlowContainer } from '../../ContentListingFlowContainer';
import { asContentListingToken } from '../ContentListingClean';
import { ContentListingNodeKeys } from './constants';

const Default = asContentListingToken({
  Components: {
    Content: vitalContentListingFlowContainer.Default,
    Filters: vitalContentListingFilters.Default,
  },
  Schema: {
    Content: withNodeKey(ContentListingNodeKeys.ContentListing),
  },
  Spacing: {
    FilterWrapper: 'my-4',
  },
});

const WithMultipleAllowedTags = asContentListingToken({
  Core: {
    Filters: vitalContentListingFilters.WithMultipleAllowedTags,
  },
});

const WithSingleAllowedTag = asContentListingToken({
  Core: {
    Filters: vitalContentListingFilters.WithSingleAllowedTag,
  },
});

export default {
  Default,
  WithMultipleAllowedTags,
  WithSingleAllowedTag,
};
