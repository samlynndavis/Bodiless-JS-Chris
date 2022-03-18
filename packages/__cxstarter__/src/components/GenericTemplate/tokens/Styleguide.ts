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
  addProps,
  as,
  Div,
  replaceWith,
} from '@bodiless/fclasses';
import { cxSpacing } from '@bodiless/cx-elements';
import { asGenericTemplateToken } from '@bodiless/cx-templates';
import { __cxstarter__Layout } from '../../Layout';

const asBorderResponsiveIndicator = 'border text-red md:text-green lg:text-blue xl:text-orange';

/* Used in StyleGuide for Testing Purposes */
const StyleGuide = asGenericTemplateToken({
  Components: {
    PageWrapper: as(__cxstarter__Layout.Default),
    BreadcrumbWrapper: replaceWith(Div),
    Breadcrumb: replaceWith(Div),
    TopWrapper: replaceWith(Div),
    TopContent: replaceWith(Div),
    ContentWrapper: replaceWith(Div),
    Content: replaceWith(Div),
    BottomWrapper: replaceWith(Div),
    BottomContent: replaceWith(Div),
  },
  Theme: {
    Breadcrumb: asBorderResponsiveIndicator,
    ContentWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint
    ),
    TopWrapper: cxSpacing.WithSiteXLConstraint,
    BreadcrumbWrapper: cxSpacing.WithSiteXLConstraint,
    TopContent: asBorderResponsiveIndicator,
    Content: asBorderResponsiveIndicator,
    BottomContent: asBorderResponsiveIndicator,
  },
  Behavior: {
    Breadcrumb: as(addProps({ children: 'Breadcrumb', }),),
    TopContent: as(addProps({ children: 'Top Content', }),),
    Content: as(addProps({ children: 'Content', }),),
    BottomContent: as(addProps({ children: 'Bottom Content', }),),
  },
});

export { StyleGuide };
