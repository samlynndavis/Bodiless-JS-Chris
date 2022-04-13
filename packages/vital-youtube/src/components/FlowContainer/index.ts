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

import identity from 'lodash/identity';
import {
  as,
  on,
  varyDesigns,
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { YouTubeClean, vitalYouTube } from '../YouTube';

/**
 * YouTube base variation object definition.
 */
const baseVariation = {
  YouTube: on(YouTubeClean)(vitalYouTube.Base),
};

/**
 * YouTube settings variations object definition.
 */
const settingsVariations = {
  NoSettings: identity,
  DefaultPlayer: as(
    vitalYouTube.Base,
    vitalYouTube.WithDefaultPlayerSettings,
  ),
  FullScreenEnabled: as(
    vitalYouTube.Base,
    vitalYouTube.WithFullScreenEnabled,
  ),
  DefaultSettings: as(
    vitalYouTube.Base,
    vitalYouTube.WithDefaultPlayerSettings,
    vitalYouTube.WithFullScreenEnabled,
  ),
};

/**
 * YouTube SEO variations object definition.
 */
const seoVariations = {
  NoSchema: identity,
  Schema: as(
    vitalYouTube.Base,
    vitalYouTube.WithSchema,
  ),
};

/**
 * YouTube screen variations object definition.
 */
const screenVariations = {
  Default: vitalYouTube.Default,
  Responsive16By9Embed: vitalYouTube.Responsive16By9Embed,
};

/**
 * Flow Container variations for YouTube components.
 */
const WithYouTubeVariations = asFluidToken({
  Components: varyDesigns(
    baseVariation,
    settingsVariations,
    seoVariations,
    screenVariations,
  ),
});

export const vitalYouTubeFlowContainer = { WithYouTubeVariations };
