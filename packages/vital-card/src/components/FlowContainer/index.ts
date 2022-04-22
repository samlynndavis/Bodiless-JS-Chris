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
import { on, varyDesigns } from '@bodiless/fclasses';
import {
  CardClean, vitalCard, CardStatic, vitalCardStatic,
} from '../Card';

const BaseVariation = {
  Card: on(CardClean)(vitalCard.Base),
};

const OrientationVariations = {
  Vertical: vitalCard.WithVerticalOrientation,
  Horizontal: vitalCard.WithHorizontalOrientation,
};
const ContentVariations = {
  NoTitle: vitalCard.WithNoTitle,
  NoDescription: vitalCard.WithNoDescription,
};

/**
 * Token which adds Card variations to a flow container.
 */
const WithCardVariations = asFluidToken({
  Components: {
    HeroCard: on(CardStatic)(vitalCardStatic.Base, vitalCardStatic.Hero),
    Vertical: on(CardStatic)(vitalCardStatic.Base, vitalCardStatic.WithVerticalOrientation),
    Horizontal: on(CardStatic)(vitalCardStatic.Base, vitalCardStatic.WithHorizontalOrientation),
    ...varyDesigns(
      BaseVariation,
      ContentVariations,
      OrientationVariations,
    ),
  }
});

export const vitalCardFlowContainer = { WithCardVariations };
