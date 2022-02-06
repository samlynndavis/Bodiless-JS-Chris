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

import {
  addClasses,
  withDesign,
  flowHoc,
} from '@bodiless/fclasses';
import {
  asCardVertical as asBCardVertical,
  asCardHorizontal as asBCardHorizontal,
  asCardNoTitle as asCardNoTitle$,
  asCardNoBody as asCardNoBody$,
  asCardNoCta as asCardNoCta$,
  asCardOverlayTitle as asCardOverlayTitle$,
  asCardOverlayCta as asCardOverlayCta$,
  asCardNoBodyNoTitle as asCardNoBodyNoTitle$,
} from '@bodiless/card';
import {
  asImageRounded,
  asCta,
  asHeader2,
  asBlockItem,
  asTextColorPrimary,
  withCategory,
} from '../Elements.token';

const asCardHorizontal$ = flowHoc(
  withDesign({
    Title: addClasses('px-2'),
    Body: addClasses('px-2'),
    Link: addClasses('md:mx-2'),
  }),
  asBCardHorizontal,
);
const asCardVertical$ = flowHoc(
  withDesign({
    Title: addClasses('px-2'),
    Body: addClasses('px-2'),
  }),
  asBCardVertical,
);

const asCardDefaultStyle$ = withDesign({
  Wrapper: asTextColorPrimary,
  Image: asImageRounded,
  Title: asHeader2,
  Link: asCta,
});

const asCardWithPaddings$ = withDesign({
  Wrapper: asBlockItem,
});

const asCardTextWhite$ = withDesign({
  Title: addClasses('text-white'),
  Body: addClasses('text-white'),
});

const asRtlCard$ = withDesign({
  Title: addClasses('rtl:text-right'),
  Body: addClasses('rtl:text-right'),
});

const asCardHorizontal = withCategory('Orientation')(asCardHorizontal$);
const asCardVertical = withCategory('Orientation')(asCardVertical$);
const asCardNoTitle = withCategory('Structure')(asCardNoTitle$);
const asCardNoBody = withCategory('Structure')(asCardNoBody$);
const asCardNoCta = withCategory('Structure')(asCardNoCta$);
const asCardDefaultStyle = withCategory('Appearance')(asCardDefaultStyle$);
const asCardOverlayTitle = withCategory('Layout')(asCardOverlayTitle$);
const asCardOverlayCta = withCategory('Layout')(asCardOverlayCta$);
const asCardNoBodyNoTitle = withCategory('Structure')(asCardNoBodyNoTitle$);
const asCardWithPaddings = withCategory('Layout')(asCardWithPaddings$);
const asCardTextWhite = withCategory('Appearance')(asCardTextWhite$);
const asRtlCard = withCategory('Appearance')(asRtlCard$);
const withMenuCardStyles = flowHoc(
  asCardTextWhite,
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardHorizontal,
  asRtlCard,
);

export {
  asCardHorizontal,
  asCardVertical,
  asCardNoTitle,
  asCardNoBody,
  asCardNoCta,
  asCardDefaultStyle,
  asCardOverlayTitle,
  asCardOverlayCta,
  asCardNoBodyNoTitle,
  asCardWithPaddings,
  asCardTextWhite,
  withMenuCardStyles,
};
