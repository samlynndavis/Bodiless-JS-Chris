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

import { addProps, as } from '@bodiless/fclasses';
import { asElementToken } from '../../../util';
import { vitalColor } from '../../Color';
import { vitalFontSize } from '../../FontSize';
import { vitalTextDecoration } from '../../TextDecoration';

const Meta = {
  categories: {
    Type: ['Element'],
    Group: ['Typography'],
  },
};

const Link = asElementToken({
  Core: {
    _: vitalFontSize.Base,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Bold,
      vitalTextDecoration.Underline,
      vitalColor.TextPrimaryInteractive,
    ),
  },
  Meta,
});

const H1 = asElementToken({
  Core: {
    _: vitalFontSize.XXXL,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Bold,
      vitalColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mt-10 mb-5 lg:mb-6',
  },
  Meta,
});

const H2 = asElementToken({
  Core: {
    _: vitalFontSize.XXL,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Bold,
      vitalColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta,
});

const H3 = asElementToken({
  Core: {
    _: vitalFontSize.XL,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Medium,
      vitalColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta,
});

const H4 = asElementToken({
  Core: {
    _: vitalFontSize.XL,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Normal,
      vitalColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5.75 lg:mb-9',
  },
  Meta,
});

const H5 = asElementToken({
  Core: {
    _: vitalFontSize.Base,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Medium,
      vitalColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-4.5',
  },
  Meta,
});

const Body = asElementToken({
  Core: {
    _: vitalFontSize.Base,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Normal,
      vitalColor.TextPrimaryBodyCopy,
    ),
  },
  Spacing: {
    _: 'mb-6',
  },
  Meta,
});

const Eyebrow = asElementToken({
  Core: {
    _: vitalFontSize.XS,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Uppercase,
      vitalTextDecoration.ExtraBold,
      vitalColor.TextSecondaryEyebrow,
    ),
  },
  Spacing: {
    _: 'mb-3',
  },
  Meta,
});

// This probably will need a better name as Design team defines the uses of this token.
// They have called it crumbs & reviews now.
const Rest = asElementToken({
  Core: {
    _: vitalFontSize.XS,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Normal,
      vitalColor.TextPrimaryBodyCopy,
    ),
  },
  Meta,
});

const WithDemoContent = asElementToken({
  Core: {
    _: addProps({ children: 'Lorem ipsum dolor sit amet' }),
  },
});

export default {
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Eyebrow,
  Rest,
  WithDemoContent,
};
