/**
 * Copyright © 2020 Johnson & Johnson
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
import {
  designable,
  DesignableComponentsProps,
  DesignableProps,
  Div,
} from '@bodiless/fclasses';
import { Editable } from '@bodiless/components';

const today = new Date();
const date = new Intl.DateTimeFormat().format(today);
const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(today);

type FooterComponents = {
  Wrapper: ComponentType<any>,
  Container: ComponentType<any>,
};

export type Props = {
  siteTitle: string,
} & DesignableComponentsProps<FooterComponents> & HTMLProps<HTMLElement>;

const footerComponents:FooterComponents = {
  Wrapper: Div,
  Container: Div,
};

const FooterClean: FC<DesignableProps & { siteTitle: string }> = ({ siteTitle, components }) => {
  const {
    Wrapper,
    Container,
  } = components;

  return (
    <Wrapper>
      <Container>
        <p>
          ©
          {siteTitle}
          &nbsp;2019-
          {year}
        </p>
        <Editable nodeKey="copyright" placeholder="Insert Copyright" nodeCollection="site" />
        {date}
      </Container>
    </Wrapper>
  );
};

const Footer = designable(footerComponents)(FooterClean);
export default Footer;
