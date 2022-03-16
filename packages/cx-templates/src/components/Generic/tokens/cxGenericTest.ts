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
  on,
} from '@bodiless/fclasses';
import { LayoutClean, cxLayout } from '@bodiless/cx-layout';
// import { cxElement } from '@bodiless/cx-elements';
import { asGenericTemplateToken } from '../GenericClean';

const asBorderResponsiveIndicator = 'border text-red md:text-green lg:text-blue xl:text-orange';

/* Used in StyleGuide for Testing Purposes */
const cxGenericTest = asGenericTemplateToken({
  Components: {
    PageWrapper: on(LayoutClean)(cxLayout.Default),
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
    /* @todo add to Wrappers -- tokens in footer PR.
    ContentWrapper: as(
      cxElement.WithSiteMargin,
      cxElement.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      cxElement.WithSiteMargin,
      cxElement.WithSiteXLConstraint
    ),
    TopWrapper: cxElement.WithSiteXLConstraint,
    */
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

export { cxGenericTest };
