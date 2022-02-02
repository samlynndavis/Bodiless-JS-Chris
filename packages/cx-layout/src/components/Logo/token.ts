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

import {
  addProps,
} from '@bodiless/fclasses';
import {
  withFlexCenterXY,
  t,
} from '@canvasx/elements';
import {
  withSidecarNodes,
} from '@bodiless/core';
import { asBodilessLink, asBodilessImage } from '@bodiless/components-ui';
import { asSchemaSource } from '@canvasx/structuredata';
import { asLogoToken } from './LogoClean';

const Base = asLogoToken({
  Layout: {
    Wrapper: t(
      withFlexCenterXY,
      'order-1',
    ),
  },
  SEO: {
    Image: asSchemaSource('organization-logo'),
  },
  Spacing: {
    Link: 'h-44px lg:h-88px max-w-240px lg:max-w-441px',
    Image: 'max-h-full',
  },
  Schema: {
    Link: withSidecarNodes(
      asBodilessLink({ nodeKey: 'SiteLink', nodeCollection: 'site' }),
    ),
    Image: t(
      asBodilessImage({ nodeKey: 'SiteLogo', nodeCollection: 'site' }),
      addProps({
        loading: 'eager',
      }),
    ),
  },
});

export const cxLogo = { Base };
