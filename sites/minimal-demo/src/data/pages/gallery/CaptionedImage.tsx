import React, { FC, HTMLProps } from 'react';
import { asBodilessImage } from '@bodiless/components-ui';
import { withNode } from '@bodiless/core';
import {
  Img, Section, Div, addClasses, stylable, flowHoc,
} from '@bodiless/fclasses';
import withSimpleEditor from './withSimpleEditor';

const Wrapper = Section;
const Image = flowHoc(addClasses('w-full'), asBodilessImage('image'))(Img);
const Body = withSimpleEditor('caption', 'Caption')(Div);

const CaptionedImageBase: FC<HTMLProps<HTMLElement>> = props => (
  <Wrapper {...props}>
    <Image />
    <Body />
  </Wrapper>
);

const CaptionedImage = flowHoc(
  stylable,
  withNode,
)(CaptionedImageBase);

export default CaptionedImage;
