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
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { Nav, designable } from '@bodiless/fclasses';
import { MenuClean } from './Menus';
import type { FooterMenuComponents, FooterMenuProps } from './types';

const footerMenuComponents: FooterMenuComponents = {
  Wrapper: Nav,
  Menu: MenuClean,
};

const FooterMenuCleanBase: FC<FooterMenuProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Menu />
  </C.Wrapper>
);

const FooterMenuClean = designable(footerMenuComponents, 'FooterMenu')(FooterMenuCleanBase);

const asFooterMenuToken = asCxTokenSpec<FooterMenuComponents>();

export {
  FooterMenuClean,
  asFooterMenuToken,
};
