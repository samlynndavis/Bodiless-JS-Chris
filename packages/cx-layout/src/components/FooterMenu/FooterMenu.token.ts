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

import {
  Nav,
  addProps,
  startWith,
} from '@bodiless/fclasses';
import { asFooterMenuToken } from './FooterMenuClean';
import { cxMenu } from './Menus';

const Base = asFooterMenuToken({
  Core: {
    Wrapper: addProps({
      'aria-label': 'Footer Navigation Menu',
      role: 'navigation',
    }),
  },
  Components: {
    Wrapper: startWith(Nav),
    Menu: cxMenu.Default,
  },
});

const Default = asFooterMenuToken({
  ...Base,
});

export const cxFooterMenu = {
  Base,
  Default,
};
