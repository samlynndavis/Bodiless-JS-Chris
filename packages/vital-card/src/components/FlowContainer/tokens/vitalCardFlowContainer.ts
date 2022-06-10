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
  on, varyDesigns, flowHoc, extendDesign,
} from '@bodiless/fclasses';
import {
  CardClean, vitalCard, asCardToken,
} from '../../Card';

/*
  * Content Variations to use all fields or remove specic fields.
  */
const ContentVariations = {
  All: asCardToken({
    Meta: flowHoc.meta.term('Features')('With All Fields'),
  }),
  NoTitle: vitalCard.WithNoTitle,
  NoDescription: vitalCard.WithNoDescription,
  NoEyebrow: vitalCard.WithNoEyebrow,
};

/*
  * Horizontal Variations to vary on Left or Right Images & Content Top & Centered.
  */
const HorizontalVariations = varyDesigns(
  {
    Left: vitalCard.WithHorizontalLeftOrientation,
    Right: vitalCard.WithHorizontalRightOrientation,
  },
  {
    ContentTop: vitalCard.WithHorizontalContentAtTop,
    ContentCentered: vitalCard.WithHorizontalContentCentered,
  },
);

/*
  * Vary Horizontal Variations over Content Varitions
  */
const HorizontalOrientationVariations = varyDesigns(
  HorizontalVariations,
  ContentVariations,
);

/*
  * Vary Vertical Variations over Content Varitions
  */
const VerticalOrientationVariations = varyDesigns(
  {
    Vertical: vitalCard.WithVerticalOrientation,
  },
  ContentVariations,
);

/*
  * Combine Horizontal with Vertical
  */
const OrientationVariations = extendDesign(
  HorizontalOrientationVariations,
  VerticalOrientationVariations,
);

/*
  * Compose the Basic Variations
  * Defined by Fully clickable card with no visible CTA varied over
  *  - Orientation Properties
  *  - Content Varitions
  */
const BasicVariation = {
  Card: on(CardClean)(vitalCard.Basic, vitalCard.WithFlowContainerPreview),
};

const BasicVariations = varyDesigns(
  BasicVariation,
  OrientationVariations,
);

/*
  * Link CTA variations
  */
const LinkVariations = {
  Link: vitalCard.WithPrimaryTextLink,
  PrimaryButton: vitalCard.WithPrimaryButton,
  SecondaryButton: vitalCard.WithSecondaryButton,
};

/*
  * Compose the Hero Variations
  * Defined by horizontal only cards with visible CTA varied over
  *  - Link Styles
  *  - Horizontal Variations to vary on Left or Right Images & Content Top & Centered.
  */
const HeroVariations = varyDesigns(
  {
    Hero: on(CardClean)(vitalCard.BaseHero, vitalCard.WithFlowContainerPreview),
  },
  LinkVariations,
  HorizontalVariations,
);

/*
  * TBD: Stubbing out future Category / Topic / Product
  * Will comment out so these don't have to fully built & tested yet.
  */

/*
  * Compose the Category Variations
  * Defined by vertical only cards and fully clickable and only image & title.
  * No variations
  */
const CategoryVariations = {
  Category: on(CardClean)(vitalCard.Category, vitalCard.WithFlowContainerPreview),
};

/*
  * Compose the Topic Variations
  * Defined by vertical only cards and with CTA varied over
  * - Link Variations
  * - Content remove of eyebrow
  */
const TopicVariations = varyDesigns(
  {
    Topic: on(CardClean)(vitalCard.Topic, vitalCard.WithFlowContainerPreview),
  },
  LinkVariations,
  {
    All: asCardToken({
      Meta: flowHoc.meta.term('Features')('With All Fields'),
    }),
    NoEyebrow: vitalCard.WithNoEyebrow,
  }
);

/*
  * Product Content Variations to use all fields or remove specic fields.
  */
const ProductContentVariations = {
  All: asCardToken({
    Meta: flowHoc.meta.term('Features')('With All Fields'),
  }),
  NoDescription: vitalCard.WithNoDescription,
  NoEyebrow: vitalCard.WithNoEyebrow,
  NoRatings: asCardToken({
    Meta: flowHoc.meta.term('Features')('No Ratings'),
  }),
};

/*
  * Compose the Product Variations
  * Defined by vertical only cards
  * - Fully Clickable or with Link Variations
  * - Product content varations
  */
const ProductVariations = varyDesigns(
  {
    Product: on(CardClean)(vitalCard.Product, vitalCard.WithFlowContainerPreview),
  },
  {
    FullyClickable: asCardToken({ Meta: flowHoc.meta.term('CTA Type')('Fully Clickable'), }),
    ...LinkVariations,
  },
  ProductContentVariations,
);

/**
  * Token which adds Card variations to a flow container.
  */
const WithCardVariations = asFluidToken({
  Components: {
    ...BasicVariations,
    ...HeroVariations,
    ...CategoryVariations,
    ...TopicVariations,
    ...ProductVariations,
  },
});

const vitalCardFlowContainer = {
  WithCardVariations,
  BasicVariations,
  HeroVariations,
  CategoryVariations,
  TopicVariations,
  ProductVariations,
};

export default vitalCardFlowContainer;
