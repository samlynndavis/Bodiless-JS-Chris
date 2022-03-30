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
import {
  addProps,
  as,
  flowIf,
  on,
  replaceWith
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  cxPage,
  GenericTemplateClean,
  cxGenericTemplate,
  asGenericTemplateToken
} from '@bodiless/cx-templates';
import { useNode } from '@bodiless/core';

// @todo remove WithNoBreadcrumbs & WithBreadcrumbsPlaceholder when
// breadcrumbs is implemented and content editor can choose to use breadcrumb
const isHomePage = () => useNode().node.pagePath === '/';

const WithNoBreadcrumbs = asGenericTemplateToken({
  ...cxGenericTemplate.Default,
  Components: {
    ...cxGenericTemplate.Default.Components,
    BreadcrumbWrapper: replaceWith(React.Fragment),
    Breadcrumb: replaceWith(React.Fragment),
  },
});

const WithBreadcrumbsPlaceholder = asGenericTemplateToken({
  ...cxGenericTemplate.Default,
  Behavior: {
    Breadcrumb: as(addProps({ children: 'Breadcrumb Placeholder', }),),
  },
});

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: on(GenericTemplateClean)(
      cxGenericTemplate.Default,
      WithBreadcrumbsPlaceholder,
      flowIf(isHomePage)(as(WithNoBreadcrumbs)),
    ),
  },
});

export default {
  ...cxPage,
  Default,
};
