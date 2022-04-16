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
  addClasses, withDesign, remove, flowHoc, replaceWith,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalLink } from '@bodiless/vital-link';
import { asCardToken } from '../CardClean';

/**
 * Basic Card Design.
 */
const Base = asCardToken({
  Components: {
    Image: vitalImage.Default,
    CTAWrapper: replaceWith(() => null),
  },
  Core: {
  },
  Theme: {
    ImageLink: vitalLink.Default,
  },
  Layout: {
  },
  Spacing: {
  },
  Meta: flowHoc.meta.term('Type')('Card'),
});

/**
 * asCardVertical removes unnecessary wrappers from the card
 */
const WithVerticalOrientationCard = asCardToken({
  Layout: {
    Wrapper: 'w-full flex h-full flex-col',
    ContentWrapper: remove,
    Image: 'w-full',
    Description: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Orientation')('Vertical'),
});

/**
 * asCardHorizontal splits the card in half with the image on the left
 */
const WithHorizentalOrientationCard = asCardToken({
  Layout: {
    Wrapper: addClasses('md:flex-row w-full flex flex-col'),
    Image: addClasses('w-full'),
    ContentWrapper: 'md:w-1/2 flex flex-col',
    Description: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Orientation')('Horizental'),
});

/**
 * asCardNoTitle removes title from the card
 */
const WithNoTitleCard = withDesign({
  Title: remove,
});

/**
 * asCardNoBody removes the body from the card and adjust title
 */
const WithNoDescriptionCard = withDesign({
  Title: addClasses('flex-grow'), // Adds grow here because body will not exist
  Body: remove,
});

const Default = asCardToken({
  ...Base,
});

export default {
  Base,
  Default,
  WithNoDescriptionCard,
  WithNoTitleCard,
  WithHorizentalOrientationCard,
  WithVerticalOrientationCard,
};
