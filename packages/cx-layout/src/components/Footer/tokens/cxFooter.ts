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
import { cxRichText } from '@bodiless/cx-editors';
import { cxColor } from '@bodiless/cx-elements';
import { cxMenu } from '@bodiless/cx-navigation';
import { as } from '@bodiless/fclasses';
import { cxRewards } from '../Rewards';
import { cxSocialLinks } from '../SocialLinks';
import { asFooterToken } from '../FooterClean';

const Base = asFooterToken({
  Components: {
    Rewards: cxRewards.Default,
    FooterMenu: cxMenu.Footer,
    SocialLinks: cxSocialLinks.Default,
  },
  Layout: {
    Wrapper: 'w-full',
    Container: 'lg:flex',
    Column: 'w-full lg:first:w-1/4 lg:w-3/4',
    Row: 'w-full lg:flex lg:space-between',
    FooterMenuWrapper: 'w-full',
    CopyrightWrapper: 'w-full lg:w-3/4',
    SocialLinksWrapper: 'w-full lg:w-1/4',
  },
  Spacing: {
    Wrapper: 'mt-10',
    Column: 'md:px-10 md:py-6 lg:p-8',
    Row: 'md:mb-8 md:last:mb-0 lg:mb-12',
    RewardsWrapper: 'p-9 md:mb-0 md:p-0',
    FooterMenuWrapper: 'p-9 md:p-0',
    Copyright: 'mx-9 py-9 md:mx-0 md:mb-4 md:p-0 lg:mt-2 lg:mb-0 lg:py-0',
    SocialLinksWrapper: 'px-10 py-5 md:p-0',
  },
  Theme: {
    Column: as(
      cxColor.BgSecondaryFooter,
      'first:bg-cx-primary-card-bg md:first:bg-cx-secondary-footer-bg',
    ),
    Copyright: 'border-white-400 border-t border-b md:border-0',
  },
  Editors: {
    Copyright: cxRichText.Copyright,
  },
  Schema: {
    FooterMenu: withNodeKey({ nodeKey: 'footer', nodeCollection: 'site' }),
    Copyright: withNodeKey({ nodeKey: 'copyright', nodeCollection: 'site' }),
    _: withNode,
  },
});

const Default = asFooterToken({
  ...Base,
});

export default {
  Base,
  Default,
};
