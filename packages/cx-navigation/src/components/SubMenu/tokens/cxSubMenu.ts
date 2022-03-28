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
  cxColor,
  cxFontSize,
  cxTextDecoration,
} from '@bodiless/cx-elements';
import {
  // addClassesIf,
  addProps,
  as,
  flowHoc,
  // not,
  on,
  removeClassesIf,
} from '@bodiless/fclasses';
import {
  // isMenuContextActive,
  // useIsMenuOpen,
  useIsSubmenuExpanded,
} from '@bodiless/navigation';
import { withAnalyticsAttr } from '../../../util';
import { cxMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { asSubMenuToken } from '../SubMenuClean';

const Base = asSubMenuToken({
  A11y: {
    Wrapper: addProps({ role: 'menu' }),
    Item: addProps({ role: 'menuitem' }),
  },
  Analytics: {
    Title: withAnalyticsAttr,
  },
  Components: {
    Title: on(MenuTitleClean)(cxMenuTitle.Default),
  },
});

const Footer = asSubMenuToken(Base, {
  Theme: {
    Title: as(
      cxTextDecoration.Uppercase,
      cxColor.TextPrimaryFooterCopy,
      cxFontSize.Base,
    ),
    Item: 'leading-none',
  },
  Spacing: {
    Wrapper: 'lg:mb-16',
    Item: 'mt-5 lg:mt-3 lg:first:mt-6',
    Title: 'my-3 lg:my-1.5',
  },
});

// @TODO: Keep it opened as user is editing it.
const TopNav = asSubMenuToken({
  ...Base,
  // @TODO: Improve theme, layout, and spacing.
  Layout: {
    Wrapper: flowHoc(
      as('absolute w-max min-w-full -left-7 top-full hidden group-hover:flex flex-col'),
      removeClassesIf(useIsSubmenuExpanded)('hidden'),
    ),
    Title: 'flex',
    _: flowHoc(
      as('relative group'),
      // addClassesIf(not(useIsMenuOpen))('hover:static'),
      // removeClassesIf(isMenuContextActive)('relative'),
    ),
  },
  Spacing: {
    Wrapper: 'py-3',
    Title: 'px-10 py-3',
  },
  Theme: {
    Wrapper: as(cxColor.BgPrimaryCard),
    Title: as(
      cxColor.TextPrimaryHeaderCopy,
      cxTextDecoration.Normal,
      cxTextDecoration.Uppercase,
      // @TODO: Add to tokens?
      'text-m-base',
    ),
  },
});

// @TODO: Toggle burger submenu on click.
const Burger = asSubMenuToken({
  ...Base,
  Layout: {
    Wrapper: flowHoc(
      // as('hidden'),
      // removeClassesIf(useIsSubmenuExpanded)('hidden'),
    ),
  },
  Spacing: {
    Item: 'mt-10',
  },
  Theme: {
    Title: as(
      cxColor.TextPrimaryHeaderCopy,
      cxFontSize.Base,
      cxTextDecoration.Uppercase,
    ),
  },
});

export default {
  Base,
  Burger,
  Footer,
  TopNav,
};
