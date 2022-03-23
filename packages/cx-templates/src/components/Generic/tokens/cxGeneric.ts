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
  replaceWith,
  Fragment,
  on,
  as,
} from '@bodiless/fclasses';
import { LayoutClean, cxLayout } from '@bodiless/cx-layout';
import { cxFlowContainer } from '@bodiless/cx-flowcontainer';
import { withNodeKey } from '@bodiless/core';
import { cxSpacing } from '@bodiless/cx-elements';
import { asGenericTemplateToken } from '../GenericClean';
import { GenericPageNodeKeys } from '../constants';

const Default = asGenericTemplateToken({
  Components: {
    PageWrapper: on(LayoutClean)(cxLayout.Default),
    // @todo in Hero ticket is change to this Flowcontainer with Hero only components.
    TopContent: as(cxFlowContainer.Default),
    Content: as(cxFlowContainer.DefaultWithGutters),
    BottomContent: as(cxFlowContainer.DefaultWithGutters),
  },
  Schema: {
    TopContent: withNodeKey(GenericPageNodeKeys.TopContent),
    Content: withNodeKey(GenericPageNodeKeys.Content),
    BottomContent: withNodeKey(GenericPageNodeKeys.BottomContent),
  },
  Spacing: {
    TopWrapper: cxSpacing.WithSiteXLConstraint,
    ContentWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint
    ),
  },
});

const WithoutBreadcrumbs = asGenericTemplateToken({
  Components: {
    Breadcrumb: replaceWith(Fragment),
  },
});

export default {
  Default,
  WithoutBreadcrumbs,
};
