import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Img, Section, designable, Div,
} from '@bodiless/fclasses';
import { RichText } from '@bodiless/richtext-ui';
import { asTokenSpec } from '../../asTokenspec';

type CaptionedImageComponents = {
  Wrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
  BodyWrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type CaptionedImageProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<CaptionedImageComponents>;

const CaptionedImageBase: FC<CaptionedImageProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Image />
    <C.BodyWrapper>
      <C.Body />
    </C.BodyWrapper>
  </C.Wrapper>
);

const captionedImageComponents: CaptionedImageComponents = {
  Wrapper: Section,
  Image: Img,
  Body: RichText,
  BodyWrapper: Div,
};

const CaptionedImageClean = designable(captionedImageComponents, 'CaptionedImage')(CaptionedImageBase);

const asCaptionedImageToken = asTokenSpec<CaptionedImageComponents>();

export default CaptionedImageClean;
export { asCaptionedImageToken };
