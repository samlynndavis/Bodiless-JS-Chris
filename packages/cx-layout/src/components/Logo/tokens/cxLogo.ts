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

import {
  as, startWith,
} from '@bodiless/fclasses';
import {
  cxElement,
} from '@bodiless/cx-elements';
import {
  cxImage
} from '@bodiless/cx-image';
import {
  withNode,
  withNodeKey,
  withSidecarNodes,
} from '@bodiless/core';
import { asBodilessLink } from '@bodiless/components-ui';
import { GatsbyLink } from '@bodiless/gatsby-theme-bodiless';
import { asLogoToken } from '../LogoClean';

const Default = asLogoToken({
  Layout: {
    Wrapper: as(
      cxElement.WithFlexCenterXY,
    ),
  },
  Spacing: {
    Wrapper: 'w-full max-w-48 lg:max-w-56',
    Image: 'max-h-full',
  },
  Components: {
    Image: as(
      cxImage.Default,
      cxImage.WithEager,
    ),
  },
  Schema: {
    Image: withNodeKey('image'),
    // @todo should this be a cx-link?
    // @todo can we separate sidecar nodekeys from editors?
    Link: withSidecarNodes(
      asBodilessLink('link', { href: '/' }),
    ),
    _: withNode,
  },
});

const WithGatsbyLink = asLogoToken({
  ...Default,
  Components: {
    ...Default.Components,
    Link: startWith(GatsbyLink)
  }
});

export default {
  Default,
  WithGatsbyLink,
};
