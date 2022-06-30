import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Section, designable, H2,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import { asTokenSpec } from '../../asTokenspec';

type GalleryComponents = {
  Wrapper: ComponentOrTag<any>,
  Header: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type GalleryProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<GalleryComponents>;

const GalleryBase: FC<GalleryProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Header />
    <C.Body />
  </C.Wrapper>
);

const galleryComponents: GalleryComponents = {
  Wrapper: Section,
  Header: H2,
  Body: FlowContainer,
};

const GalleryClean = designable(galleryComponents, 'Gallery')(GalleryBase);

const asGalleryToken = asTokenSpec<GalleryComponents>();

export default GalleryClean;
export { asGalleryToken };
