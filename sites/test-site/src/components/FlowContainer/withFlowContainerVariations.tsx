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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  withDesign,
  replaceWith,
  Div,
  flowHoc,
} from '@bodiless/fclasses';
import {
  withTitle,
  withDesc,
  ifComponentSelector,
  withLibraryComponents,
} from '@bodiless/layouts';
import { FlowContainer } from '@bodiless/layouts-ui';
import { withType } from './Categories';
import asDefaultFlowContainer from './asDefaultFlowContainer';

const FlowContainerPreview = () => <Div className="bl-bg-black">Flow Container Preview</Div>;

const withFlowContainerVariations = withDesign({
  FlowContainer: flowHoc(
    replaceWith(
      flowHoc(
        asDefaultFlowContainer,
        withNodeKey('innerFC'),
      )(FlowContainer),
    ),
    ifComponentSelector(
      replaceWith(FlowContainerPreview),
    ),
    withType('Flow Container')(),
    withTitle('Flow Container'),
    withDesc('Adds a flow container'),
  ),
});

export const withLibraryFlowContainerVariations = withDesign({
  FlowContainer: flowHoc(
    replaceWith(
      flowHoc(
        withLibraryComponents(),
        asDefaultFlowContainer,
        withNodeKey('innerLibraryFC'),
      )(FlowContainer),
    ),
    ifComponentSelector(
      replaceWith(FlowContainerPreview),
    ),
    withType('Flow Container with Library')(),
    withTitle('Flow Container with Library'),
    withDesc('Adds a flow container with library'),
  ),
});

export default withFlowContainerVariations;
