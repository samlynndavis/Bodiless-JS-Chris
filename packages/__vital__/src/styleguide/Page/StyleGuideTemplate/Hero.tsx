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

import React from 'react';
import {
  flowHoc,
  as,
  replaceWith,
  Img,
} from '@bodiless/fclasses';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalImage } from '@bodiless/vital-image';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';

const ImageHero = as(vitalImage.Hero)(Img);
const VideoHero = as(vitalYouTube.Hero)(YouTubeClean);

const HeroVariations = (props: any) => (
  <>
    <ImageHero />
    <hr className="my-4" />
    <VideoHero />
  </>
);

export const Hero = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Hero'),
  Content: {
    Title: replaceWith(() => <>Hero</>),
    Examples: replaceWith(HeroVariations),
  },
});
