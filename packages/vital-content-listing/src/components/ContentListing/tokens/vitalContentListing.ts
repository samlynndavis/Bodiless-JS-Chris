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
import { vitalImage } from '@bodiless/vital-image';
import { vitalContentListingFilters } from '../../ContentListingFilters';
import { vitalContentListingFlowContainer } from '../../ContentListingFlowContainer';
import { asContentListingToken } from '../ContentListingClean';
import { ContentListingNodeKeys } from './constants';

const Default = asContentListingToken({
  // ...vitalGenericTemplate.Default,
  Components: {
    // ...vitalGenericTemplate.Default.Components,
    HeroImage: vitalImage.Default,
    ContentListing: vitalContentListingFlowContainer.Default,
    Filter: vitalContentListingFilters.Default,
  },
  Schema: {
    // ...vitalGenericTemplate.Default.Schema,
    HeroImage: withNodeKey(ContentListingNodeKeys.HeroImage),
    ContentListing: withNodeKey(ContentListingNodeKeys.ContentListing),
  },
  Spacing: {
    // TitleRow: withDesign({
    //   TitleRowWrapper: 'my-4',
    // }),
    HeroWrapper: 'my-4 px-2percent',
    FilterWrapper: 'my-4 px-2percent',
    BottomWrapper: 'px-2percent',
  },
});

const WithMultipleAllowedTags = asContentListingToken({
  Core: {
    Filter: vitalContentListingFilters.WithMultipleAllowedTags,
  },
});

const WithSingleAllowedTag = asContentListingToken({
  Core: {
    Filter: vitalContentListingFilters.WithSingleAllowedTag,
  },
});

export default {
  Default,
  WithMultipleAllowedTags,
  WithSingleAllowedTag,
};
