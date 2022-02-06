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

import { WithNodeKeyProps, withNodeKey } from '@bodiless/core';
import {
  HOC, addProps, withDesign, flowHoc,
} from '@bodiless/fclasses';

import { withBreadcrumbStartingTrail, withBreadcrumbFinalTrail } from './Breadcrumbs';
import { asMenuTitle, withDefaultMenuTitleEditors } from '../Menu/MenuTitles';

const withDefaultNodeKeys = (defaultKey: string) => (nodeKeys?: WithNodeKeyProps) => (
  typeof nodeKeys === 'string'
    ? nodeKeys
    : { nodeKey: defaultKey, ...nodeKeys }
);

const withDefaultStartingTrailNodeKey = withDefaultNodeKeys('startingTrail');
const withDefaultFinalTrailNodeKey = withDefaultNodeKeys('finalTrail');

/**
 * If no custom values are specified for the StartingTrail it will default to
 * `Home` as a Title with a Link to `/` when link-toggle is ON.
 */
const withDefaultStartingTrailData = withDesign({
  // Default StartingTrail Title text to 'Home'
  Title: addProps({ children: 'Home' }),
  // Default StartingTrail link to /
  Link: addProps({ href: '/' }),
});

/**
 * Enables rendering of the starting trail for a Breadcrumb component with a provided Editors.
 * Uses `withDefaultMenuTitleEditors` by default, pre-configured with a link to the home page.
 *
 * @param withTitleEditors
 * Editors token that will be applied to the Title key of the StartingTrail component.
 *
 * @param nodeKeys
 * Optional nodeKeys of type `WithNodeKeyProps` that will be applied to the StartingTrail.
 *
 * @return
 * HOC that adds starting trail with provided Title Editors and nodeKeys.
 */
export const withEditableStartingTrail = (
  withTitleEditors: HOC = withDefaultMenuTitleEditors,
  nodeKeys?: WithNodeKeyProps,
) => flowHoc(
  withBreadcrumbStartingTrail,
  withDesign({
    StartingTrail: flowHoc(
      asMenuTitle,
      withTitleEditors,
      withNodeKey(withDefaultStartingTrailNodeKey(nodeKeys)),
      withDefaultStartingTrailData,
    ),
  }),
);

/**
 * Enables rendering of the final trail for a Breadcrumb component with a provided Editors.
 * Uses `withDefaultMenuTitleEditors` by default.
 *
 * @param withTitleEditors
 * Editors token that will be applied to the Title key of the FinalTrail component.
 *
 * @param nodeKeys
 * Optional nodeKeys of type `WithNodeKeyProps` that will be applied to the FinalTrail.
 *
 * @return
 * HOC that adds final trail with provided Title Editors and nodeKeys.
 */
export const withEditableFinalTrail = (
  withTitleEditors: HOC = withDefaultMenuTitleEditors,
  nodeKeys?: WithNodeKeyProps,
) => flowHoc(
  withBreadcrumbFinalTrail,
  withDesign({
    FinalTrail: flowHoc(
      asMenuTitle,
      withTitleEditors,
      withNodeKey(withDefaultFinalTrailNodeKey(nodeKeys)),
    ),
  }),
);
