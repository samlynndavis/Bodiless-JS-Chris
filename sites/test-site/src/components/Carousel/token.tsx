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

import React, { Fragment } from 'react';
import {
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  addPropsIf,
  HOC,
  flowHoc,
} from '@bodiless/fclasses';
import flow from 'lodash/flow';
import negate from 'lodash/negate';
import {
  ifToggledOn,
  withChild,
  ifReadOnly,
  ifToggledOff,
} from '@bodiless/core';
import {
  useIsCarouselItemActive,
  useCarouselIsPlaying,
  asAccessibleCarousel as asBaseAccessibleCarousel,
  useCarouselSlideIndex,
} from '@bodiless/carousel';
import { asBodilessChameleon } from '@bodiless/components';
import 'pure-react-carousel/dist/react-carousel.es.css';
/**
 * overrides some styles defined in the contrib library
 */
import './carousel.css';
import { LandscapeImage, LandscapeLinkableImage } from '../Image';
import Card from '../Card';
import { asCardHorizontal, asCardDefaultStyle } from '../Card/token';
import { Reponsive16By9YouTube } from '../YouTube';
import PlayIcon from './icons/Play';
import PauseIcon from './icons/Pause';

const withImageSlide = withDesign({
  Slider: withDesign({
    Title: replaceWith(LandscapeImage),
  }),
});

const HorizontalCard = flow(
  asCardHorizontal,
  asCardDefaultStyle,
)(Card);

const withChameleonSlide = withDesign({
  Slider: flowHoc(
    asBodilessChameleon('cham-slide', { component: 'GatsbyImage' }),
    withDesign({
      Linkable: withDesign({
        Title: replaceWith(LandscapeLinkableImage),
      }),
      GatsbyImage: withDesign({
        Title: replaceWith(LandscapeImage),
      }),
      HorizontalCard: withDesign({
        Title: replaceWith(HorizontalCard),
      }),
      Video: withDesign({
        Title: replaceWith(Reponsive16By9YouTube),
      }),
    }),
  ),
});

const withAutoPlay = flowHoc(
  withDesign({
    Wrapper: ifReadOnly(
      addProps({
        isPlaying: true,
      }),
    ),
  }),
);

const withNavButtonStyles = addClasses('p-2 text-white uppercase bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed');

const withNavButtonsStyles = withDesign({
  SliderWrapper: addClasses('relative'),
  ButtonNext: flowHoc(
    withNavButtonStyles,
    addClasses('absolute transform -translate-y-1/2 top-1/2 right-0 left-auto rtl:left-0 rtl:right-auto'),
    addProps({
      children: 'Next',
    }),
  ),
  ButtonBack: flowHoc(
    withNavButtonStyles,
    addClasses('absolute transform -translate-y-1/2 top-1/2 left-0 right-auto rtl:right-0 rtl:left-auto'),
    addProps({
      children: 'Back',
    }),
  ),
});

const withControlsWrapperStyles = withDesign({
  ControlsWrapper: addClasses('flex justify-center pt-2'),
});

const withDotStyles = flowHoc(
  withControlsWrapperStyles,
  withDesign({
    Dots: flowHoc(
      addClasses('flex items-center'),
      withDesign({
        Item: withDesign({
          Dot: flowHoc(
            addClasses('w-2 h-2 rounded-full mx-2 p-1 inline-block border-2 border-solid align-middle'),
            ifToggledOn(useIsCarouselItemActive)(
              addClasses('bg-blue-700'),
            ),
          ),
        }),
      }),
    ),
  }),
);

const withAutoPlayButtonStyles = flowHoc(
  withControlsWrapperStyles,
  withDesign({
    ButtonPlay: flowHoc(
      addClasses('ml-2 rounded-full p-1 block w-8'),
      addClasses('leading-none text-1xl bg-blue-700 text-white'),
      addClasses('disabled:opacity-50 disabled:cursor-not-allowed'),
      withChild(Fragment),
      withDesign({
        Child: flowHoc(
          ifToggledOn(useCarouselIsPlaying)(withChild(PauseIcon)),
          ifToggledOff(useCarouselIsPlaying)(withChild(PlayIcon)),
        ),
      }),
    ),
  }),
);

const withSlideItemAriaLabel: HOC = Component => props => {
  const isSlideActive = useIsCarouselItemActive();
  const slideIndex = useCarouselSlideIndex() + 1;
  const ariaLabel = isSlideActive ? `Current Slide: Slide ${slideIndex}` : `Slide ${slideIndex}`;
  return <Component {...props} aria-label={ariaLabel} />;
};

const asAccessibleCarousel = flowHoc(
  asBaseAccessibleCarousel,
  withDesign({
    ButtonBack: addProps({
      'aria-label': 'Click for the previous slide',
    }),
    ButtonNext: addProps({
      'aria-label': 'Click for the next slide',
    }),
    Dots: withDesign({
      Item: withSlideItemAriaLabel,
    }),
    ButtonPlay: flowHoc(
      addPropsIf(useCarouselIsPlaying)({
        'aria-label': 'Pause to stop slides',
      }),
      addPropsIf(negate(useCarouselIsPlaying))({
        'aria-label': 'Play to continue',
      }),
    ),
  }),
);

export {
  withImageSlide,
  withAutoPlay,
  withNavButtonsStyles,
  withDotStyles,
  withAutoPlayButtonStyles,
  withChameleonSlide,
  asAccessibleCarousel,
};
