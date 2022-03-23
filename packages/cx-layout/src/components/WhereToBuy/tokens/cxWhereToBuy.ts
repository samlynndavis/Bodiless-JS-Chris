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

import { cxColor, cxTextDecoration } from '@bodiless/cx-elements';
import {
  Div,
  as,
  startWith,
  withProps,
} from '@bodiless/fclasses';
import { asWhereToBuyToken } from '../WhereToBuyClean';

const Base = asWhereToBuyToken({
  Components: {
    Wrapper: startWith(Div),
  },
  // @TODO: After Where to Buy, readjust layout.
  Layout: {
    Button: 'flex justify-center items-center',
  },
  Spacing: {
    Button: 'px-7 py-3',
    Icon: 'mr-3',
  },
  Theme: {
    Button: as(
      cxColor.BgSecondaryFooter,
      cxColor.TextPrimaryFooterCopy,
      cxTextDecoration.Uppercase,
      'text-m-base',
      'rounded',
    ),
    Icon: 'w-6 h-6',
    Label: 'leading',
  },
  // @TODO: Placeholders must be replaced with editable fields.
  Content: {
    Label: withProps({
      children: 'Where to Buy',
    }),
  },
});

const Default = asWhereToBuyToken({
  ...Base,
});

export default {
  Base,
  Default,
};
