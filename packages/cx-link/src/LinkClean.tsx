import React, { FC, ComponentType } from 'react';
import {
  A, Span, Fragment, designable, DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';

export type LinkComponents = {
  Wrapper: ComponentType<any>,
  Body: ComponentType<any>,
  ExternalSRText: ComponentType<any>,
};

type LinkBaseProps = DesignableComponentsProps<LinkComponents>;

const linkComponents: LinkComponents = {
  Wrapper: A,
  Body: Span,
  ExternalSRText: Fragment,
};

const LinkBase: FC<LinkBaseProps> = ({ components: C, children, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.ExternalSRText />
    <C.Body>
      {children}
    </C.Body>
  </C.Wrapper>
);

const asLinkToken = asCxTokenSpec<LinkComponents>();

const LinkClean = designable(linkComponents, 'Link')(LinkBase);

export { LinkClean, asLinkToken };
