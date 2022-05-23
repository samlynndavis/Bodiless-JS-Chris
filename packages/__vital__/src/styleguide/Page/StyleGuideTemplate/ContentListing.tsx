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

import React from 'react';
import { withNode, withNodeKey } from '@bodiless/core';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  as, flowHoc, replaceWith, H2,
} from '@bodiless/fclasses';
import { ContentListingClean, vitalContentListing } from '@bodiless/vital-content-listing';
import { vitalTypography } from '@bodiless/vital-elements';

const Subtitle = as(vitalTypography.H2, 'pt-8')(H2);

const Default = as(
  vitalContentListing.Default,
  vitalContentListing.WithFilterSelector,
  withNodeKey({ nodeKey: 'styleguide-content-listing', nodeCollection: 'site' }),
  withNode,
  withNodeKey('default'),
)(ContentListingClean);

const Multiple = as(
  vitalContentListing.Default,
  vitalContentListing.WithMultipleAllowedTags,
  withNode,
  withNodeKey('multiple'),
)(ContentListingClean);

export const ContentListing = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('ContentListing'),
  Content: {
    Title: replaceWith(() => <>Content Listing (Default)</>),
    Examples: replaceWith(Default),
  },
});

export const ContentListingMultiple = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('ContentListingMultiple'),
  Content: {
    Title: replaceWith(() => <>Content Listing (Multiple)</>),
    Examples: replaceWith(Multiple),
  },
});
