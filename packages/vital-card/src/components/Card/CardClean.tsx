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

import React, { FC, ComponentType, HTMLProps } from 'react';
import flow from 'lodash/flow';
import {
  designable,
  DesignableComponentsProps,
  Div,
  A,
  Img,
  StylableProps,
  DesignableProps,
  Fragment,
  as,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/core';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { EditorPlainClean } from '@bodiless/vital-editors';
import { LinkClean } from '@bodiless/vital-link';

export type CardComponents = {
  Wrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  EyebrowWrapper: ComponentType<StylableProps>,
  Eyebrow: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  TitleWrapper: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  DescriptionWrapper: ComponentType<StylableProps>,
  Description: ComponentType<StylableProps>,
  RatingWrapper: ComponentType<StylableProps>,
  Rating: ComponentType<StylableProps>,
  CTAWrapper: ComponentType<StylableProps>,
  CTALink: ComponentType<StylableProps>,
  CTAText: ComponentType<StylableProps>,
};
const cardComponentStart: CardComponents = {
  Wrapper: A,
  ImageLink: Fragment,
  Image: Img,
  EyebrowWrapper: Fragment,
  Eyebrow: Fragment,
  ContentWrapper: Div,
  TitleWrapper: Fragment,
  Title: as()(EditorPlainClean),
  DescriptionWrapper: Div,
  Description: as()(EditorPlainClean),
  Rating: Fragment,
  RatingWrapper: Fragment,
  CTAText: as()(EditorPlainClean),
  CTALink: as()(LinkClean),
  CTAWrapper: Fragment,
};

export type CardProps = DesignableProps<CardComponents> & HTMLProps<HTMLElement>;
type CardBaseProps = DesignableComponentsProps<CardComponents> & HTMLProps<HTMLElement>;

const CardBase: FC<CardBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    Image,
    ImageLink,
    ContentWrapper,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    RatingWrapper,
    Rating,
    CTAWrapper,
    CTALink,
    CTAText,
  } = components;

  return (
    <Wrapper {...rest}>
      <ImageLink>
        <Image />
      </ImageLink>
      <ContentWrapper>
        <TitleWrapper>
          <Title />
        </TitleWrapper>
        <DescriptionWrapper>
          <Description />
        </DescriptionWrapper>
        <RatingWrapper>
          <Rating />
        </RatingWrapper>
        <CTAWrapper>
          <CTALink>
            <CTAText />
          </CTALink>
        </CTAWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const CardClean = flow(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase);

const asCardToken = asVitalTokenSpec<CardComponents>();

export default CardClean;
export { CardClean, asCardToken };
