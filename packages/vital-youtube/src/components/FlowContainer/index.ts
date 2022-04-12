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
  as,
  flowHoc,
  on,
  varyDesigns,
} from '@bodiless/fclasses';
import {
  asFluidToken,
} from '@bodiless/cx-elements';
import YouTubeClean from '../YouTube/YouTubeClean';
import vitalYouTube from '../YouTube/tokens';

/**
 * YouTube base variation object definition.
 */
const baseVariation = {
  YouTube: on(YouTubeClean)(vitalYouTube.Base),
};

const layoutVariations = {
  Responsive16By9Embed: as({
    ...vitalYouTube.asResponsive16By9Embed,
    Meta: flowHoc.meta.term('Layout')('Responsive Widescreen'),
  }),
  Responsive16By9EmbedWithPlaceholder: as({
    ...vitalYouTube.asYouTube,
    Meta: flowHoc.meta.term('Layout')('Responsive Widescreen With Placeholder'),
  }),
  Default: as({
    ...vitalYouTube.asYouTube,
    ...vitalYouTube.withYouTubeDefaults,
    Meta: flowHoc.meta.term('Layout')('Default Responsive Widescreen With Placeholder'),
  }),
};

/**
 * Flow Container variations for YouTube components.
 */
const WithYouTubeVariations = asFluidToken({
  Components: varyDesigns(
    baseVariation,
    layoutVariations,
  ),
});

export const vitalYouTubeFlowContainer = { WithYouTubeVariations };
