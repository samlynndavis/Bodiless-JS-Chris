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
  withNode,
  withNodeKey,
} from '@bodiless/core';
import { cxColor } from '@bodiless/cx-elements';
import {
  cxBurgerMenu,
  cxMenu,
  cxMenuToggler,
} from '@bodiless/cx-navigation';
import {
  Span,
  as,
  flowHoc,
  replaceWith,
  withDesign,
  withProps,
} from '@bodiless/fclasses';
import { cxLogo } from '../../Logo';
import { cxDesktopSearch, cxSearchToggler } from '../../Search';
import { cxWhereToBuy, WhereToBuyClean } from '../../WhereToBuy';
import { asHeaderToken } from '../HeaderClean';

// @TODO: Get rid of this after language button is implemented.
const WithLanguageButton = flowHoc(
  replaceWith(Span),
  withProps({
    children: 'Español',
    // @TODO: Create separator tokens.
    className: 'px-4 border-l-2 border-gray-400 lg:mr-4 lg:border-r-2',
  }),
);

/**
 * Token that defines a basic header.
 */
const Base = asHeaderToken({
  Components: {
    MenuToggler: cxMenuToggler.Default,
    SearchToggler: cxSearchToggler.Default,
    Logo: cxLogo.Default,
    Menu: cxMenu.TopNav,
    BurgerMenu: flowHoc(
      as(cxBurgerMenu.Default),
      // @TODO: Is there a better way to inject WhereToBuy and (future) LanguageButton
      // components into the menu? Maybe, move the components to another package...
      withDesign({
        WhereToBuy: replaceWith(as(cxWhereToBuy.Default)(WhereToBuyClean)),
        // @TODO: Replace LanguageButton placeholder.
        LanguageButton: WithLanguageButton,
      }),
    ),
    DesktopSearch: cxDesktopSearch.Default,
    UtilityMenu: cxMenu.Utility,
    // @TODO: Replace LanguageButton placeholder.
    LanguageButton: WithLanguageButton,
    WhereToBuy: cxWhereToBuy.Default,
  },
  Theme: {
    Wrapper: cxColor.BgPrimaryCard,
  },
  Schema: {
    Logo: withNodeKey({ nodeKey: 'Logo' }),
    _: withNode,
  },
  Layout: {
    Container: 'flex justify-between items-center',
    MenuContainer: 'hidden lg:flex justify-between items-center flex-grow',
    ActionMenuContainer: 'flex items-center',
  },
  Spacing: {
    Logo: withDesign({
      Wrapper: 'mx-4',
    }),
    Container: 'mx-auto py-4',
    ActionMenuContainer: 'px-4',
  },
});

const Default = asHeaderToken({
  ...Base,
});

export default {
  Base,
  Default,
};
