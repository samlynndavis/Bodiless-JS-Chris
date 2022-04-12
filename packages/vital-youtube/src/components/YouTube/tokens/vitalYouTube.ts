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
  addProps,
  as,
  flowHoc,
} from '@bodiless/fclasses';
import {
  asResponsive16By9Embed as asBodilessResponsive16By9Embed,
  Embed,
} from '@bodiless/organisms';
import { asSchemaSource, WithVideoSchema } from '@bodiless/vital-structuredata';
import {
  asResponsiveYouTube as asBodilessResponsiveYouTube,
  withFullScreenEnabled as withBodilessFullScreenEnabled,
  withYouTubePlayerSettings,
} from '@bodiless/youtube';
import { defaultPlayerSettings } from '../util';
import { asYouTubeToken } from '../YouTubeClean';

/**
 * Token that provides VitalDS YouTube base component.
 */
const Base = asYouTubeToken({
  Layout: {
    _: asBodilessResponsiveYouTube,
  },
  Meta: flowHoc.meta.term('Type')('YouTube'),
  SEO: {
    Item: asSchemaSource('youtube-iframe'),
    Wrapper: WithVideoSchema,
  },
});

/**
 * asResponsive16By9Embed provides responsive YouTube component in widescreen format (16:9).
 */
const asResponsive16By9Embed = asYouTubeToken({
  Layout: {
    _: asBodilessResponsive16By9Embed,
  },
  Meta: flowHoc.meta.term('Layout')('Responsive Widescreen (16:9)'),
});

/**
 * withDefaultPlayerSettings provides standard Canvas YouTube player settings.
 */
const withDefaultPlayerSettings = asYouTubeToken({
  Meta: flowHoc.meta.term('Settings')('With Canvas presets'),
  Behavior: {
    Item: withYouTubePlayerSettings(defaultPlayerSettings),
  },
});

/**
 * withFullScreenEnabled allows YouTube video to be full screen.
 */
const withFullScreenEnabled = asYouTubeToken({
  Meta: flowHoc.meta.term('Settings')('With full screen'),
  Behavior: {
    Item: withBodilessFullScreenEnabled,
  },
});

/**
 * withPlaceholder provides default placeholder for YouTube component.
 */
const withPlaceholder = asYouTubeToken({
  Layout: {
    Item: addProps({ src: 'https://www.youtube.com/embed/ukz74aLMvhc' }),
  },
  Meta: flowHoc.meta.term('Content')('With Placeholder'),
});

/**
 * asResponsiveYouTube re-composes responsive YouTube base component with default placeholder.
 */
const asResponsiveYouTube = asYouTubeToken({
  Compose: {
    Base,
    withPlaceholder,
  },
});

/**
 * asYouTube re-composes responsive YouTube base component with default placeholder
 * in widescreen format (16:9).
 */
const asYouTube = asYouTubeToken({
  Compose: {
    asResponsiveYouTube,
    asResponsive16By9Embed,
  },
});

/**
 * withYouTubeDefaults provides standard Canvas presets with full screen allowed.
 */
const withYouTubeDefaults = asYouTubeToken({
  Compose: {
    withFullScreenEnabled,
    withDefaultPlayerSettings,
  },
});

const Responsive16By9Embed = as(asYouTube)(Embed);

const Default = as(withYouTubeDefaults)(Responsive16By9Embed);

export default {
  asYouTube,
  asResponsive16By9Embed,
  asResponsiveYouTube,
  withDefaultPlayerSettings,
  withFullScreenEnabled,
  withPlaceholder,
  withYouTubeDefaults,
  Base,
  // @TODO: We should not export components as part of a token collection.
  Default,
  Responsive16By9Embed,
};
