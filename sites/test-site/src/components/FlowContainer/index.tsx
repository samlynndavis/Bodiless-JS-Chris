/**
 * Copyright © 2019 Johnson & Johnson
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

import { withDesign, flowHoc } from '@bodiless/fclasses';
import {
  withMandatoryCategories,
  ifNotComponentSelector,
  withLibraryComponents,
} from '@bodiless/layouts';
import { FlowContainer } from '@bodiless/layouts-ui';
import withRichTextVariations from './withRichTextVariations';
import withImageVariations from './withImageVariations';
import withFlowContainerVariations, { withLibraryFlowContainerVariations } from './withFlowContainerVariations';
import asDefaultFlowContainer from './asDefaultFlowContainer';
import { asFlowContainerRTL, asFlowContainerWithMargins } from './token';

const FlowContainerDefault = flowHoc(
  asDefaultFlowContainer,
  withFlowContainerVariations,
)(FlowContainer);

const FlowContainerWithContentLibrary = flowHoc(
  // withLibraryComponents should be applied before any other HOC designs.
  withLibraryComponents(),
  asDefaultFlowContainer,
  withLibraryFlowContainerVariations,
)(FlowContainer);

const FlowContainerDefaultRTL = flowHoc(
  ifNotComponentSelector(
    withDesign({
      FlowContainer: asFlowContainerRTL,
    }),
  ),
  asFlowContainerRTL,
)(FlowContainerDefault);

const FlowContainerWithContentLibraryRTL = flowHoc(
  withLibraryComponents(),
  asDefaultFlowContainer,
  withLibraryFlowContainerVariations,
  ifNotComponentSelector(
    withDesign({
      FlowContainer: asFlowContainerRTL,
    }),
  ),
  asFlowContainerRTL,
)(FlowContainer);

const FlowContainerLimited = flowHoc(
  withRichTextVariations,
  withImageVariations,
  asFlowContainerWithMargins,
  withMandatoryCategories(['Orientation', 'Type']),
)(FlowContainer);

// eslint-disable-next-line import/prefer-default-export
export {
  FlowContainerDefault,
  FlowContainerLimited,
  FlowContainerDefaultRTL,
  FlowContainerWithContentLibrary,
  FlowContainerWithContentLibraryRTL,
};
