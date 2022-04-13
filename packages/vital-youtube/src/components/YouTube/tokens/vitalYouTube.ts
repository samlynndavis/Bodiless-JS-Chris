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
} from '@bodiless/organisms';
import { asSchemaSource, WithVideoSchema } from '@bodiless/vital-structuredata';
import {
  asResponsiveYouTube as asBodilessResponsiveYouTube,
  withFullScreenEnabled as withBodilessFullScreenEnabled,
  withYouTubePlayerSettings,
} from '@bodiless/youtube';
import { asYouTubeToken } from '../YouTubeClean';
import { defaultPlayerSettings } from '../util';

/**
 * WithDefaultPlayerSettings provides standard default YouTube player settings.
 */
const WithDefaultPlayerSettings = asYouTubeToken({
  Components: {
    Item: withYouTubePlayerSettings(defaultPlayerSettings),
  },
  Meta: flowHoc.meta.term('Settings')('Standard Player'),
});

/**
 * WithFullScreenEnabled allows YouTube video to be full screen.
 */
const WithFullScreenEnabled = asYouTubeToken({
  Behavior: {
    Item: withBodilessFullScreenEnabled,
  },
  Meta: flowHoc.meta.term('Settings')('Full Screen'),
});

/**
 * WithSchema allows YouTube video to generate structure data schema.
 */
const WithSchema = asYouTubeToken({
  SEO: {
    Item: asSchemaSource('youtube-iframe'),
    Wrapper: WithVideoSchema,
  },
  Meta: flowHoc.meta.term('SEO')('With Schema'),
});

/**
 * Token that provides VitalDS YouTube base component.
 */
const Base = asYouTubeToken({
  Components: {
    _: asBodilessResponsiveYouTube,
  },
  Content: {
    // Video placeholder.
    Item: addProps({ src: 'https://www.youtube.com/embed/ukz74aLMvhc' }),
  },
  Meta: flowHoc.meta.term('Type')('YouTube'),
});

/**
 * Token that provides VitalDS YouTube default component.
 */
const Default = asYouTubeToken({
  ...Base,
  Meta: flowHoc.meta.term('Screen')('Default'),
});

/**
 * Responsive16By9Embed provides responsive YouTube component in widescreen format (16:9).
 */
const Responsive16By9Embed = asYouTubeToken({
  ...Base,
  Components: {
    _: as(
      Base.Components?._,
      asBodilessResponsive16By9Embed,
    ),
  },
  Meta: flowHoc.meta.term('Screen')('Widescreen (16:9)'),
});

export default {
  WithDefaultPlayerSettings,
  WithFullScreenEnabled,
  WithSchema,
  Base,
  Default,
  Responsive16By9Embed,
};
