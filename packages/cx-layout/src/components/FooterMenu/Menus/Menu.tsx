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
} from '@bodiless/fclasses';
import { asBodilessMenu, withListSubMenu, withMenuDesign } from '@bodiless/navigation';
import { FooterSubMenu } from './SubMenu';

const MenuClean = asBodilessMenu()(Ul);

const asMenuToken = asCxTokenSpec<ListComponents>();

const WithMenuItem = asBodilessLink()(A);

const Base = asMenuToken({
  Components: {
    Title: replaceWith(WithMenuItem),
    _: flowHoc(
      withListSubMenu(),
      withMenuDesign('List')(as(FooterSubMenu)),
    ),
  },
  Layout: {
    Wrapper: 'w-full md:flex md:justify-between md:flex-grow',
    Item: 'md:w-1/4',
  },
  Spacing: {
    Item: 'mb-9 pb-9 last:mb-0 last:pb-0 md:mb-0 md:pb-0 lg:px-12',
  },
  Theme: {
    Item: as(
      'border-white-400 border-b last:border-0',
      'md:border-b-0 md:border-l md:last:border-l md:first:border-0',
      'lg:first:border-l',
    ),
    Title: flowHoc(
      as(
        cxColor.TextSecondaryFooter,
        'font-bold text-m-xl md:text-m-lg lg:text-base',
      ),
    ),
  },
  Editors: {
    Title: asEditable('text', 'Menu Item'),
  },
  Schema: {
    _: withNodeKey({ nodeKey: 'menu-item' }),
  },
});

const Default = asMenuToken({
  ...Base,
});

const cxMenu = {
  Base,
  Default,
};

export {
  MenuClean,
  asMenuToken,
  cxMenu,
};
