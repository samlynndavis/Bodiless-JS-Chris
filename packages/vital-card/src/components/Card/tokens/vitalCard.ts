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

import { extendMeta, flowHoc, replaceWith } from '@bodiless/fclasses';
import { asCardToken } from '../CardClean';

import Base, {
  WithFlowContainerPreview,
  WithHorizontalLeftOrientation,
  WithHorizontalRightOrientation,
  WithHorizontalContentAtTop,
  WithHorizontalContentCentered,
  WithVerticalOrientation,
  WithPrimaryTextLink,
  WithPrimaryButton,
  WithSecondaryButton,
} from './Base';
import { BaseHero, Hero } from './Hero';
import { Category } from './Category';
import { Topic } from './Topic';
import { Product } from './Product';

/**
 * WithNoTitle removes title from the card
 */
const WithNoTitle = asCardToken({
  Components: {
    TitleWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Title'),
});

/**
 * WithNoEyebrow removes title from the card
 */
const WithNoEyebrow = asCardToken({
  Components: {
    EyebrowWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Eyebrow'),
});

/**
 * WithNoDescription removes the description from the card and adjusts title.
 *
 *  where
 *     Title - adds grow because description will not exist
 */
const WithNoDescription = asCardToken({
  Components: {
    DescriptionWrapper: replaceWith(() => null),
  },
  Layout: {
    Title: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Features')('No Description'),
});

const WithFlexGrowImage = asCardToken({
  Layout: {
    ImageWrapper: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Features')('Flex Grow on Image Wrapper'),
});

const Default = asCardToken({
  ...Base,
});

const Basic = asCardToken(Default, {
  Meta: extendMeta(
    flowHoc.meta.term('Usage')('Basic'),
    flowHoc.meta.term('CTA Type')('Fully Clickable'),
  ),
});

export default {
  Base,
  Default,
  Basic,
  BaseHero,
  Hero,
  Category,
  Topic,
  Product,
  WithPrimaryTextLink,
  WithPrimaryButton,
  WithSecondaryButton,
  WithNoDescription,
  WithNoTitle,
  WithNoEyebrow,
  WithHorizontalLeftOrientation,
  WithHorizontalRightOrientation,
  WithHorizontalContentAtTop,
  WithHorizontalContentCentered,
  WithVerticalOrientation,
  WithFlowContainerPreview,
  WithFlexGrowImage,
};
