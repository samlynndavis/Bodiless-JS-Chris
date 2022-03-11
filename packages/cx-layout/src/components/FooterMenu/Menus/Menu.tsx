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
  addProps,
  as,
  flowHoc,
  replaceWith,
} from '@bodiless/fclasses';
import { asBodilessMenu, withListSubMenu, withMenuDesign } from '@bodiless/navigation';
import { cxSeparator } from '../tokens';
import { FooterSubMenu } from './SubMenu';

const MenuClean = asBodilessMenu()(Ul);

const asMenuToken = asCxTokenSpec<ListComponents>();

const WithMenuItem = asBodilessLink()(A);

const Base = asMenuToken({
  Core: {
    Wrapper: addProps({
      'aria-label': 'Navigation Menu',
      role: 'menubar',
    }),
    Item: addProps({ role: 'menuitem' }),
  },
  Components: {
    Title: replaceWith(WithMenuItem),
    _: flowHoc(
      withListSubMenu(),
      withMenuDesign('List')(as(FooterSubMenu)),
    ),
  },
  Layout: {
    Wrapper: 'w-full md:flex md:justify-between md:flex-grow lg:h-full',
    Item: 'md:w-1/4',
  },
  Theme: {
    Item: cxSeparator.Default,
    Title: flowHoc(
      as(
        cxColor.TextPrimaryFooterCopy,
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
