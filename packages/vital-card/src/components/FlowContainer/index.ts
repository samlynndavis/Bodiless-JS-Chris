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

import { asFluidToken } from '@bodiless/vital-elements';
import { on, varyDesigns, flowHoc } from '@bodiless/fclasses';
import {
  CardClean, vitalCard, CardStatic, vitalCardStatic, asCardToken,
} from '../Card';

const BaseVariation = {
  Card: on(CardClean)(vitalCard.Base),
};

const OrientationVariations = {
  Vertical: on(CardClean)(vitalCard.WithVerticalOrientation),
  Horizontal: on(CardClean)(vitalCard.WithHorizontalOrientation),
};
const TitleVariations = {
  Title: on(CardClean)(
    vitalCard.Base,
    asCardToken({
      Meta: flowHoc.meta.term('Title')('With Title'),
    }),
  ),
  NoTitle: on(CardClean)(
    vitalCard.WithNoTitle,
    asCardToken({
      Meta: flowHoc.meta.term('Title')('With No Title'),
    }),
  ),
};
const DescriptionVariations = {
  Description: on(CardClean)(vitalCard.Base),
  NoDescription: on(CardClean)(vitalCard.WithNoDescription),
};

/**
 * Token which adds Card variations to a flow container.
 */
const WithCardVariations = asFluidToken({
  Components: {
    VerticalCard: on(CardStatic)(vitalCardStatic.Base, vitalCardStatic.WithVerticalOrientation),
    HeroCard: on(CardStatic)(vitalCardStatic.Base, vitalCardStatic.Hero),
    ...varyDesigns(
      BaseVariation,
      OrientationVariations,
      TitleVariations,
      DescriptionVariations,
    ),
  }
});

export const vitalCardFlowContainer = { WithCardVariations };
