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
  withMenuLinkTitle,
} from '@bodiless/organisms';
import { withEditorSimple } from '../Editors';
import { asExceptMobile } from '../Elements.token';

import { withMenuListStyles, withMenuSublistStyles } from './token';

const MenuSubList = flow(
  asEditableMainSubMenu,
  withMenuLinkTitle(withEditorSimple),
  asHorizontalSubMenu,
  withMenuSublistStyles,
)(List);

const MenuList = flow(
  asEditableMainMenu,
  withMenuLinkTitle(withEditorSimple),
  asHorizontalMenu,
  withMenuListStyles,
  asExceptMobile,
)(List);

export default withSubmenu(MenuSubList)(MenuList);
