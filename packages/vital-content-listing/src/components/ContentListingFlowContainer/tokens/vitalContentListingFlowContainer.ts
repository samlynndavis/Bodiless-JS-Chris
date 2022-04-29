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
import { Img, on } from '@bodiless/fclasses';
import { asFilterableByGroup } from '@bodiless/filtering';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalImage } from '@bodiless/vital-image';
import { ContentListingFlowContainerNodeKeys } from './constants';

const Default = asFluidToken({
  Core: {
    ComponentWrapper: asFilterableByGroup(),
  },
  Components: {
    // @TODO: Replace with cards once vital-cards has been implemented.
    FilterableContentImageVariations: on(Img)(
      vitalImage.WithEditorPlain,
      vitalImage.WithLink,
      // Needs to provide key since WithLink invalidates default one.
      withNodeKey('image'),
    ),
  },
  Layout: {
    ComponentWrapper: 'flex flex-shrink',
  },
  Spacing: {
    ComponentWrapper: 'p-3 w-full lg:w-1/3',
    Wrapper: '-m-3',
  },
  Schema: {
    _: withNodeKey(ContentListingFlowContainerNodeKeys.ContentListing),
  },
});

const SiteWide = asFluidToken({
  ...Default,
  Schema: {
    _: withNodeKey({ nodeKey: ContentListingFlowContainerNodeKeys.ContentListing, nodeCollection: 'site' }),
  },
});

export default {
  Default,
  SiteWide,
};
