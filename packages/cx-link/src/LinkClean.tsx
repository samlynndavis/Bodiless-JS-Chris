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
import {
  A, Span, Fragment, designable,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { LinkComponents, LinkBaseProps } from './types';

const linkComponents: LinkComponents = {
  Wrapper: A,
  Body: Span,
  ExternalSRText: Fragment,
  PostIcon: Fragment,
};

const LinkBase: FC<LinkBaseProps> = ({ components: C, children, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.ExternalSRText />
    <C.Body>
      {children}
    </C.Body>
    <C.PostIcon />
  </C.Wrapper>
);

const asLinkToken = asCxTokenSpec<LinkComponents>();

const LinkClean = designable(linkComponents, 'Link')(LinkBase);

export { LinkClean, asLinkToken };
