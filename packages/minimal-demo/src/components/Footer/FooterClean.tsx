import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Section, designable,
} from '@bodiless/fclasses';
import { RichText } from '@bodiless/richtext-ui';
import { asTokenSpec } from '../../asTokenspec';

type FooterComponents = {
  Wrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type FooterProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<FooterComponents>;

const FooterBase: FC<FooterProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Body />
  </C.Wrapper>
);

const footerComponents: FooterComponents = {
  Wrapper: Section,
  Body: RichText,
};

const FooterClean = designable(footerComponents, 'Footer')(FooterBase);

const asFooterToken = asTokenSpec<FooterComponents>();

export default FooterClean;
export { asFooterToken };
