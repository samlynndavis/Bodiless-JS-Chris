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

import { as } from '@bodiless/fclasses';
import { asElementToken } from '../../../util';
import { vitalColor } from '../../Color';
import { vitalFontSize } from '../../FontSize';
import { vitalTextDecoration } from '../../TextDecoration';

const meta = {
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
  Meta: meta,
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
  Meta: meta,
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
  Meta: meta,
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
  Meta: meta,
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
  Meta: meta,
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
  Meta: meta,
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
  Meta: meta,
});

// Variant testing autoprefixer
const Gradient = asElementToken({
  Core: {
    _: vitalFontSize.L,
  },
  Theme: {
    _: as('bg-clip-text text-transparent bg-gradient-to-r',
      'from-vital-secondary-eyebrow via-vital-primary-interactive to-vital-secondary-eyebrow',),
  },
  Meta: meta,
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
  Gradient,
};
