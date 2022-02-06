/**
 * Copyright © 2020 Johnson & Johnson
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

import flowRight from 'lodash/flowRight';
import { ifReadOnly } from '@bodiless/core';
import {
  withYouTubePlayerSettings,
  asResponsiveYouTube as asBaseResponsiveYouTube,
  withFullScreenEnabled,
} from '@bodiless/youtube';
import type { YouTubePlayerSettings } from '@bodiless/youtube';
import { Embed } from '@bodiless/organisms';
import {
  addProps,
  withDesign,
  flowHoc,
} from '@bodiless/fclasses';

import { asResponsive16By9Embed } from '../Elements.token';

const withPlaceholder = addProps({ src: 'https://www.youtube.com/embed/_LBdqpscwi0' });

const asResponsiveYouTube = flowHoc(
  asBaseResponsiveYouTube,
  withDesign({
    Item: flowRight(
      withPlaceholder,
    ),
  }),
);

const asReponsive16By9YouTube = flowHoc(
  asResponsiveYouTube,
  asResponsive16By9Embed,
);

const getOrigin = () => process.env.SITE_URL || '';

const defaultPlayerSettings: Partial<YouTubePlayerSettings> = {
  cc_load_policy: 0,
  controls: 1,
  loop: 0,
  enablejsapi: 1,
  modestbranding: 1,
  rel: 0,
  origin: getOrigin(),
};

const withYouTubeDefaults = withDesign({
  Item: flowHoc(
    withYouTubePlayerSettings(defaultPlayerSettings),
    withFullScreenEnabled,
  ),
});

const Reponsive16By9YouTube = asReponsive16By9YouTube(Embed);
const DefaultReponsive16By9YouTube = withYouTubeDefaults(Reponsive16By9YouTube);

const withAutoPlaySettings = withDesign({
  Item: ifReadOnly(
    withYouTubePlayerSettings({
      ...defaultPlayerSettings,
      autoplay: true,
      mute: true,
    }),
  ),
});

const Reponsive16By9AutoPlayYouTube = flowHoc(
  asReponsive16By9YouTube,
  withYouTubeDefaults,
  withAutoPlaySettings,
)(Embed);

export {
  asResponsiveYouTube,
  Reponsive16By9YouTube,
  Reponsive16By9AutoPlayYouTube,
  DefaultReponsive16By9YouTube,
  defaultPlayerSettings,
};
