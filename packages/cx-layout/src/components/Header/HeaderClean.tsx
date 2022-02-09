/**
 * Copyright © 2021 Johnson & Johnson
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

import React, {
  FC, HTMLProps,
} from 'react';
import {
  DesignableComponentsProps,
  Div,
  Fragment,
  designable,
  ComponentOrTag,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { LogoClean } from '../Logo';

export type HeaderComponents = {
  Wrapper: ComponentOrTag<any>,
  Container: ComponentOrTag<any>,
  MenuContainer: ComponentOrTag<any>,
  MenuToggler: ComponentOrTag<any>,
  Menu: ComponentOrTag<any>,
  Logo: ComponentOrTag<any>,
  UtilityMenu: ComponentOrTag<any>,
  SocialLinks: ComponentOrTag<any>,
  ButtonsMenuWrapper: ComponentOrTag<any>,
  ButtonsWrapper: ComponentOrTag<any>,
  LanguageButton: ComponentOrTag<any>,
  UserRegistration: ComponentOrTag<any>,
  Search: ComponentOrTag<any>,
  SearchToggler: ComponentOrTag<any>,
};
type HeaderProps = DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;

const headerComponents: HeaderComponents = {
  Wrapper: Div,
  Container: Div,
  MenuContainer: Div,
  MenuToggler: Fragment,
  Menu: Fragment,
  Logo: LogoClean,
  UtilityMenu: Fragment,
  SocialLinks: Fragment,
  ButtonsMenuWrapper: Fragment,
  ButtonsWrapper: Div,
  Search: Fragment,
  SearchToggler: Fragment,
  LanguageButton: Fragment,
  UserRegistration: Fragment,
};

const HeaderCleanBase: FC<HeaderProps> = ({ components }) => {
  const {
    Wrapper,
    Container,
    MenuContainer,
    MenuToggler,
    Menu,
    Logo,
    UtilityMenu,
    SocialLinks,
    ButtonsMenuWrapper,
    ButtonsWrapper,
    LanguageButton,
    UserRegistration,
    Search,
    SearchToggler,
  } = components;

  return (
    <Wrapper>
      <Container>
        <MenuToggler />
        <SearchToggler />
        <Logo />
        <UtilityMenu />
        <SocialLinks />
        <ButtonsMenuWrapper>
          <ButtonsWrapper>
            <Search />
            <LanguageButton />
            <UserRegistration />
          </ButtonsWrapper>
          <MenuContainer>
            <Menu />
          </MenuContainer>
        </ButtonsMenuWrapper>
      </Container>
    </Wrapper>
  );
};

export const HeaderClean = designable(headerComponents, 'Header')(HeaderCleanBase);

const asHeaderToken = asCxTokenSpec<HeaderComponents>();

export { asHeaderToken };
