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

import {
  on,
  as,
  Img,
  addProps,
  flowIf,
  replaceWith,
  flowHoc,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { LayoutClean, vitalLayout } from '@bodiless/vital-layout';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { useNode, withNodeKey } from '@bodiless/core';
import { vitalSpacing, vitalTypography } from '@bodiless/vital-elements';
import { ContentListingClean, vitalContentListing } from '@bodiless/vital-content-listing';
import { asGenericTemplateToken } from '../GenericTemplateClean';
import { GenericTemplateNodeKeys } from '../constants';

const isHomePage = () => useNode().node.pagePath === '/';

const WithNoBreadcrumbOnHomePage = asGenericTemplateToken({
  Flow: flowIf(isHomePage),
  Components: {
    BreadcrumbWrapper: replaceWith(() => null),
  },
});

const Default = asGenericTemplateToken({
  Components: {
    PageWrapper: on(LayoutClean)(vitalLayout.Default),
    // @todo breadcrumb placeholder
    Breadcrumb: addProps({ children: 'Breadcrumb Placeholder', }),
    // @todo in Hero ticket is change this to chameleon.
    TopContent: on(Img)(vitalImage.Default, vitalImage.WithLandscapePlaceholder),
    Content: as(vitalFlowContainer.Default),
    BottomContent: as(vitalFlowContainer.Default),
  },
  Schema: {
    TopContent: withNodeKey(GenericTemplateNodeKeys.TopContent),
    Content: withNodeKey(GenericTemplateNodeKeys.Content),
    BottomContent: withNodeKey(GenericTemplateNodeKeys.BottomContent),
  },
  Spacing: {
    TopContent: vitalSpacing.WithSiteXLConstraint,
    BreadcrumbWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'my-2.5',
    ),
    // @todo move styling of breadcrumb to breadcrumb component when it exists.
    Breadcrumb: vitalTypography.Rest,
    ContentWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
  },
  Compose: {
    WithNoBreadcrumbOnHomePage,
  },
});

const ContentListing = asGenericTemplateToken({
  ...Default,
  Components: {
    ...Default.Components,
    Content: on(ContentListingClean)(vitalContentListing.Default),
  },
  Schema: {
    ...Default.Schema,
    // We put the content-listing into the site collection so that the template
    // can be reused with the same data (to provide different default filters).
    Content: flowHoc(
      // withNodeKey(GenericTemplateNodeKeys.Content),
      // withNode,
      withNodeKey({ nodeKey: 'content-listing', nodeCollection: 'site' }),
    ),
  }
});

export default {
  Default,
  ContentListing,
  WithNoBreadcrumbOnHomePage,
};
