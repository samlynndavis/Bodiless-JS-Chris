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

import { withNodeKey } from '@bodiless/core';
import { cxElement } from '@bodiless/cx-elements';
import {
  flowHoc, replaceWith, Span, withProps
} from '@bodiless/fclasses';
import { asHeaderToken } from './HeaderClean';
import { cxLogo } from '../Logo';
import { cxMenuToggler } from '../MenuToggler';
import { cxDesktopSearch, cxSearchToggler } from '../Search';

/**
 * Token that defines a basic header.
 */
const Base = asHeaderToken({
  Components: {
    MenuToggler: cxMenuToggler.Default,
    SearchToggler: cxSearchToggler.Default,
    Logo: cxLogo.Default,
    DesktopSearch: cxDesktopSearch.Default,
    // @todo replace Menu placeholder
    Menu: flowHoc(
      replaceWith(Span),
      withProps({
        children: 'Main menu',
        className: 'ml-6'
      })
    ),
    // @todo replace UserRegistration placeholder
    UserRegistration: flowHoc(
      replaceWith(Span),
      withProps({
        children: 'Email Sign Up & Rewards',
        className: 'px-4 border-l-2 border-gray-400'
      })
    ),
    // @todo replace LanguageButton placeholder
    LanguageButton: flowHoc(
      replaceWith(Span),
      withProps({
        children: 'Español',
        className: 'px-4 border-l-2 border-gray-400'
      })
    ),
  },
  Theme: {
    Wrapper: cxElement.WithPrimaryBgColor,
  },
  Schema: {
    Menu: withNodeKey({ nodeKey: 'MainMenu', nodeCollection: 'site' }),
    UtilityMenu: withNodeKey({
      nodeKey: 'UtilityMenu',
      nodeCollection: 'site',
    }),
  },
  Layout: {
    Container: 'container mx-auto flex justify-between items-center py-4',
    MenuContainer: 'hidden lg:flex justify-between items-center flex-grow',
    UtilityMenu: 'flex items-center',
  },
});

/**
 * Token which adds a responsive utility menu
 */
// const WithResponsiveUtilityMenu = asHeaderToken({
//   Components: {
//     UtilityMenu: t(
//       withTwResponsiveVariants('lg'),
//       withDesign({
//         _default: withOnlyProps() as HOC,
//         lg: t(startWith(ListClean), as(cxUtilityMenu.Default), 'hidden lg:block'),
//       }),
//     ),
//   },
// });

/**
 * Token which adds a responsive utility menu
 */
// const WithUtilityMenu = asHeaderToken({
//   Components: {
//     UtilityMenu: t(
//       startWith(ListClean),
//       as(cxUtilityMenu.Default),
//     ),
//   },
// });

const Default = asHeaderToken({
  ...Base,
});

export const cxHeader = {
  Base,
  Default,
  // WithUtilityMenu,
  // WithResponsiveUtilityMenu,
};
