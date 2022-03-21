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
  startWith,
} from '@bodiless/fclasses';
import { cxSpacing } from '@bodiless/cx-elements';
import { cxLayout } from '@bodiless/cx-layout';
import { asGenericTemplateToken } from '../GenericClean';

const asBorderResponsiveIndicator = 'border text-red md:text-green lg:text-blue xl:text-orange';

/* Used in StyleGuide for Testing Purposes */
const StyleGuide = asGenericTemplateToken({
  Components: {
    PageWrapper: as(cxLayout.Default),
    Breadcrumb: startWith(Div),
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
  },
});

export { StyleGuide };
