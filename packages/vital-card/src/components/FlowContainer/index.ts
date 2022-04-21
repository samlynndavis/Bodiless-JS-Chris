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
import {
  on, varyDesigns,
} from '@bodiless/fclasses';
import {
  CardClean, vitalCard, CardStatic, vitalCardStatic,
} from '../Card';

// For the base variation, we apply the default token to the design key of
// the designable element. This can be overridden from the design context.
const BaseVariation = {
  Card: on(CardClean)(vitalCard.Base),
};

const OrientationVariations = {
  Vertical: vitalCard.WithVerticalOrientation,
  Horizontal: vitalCard.WithHorizontalOrientation,
};
const TitleVariations = {
  NoTitle: vitalCard.WithNoTitle,
};
const DescriptionVariations = {
  NoDescription: vitalCard.WithNoDescription,
};

/**
 * Token which adds Card variations to a flow container.
 */
const WithCardVariations = asFluidToken({
  Components: {
    Card: on(CardStatic)(vitalCardStatic.Base, vitalCardStatic.WithVerticalOrientation),
    ...varyDesigns(
      BaseVariation,
      OrientationVariations,
      TitleVariations,
      DescriptionVariations,
    ),
  }
});

export const vitalCardFlowContainer = { WithCardVariations };
