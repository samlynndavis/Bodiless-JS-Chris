/* eslint-disable react/destructuring-assignment */
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
  Div,
  designable,
  Fragment,
  A,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
// import Footer from '../Footer/Footer';
import { HeaderClean } from '../Header';
import { HelmetClean } from '../Helmet';
import { LayoutComponents, LayoutProps } from './types';

const layoutComponents: LayoutComponents = {
  OuterContainer: Div,
  SkipToMainContent: A,
  Helmet: HelmetClean,
  SiteHeader: HeaderClean,
  // SiteFooter: FooterClean,
  SiteFooter: Fragment,
  Container: Div,
  ContainerWrapper: Div,
  PageTopper: Fragment,
  PageCloser: Fragment,
};

/**
  * Base layout component composed with container and other site level
  * components to render page layout.
  * @param layoutProps Layout component props.
  *
  * @return Base layout functional component.
  */
export const LayoutCleanBase: FC<LayoutProps> = (layoutProps: LayoutProps) => {
  const {
    Container,
    ContainerWrapper,
    Helmet,
    OuterContainer,
    PageCloser,
    PageTopper,
    SiteFooter,
    SiteHeader,
    SkipToMainContent,
  } = layoutProps.components;

  return (
    <OuterContainer>
      <SkipToMainContent />
      <Helmet />
      <SiteHeader />
      <ContainerWrapper>
        <Container>
          <PageTopper />
          {layoutProps.children}
          <PageCloser />
        </Container>
      </ContainerWrapper>
      <SiteFooter />
    </OuterContainer>
  );
};

export const LayoutClean = designable(layoutComponents, 'Layout')(LayoutCleanBase);

const asLayoutToken = asCxTokenSpec<LayoutComponents>();

export { asLayoutToken };
