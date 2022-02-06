/**
 * Copyright © 2021 Johnson & Johnson
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

import { flowHoc } from '@bodiless/fclasses';
import withCardVariations from './withCardVariations';
import withContentfulCards from './withContentfulCards';
import withRichTextVariations from './withRichTextVariations';
import withSingleAccordionVariations from './withSingleAccordionVariations';
import withTableVariations from './withTableVariations';
import withImageVariations from './withImageVariations';
import withIframeVariations from './withIframeVariations';
import withYouTubeVariations from './withYouTubeVariations';
import withSocialShare from './withSocialShare';
import withListVariations from './withListVariations';
import withCarouselVariations from './withCarouselVariations';
import withCuratorVariations from './withCuratorVariations';

// Order of includes currently dictates order in Component Picker
// thus recommend putting more frequently used components toward top for quicker access.
const withDefaultVariations = flowHoc(
  withRichTextVariations,
  withTableVariations,
  withImageVariations,
  withCardVariations,
  withContentfulCards,
  withSingleAccordionVariations,
  withListVariations,
  withIframeVariations,
  withSocialShare,
  withYouTubeVariations,
  withCarouselVariations,
  withCuratorVariations,
);

export default withDefaultVariations;
