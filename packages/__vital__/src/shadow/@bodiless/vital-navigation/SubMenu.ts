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

import { vitalSubMenuBase } from '@bodiless/vital-navigation';
import { asFluidToken } from '@bodiless/vital-elements';
import { addProps } from '@bodiless/fclasses';

// TODO Not rendering

const Footer = asFluidToken({
  ...vitalSubMenuBase.Footer,
  Compose: {
    ...vitalSubMenuBase.Footer.Compose,
    Wrapper: addProps({ 'data-shadowed-by': '__vitalstarter_:FooterSubMenu' }),
  },
});

const TopNav = asFluidToken({
  ...vitalSubMenuBase.TopNav,
  Compose: {
    ...vitalSubMenuBase.TopNav.Compose,
    _: addProps({ 'data-shadowed-by': '__vitalstarter_:TopNavSubMenu' }),
  },
});

const Burger = asFluidToken({
  ...vitalSubMenuBase.Burger,
  Compose: {
    ...vitalSubMenuBase.Burger.Compose,
    _: addProps({ 'data-shadowed-by': '__vitalstarter_:BurgerSubMenu' }),
  },
});

export default {
  ...vitalSubMenuBase,
  Footer,
  TopNav,
  Burger,
};
