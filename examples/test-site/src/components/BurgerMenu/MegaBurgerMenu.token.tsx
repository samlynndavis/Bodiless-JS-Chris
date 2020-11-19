/**
 * Copyright © 2020 Johnson & Johnson
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

import { flow } from 'lodash';
import { withMegaMenuDesign } from '@bodiless/organisms';
import { withDesign, replaceWith, A } from '@bodiless/fclasses';

import { withBaseBurgerMenuStyles, baseBurgerSubMenuStyles } from './SimpleBurgerMenu.token';

const asToutTitle = flow(
  withDesign({
    _default: replaceWith(A),
  }),
);

/**
 * Mega Menu Styles
 * ===========================================
 */
const withMegaBurgerMenuStyles = flow(
  withDesign({
    Item: withDesign({
      Touts: withDesign({
        Title: asToutTitle,
      }),
    }),
  }),
  withMegaMenuDesign(baseBurgerSubMenuStyles),
  withBaseBurgerMenuStyles,
);

export default withMegaBurgerMenuStyles;
