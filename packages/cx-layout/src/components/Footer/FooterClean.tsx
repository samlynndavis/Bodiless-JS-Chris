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

import React, { FC } from 'react';
import { Div, Fragment, designable } from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { MenuClean } from '@bodiless/cx-navigation';
import { RewardsClean } from './Rewards';
import { SocialLinksClean } from './SocialLinks';
import type { FooterComponents, FooterProps } from './types';

const footerComponents: FooterComponents = {
  Wrapper: Div,
  Container: Div,
  SectionTop: Div,
  SectionBottom: Div,
  RewardsWrapper: Div,
  Rewards: RewardsClean,
  FooterMenuWrapper: Div,
  FooterMenu: MenuClean,
  CopyrightWrapper: Div,
  Copyright: Div,
  SocialLinksWrapper: Div,
  SocialLinks: SocialLinksClean,
};

const FooterCleanBase: FC<FooterProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Container>
      <C.SectionTop>
        <C.RewardsWrapper>
          <C.Rewards />
        </C.RewardsWrapper>
        <C.FooterMenuWrapper>
          <C.FooterMenu />
        </C.FooterMenuWrapper>
      </C.SectionTop>
      <C.SectionBottom>
        <C.CopyrightWrapper>
          <C.Copyright />
        </C.CopyrightWrapper>
        <C.SocialLinksWrapper>
          <C.SocialLinks />
        </C.SocialLinksWrapper>
      </C.SectionBottom>
    </C.Container>
  </C.Wrapper>
);

/**
 * A clean footer to be used in pages layouts.
 */
const FooterClean = designable(footerComponents, 'Footer')(FooterCleanBase);

export const asFooterToken = asCxTokenSpec<FooterComponents>();

export default FooterClean;
