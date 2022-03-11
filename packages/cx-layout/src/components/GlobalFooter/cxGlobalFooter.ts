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

import { withNode, withNodeKey } from '@bodiless/core';
import { cxColor, cxFontSize } from '@bodiless/cx-elements';
import { withEditorFull } from '@bodiless/cx-editors';
import {
  Div,
  as,
  flowHoc,
  startWith,
  withDesign,
} from '@bodiless/fclasses';
import { cxRewards } from './Rewards';
import { cxSocialLinks } from './SocialLinks';
import { asGlobalFooterToken } from './GlobalFooterClean';
import { cxFooterMenu } from '../FooterMenu';

const withCopyrightDesign = withDesign({
  Editor: withDesign({
    paragraph: as(
      cxColor.TextPrimaryFooterCopy,
      cxFontSize.XS,
      'border-white-400 border-t border-b md:border-0 lg:text-m-xs',
      'mx-9 py-9 md:mx-0 md:mb-4 md:p-0 lg:mt-2 lg:mb-0 lg:py-0',
    ),
  }),
});

const Base = asGlobalFooterToken({
  Components: {
    Wrapper: startWith(Div),
    Rewards: flowHoc(
      as(cxRewards.Default),
      withDesign({
        Wrapper: 'w-full p-9 md:mb-8 md:p-0 lg:w-1/3 lg:mb-0 lg:pr-12',
      }),
    ),
    FooterMenus: flowHoc(
      as(cxFooterMenu.Default),
      withDesign({
        Wrapper: 'w-full p-9 md:mb-8 md:p-0',
      }),
    ),
    SocialLinks: flowHoc(
      as(cxSocialLinks.Default),
      withDesign({
        Wrapper: 'w-full px-10 py-5 md:p-0 lg:w-1/5',
      }),
    ),
  },
  Layout: {
    Wrapper: 'w-full',
    Container: 'lg:mx-auto lg:container',
    SectionTop: 'w-full lg:flex lg:space-between',
    SectionBottom: 'w-full lg:flex lg:space-between',
  },
  Spacing: {
    Wrapper: 'mt-10',
    Container: 'md:px-10 md:py-6 lg:py-8',
    SectionTop: 'lg:mb-12',
  },
  Theme: {
    Wrapper: cxColor.BgSecondaryFooter,
  },
  Editors: {
    Copyright: flowHoc(
      withEditorFull(undefined, 'Insert Copyright'),
      withCopyrightDesign,
    ),
  },
  Schema: {
    FooterMenus: flowHoc(
      withNode,
      withNodeKey({ nodeKey: 'FooterMenus', nodeCollection: 'site' }),
    ),
    Copyright: flowHoc(
      withNode,
      withNodeKey({ nodeKey: 'Copyright', nodeCollection: 'site' }),
    ),
  },
});

const Default = asGlobalFooterToken({
  ...Base,
});

export const cxGlobalFooter = {
  Base,
  Default,
};
