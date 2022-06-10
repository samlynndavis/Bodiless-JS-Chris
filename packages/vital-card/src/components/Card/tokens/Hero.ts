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

import omit from 'lodash/omit';
import {
  flowHoc, replaceWith, Div, extendMeta, H1, H4,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalTypography } from '@bodiless/vital-elements';
import { asCardToken } from '../CardClean';
import Base, {
  WithHorizontalOrientationBase,
  WithHorizontalLeftOrientation,
  WithHorizontalContentCentered,
} from './Base';

/**
 * Hero Base Card Design.
 */
const BaseHero = asCardToken({
  ...Base,
  Editors: {
    ...Base.Editors,
    Wrapper: undefined, // Remove Link Editor from Cards;
  },
  Components: {
    ...Base.Components,
    Wrapper: replaceWith(Div),
    EyebrowWrapper: replaceWith(() => null),
    CTAWrapper: replaceWith(Div),
    TitleWrapper: replaceWith(H1),
    DescriptionWrapper: replaceWith(H4),
  },
  Behavior: {
    Image: vitalImage.WithEager,
  },
  Layout: WithHorizontalOrientationBase.Layout,
  Spacing: {
    ...Base.Spacing,
    ContentWrapper: 'px-10',
    ImageWrapper: 'py-4 md:p-0',
    TitleWrapper: 'mb-5 lg:mb-6',
    DescriptionWrapper: 'mb-5 lg:mb-6',
  },
  Theme: {
    TitleWrapper: omit(vitalTypography.H1, 'Spacing'),
    DescriptionWrapper: omit(vitalTypography.H4, 'Spacing'),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Type')('Card'),
    flowHoc.meta.term('Usage')('Engagement'),
  ),
});

/*
 * Compose a Default Hero with Left Image & Content Centered and Primary Text Link
 */
const Hero = asCardToken(
  BaseHero,
  WithHorizontalContentCentered,
  WithHorizontalLeftOrientation,
);

export {
  BaseHero,
  Hero,
};
