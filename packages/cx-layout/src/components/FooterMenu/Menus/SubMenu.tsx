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

import { ListComponents, asBodilessLink, asEditable } from '@bodiless/components';
import { withNodeKey } from '@bodiless/core';
import { asCxTokenSpec, cxColor } from '@bodiless/cx-elements';
import {
  A,
  Ul,
  as,
  flowHoc,
  replaceWith,
  startWith,
} from '@bodiless/fclasses';

const asSubMenuToken = asCxTokenSpec<ListComponents>();

const WithSubMenuItem = asBodilessLink()(A);

const FooterSubMenu = asSubMenuToken({
  Components: {
    Wrapper: startWith(Ul),
    Title: replaceWith(WithSubMenuItem),
  },
  Theme: {
    Title: flowHoc(
      as(
        cxColor.TextSecondaryFooter,
        'text-base font-medium md:text-sm lg:text-xs',
      ),
    ),
  },
  Spacing: {
    Item: 'mt-5',
  },
  Editors: {
    Title: asEditable('text', 'Submenu Item'),
  },
  Schema: {
    _: withNodeKey({ nodeKey: 'submenu' }),
  },
});

export {
  FooterSubMenu,
};
