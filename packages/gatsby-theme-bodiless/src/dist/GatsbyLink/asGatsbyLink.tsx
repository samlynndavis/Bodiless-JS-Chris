/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { ComponentType } from 'react';
import { Link as BaseGatsbyLink } from 'gatsby';
import type { GatsbyLinkProps } from 'gatsby';
import {
  designable,
  stylable,
  withDesign,
  A,
  addProps,
  HOC,
  ComponentOrTag,
  DesignableProps,
  flowHoc,
} from '@bodiless/fclasses';
import { ifReadOnly } from '@bodiless/core';
import type { BodilessLinkProps } from '@bodiless/components';

type Components = {
  GatsbyLink: ComponentOrTag<GatsbyLinkProps<any>>,
  Link: ComponentOrTag<BodilessLinkProps>,
};

/**
 * leveraging logic form gatsby
 */
const isLocalLink = (path: string) => path
  && !path.startsWith('http://')
  && !path.startsWith('https://')
  && !path.startsWith('//');

const isFile = (path: string) => /\.[0-9a-z]+$/i.test(path);

const asGatsbyLink$: HOC<BodilessLinkProps, DesignableProps<Components>> = Component => {
  const startComponents: Components = {
    GatsbyLink: BaseGatsbyLink,
    Link: Component as ComponentOrTag<BodilessLinkProps>,
  };
  const AsGatsbyLink = (props: any) => {
    const { components, href, ...rest } = props;
    const {
      Link,
      GatsbyLink,
    } = components;
    if (!isLocalLink(href) || isFile(href)) return <Link {...rest} href={href} />;
    return <GatsbyLink {...rest} to={href} />;
  };
  return designable(startComponents, 'GatsbyLink')(AsGatsbyLink) as ComponentType<any>;
};

const asGatsbyLink = flowHoc(
  ifReadOnly(
    withDesign({
      GatsbyLink: stylable,
    }),
    asGatsbyLink$,
  ),
);

const asTestableGatsbyLink = withDesign({
  GatsbyLink: addProps({ 'data-link-type': 'gatsby-link' }),
  Link: addProps({ 'data-link-type': 'plain-link' }),
});

const GatsbyLink = asGatsbyLink(A);

export {
  GatsbyLink,
  asGatsbyLink,
  asTestableGatsbyLink,
};
