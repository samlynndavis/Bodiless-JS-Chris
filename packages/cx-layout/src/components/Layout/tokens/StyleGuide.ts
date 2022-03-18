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
import { cxSpacing } from '@bodiless/cx-elements';
import {
  addProps,
  as,
  Div,
  replaceWith,
} from '@bodiless/fclasses';
import { asLayoutToken } from '../LayoutClean';

const asBorderResponsiveIndicator = 'border text-red md:text-green lg:text-blue xl:text-orange';

/* Used in StyleGuide for Testing Purposes */
const StyleGuide = asLayoutToken({
  Components: {
    Header: replaceWith(Div),
    Footer: replaceWith(Div),
    PageTopper: replaceWith(Div),
    PageCloser: replaceWith(Div),
  },
  Theme: {
    OuterContainer: 'border',
    Header: asBorderResponsiveIndicator,
    Footer: asBorderResponsiveIndicator,
    Container: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint,
      asBorderResponsiveIndicator,
    ),
    PageTopper: asBorderResponsiveIndicator,
    PageCloser: asBorderResponsiveIndicator,
  },
  Behavior: {
    Header: as(addProps({ children: 'Site Header', }),),
    Footer: as(addProps({ children: 'Site Footer', }),),
    PageTopper: as(addProps({ children: 'Page Topper', }),),
    PageCloser: as(addProps({ children: 'Page Closer', }),),
  },
});

export { StyleGuide };
