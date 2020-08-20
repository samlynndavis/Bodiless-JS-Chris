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
import { List } from '@bodiless/components';
import {
  asHorizontalMenu,
  asHorizontalSubMenu,
  asEditableMainMenu,
  asEditableMainSubMenu,
  withSubmenu,
  asMenuLink,
} from '@bodiless/organisms';
import { withDesign } from '@bodiless/fclasses';
import { withEditorSimple } from '../../../components/Editors';
import { asExceptMobile } from '../../../components/Elements.token';

import { withMenuListStyles, withMenuSublistStyles } from '../../../components/Menus/token';

const SubMenu = flow(
  asEditableMainSubMenu,
  withDesign({
    Title: asMenuLink(withEditorSimple),
  }),
  asHorizontalSubMenu,
  withMenuSublistStyles,
)(List);

const Menu = flow(
  asEditableMainMenu,
  withDesign({
    Title: asMenuLink(withEditorSimple),
  }),
  asHorizontalMenu,
  withMenuListStyles,
  asExceptMobile,
)(List);

export default withSubmenu(SubMenu)(Menu);
