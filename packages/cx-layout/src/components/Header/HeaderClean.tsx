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
  FC, ComponentType, HTMLProps,
} from 'react';
import {
  DesignableComponentsProps,
  Div,
  Fragment,
  designable,
} from '@bodiless/fclasses';
import { asBcTokenSpec } from '@bodiless/cx-elements';
import { MenuClean, BurgerMenuTogglerClean } from '@canvasx/navigation';
import Logo from '../Logo/LogoClean';

export type HeaderComponents = {
  Wrapper: ComponentType<any>,
  Container: ComponentType<any>,
  MenuContainer: ComponentType<any>,
  MenuToggler: ComponentType<any>,
  Menu: ComponentType<any>,
  SiteLogoReturn: ComponentType<any>,
  UtilityMenu: ComponentType<any>,
  SocialLinks: ComponentType<any>,
  ButtonsMenuWrapper: ComponentType<any>,
  ButtonsWrapper: ComponentType<any>,
  LanguageButton: ComponentType<any>,
  UserRegistration: ComponentType<any>,
  Search: ComponentType<any>,
  SearchToggler: ComponentType<any>,
};
type HeaderProps = DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;

const headerComponents: HeaderComponents = {
  Wrapper: Div,
  Container: Div,
  MenuContainer: Div,
  MenuToggler: BurgerMenuTogglerClean,
  Menu: MenuClean,
  SiteLogoReturn: Logo,
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
    SiteLogoReturn,
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
        <SiteLogoReturn />
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

const asHeaderToken = asTokenSpec<HeaderComponents>();

export { asHeaderToken };
