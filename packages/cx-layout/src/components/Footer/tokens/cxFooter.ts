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
import { withCopyright } from '@bodiless/cx-editors';
import { cxColor } from '@bodiless/cx-elements';
import { cxMenu } from '@bodiless/cx-navigation';
import { flowHoc } from '@bodiless/fclasses';
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
    SectionTop: 'w-full lg:flex lg:space-between',
    SectionBottom: 'w-full lg:flex lg:space-between',
    RewardsWrapper: 'w-full lg:w-1/3',
    FooterMenuWrapper: 'w-full',
    SocialLinksWrapper: 'w-full lg:w-1/5',
  },
  Spacing: {
    Wrapper: 'mt-10',
    Container: 'md:px-10 md:py-6 lg:px-6 lg:py-8',
    SectionTop: 'lg:mb-12',
    RewardsWrapper: 'p-9 md:mb-8 md:p-0 lg:mb-0 lg:pr-12',
    FooterMenuWrapper: 'p-9 md:mb-8 md:p-0',
    SocialLinksWrapper: 'px-10 py-5 md:p-0',
  },
  Theme: {
    Wrapper: cxColor.BgSecondaryFooter,
    RewardsWrapper: 'bg-cx-primary-card-bg md:bg-cx-secondary-footer-bg',
  },
  Editors: {
    Copyright: withCopyright(),
  },
  Schema: {
    FooterMenu: flowHoc(
      withNode,
      withNodeKey({ nodeKey: 'FooterMenus', nodeCollection: 'site' }),
    ),
    Copyright: flowHoc(
      withNode,
      withNodeKey({ nodeKey: 'Copyright', nodeCollection: 'site' }),
    ),
  },
});

const Default = asFooterToken({
  ...Base,
});

export default {
  Base,
  Default,
};
