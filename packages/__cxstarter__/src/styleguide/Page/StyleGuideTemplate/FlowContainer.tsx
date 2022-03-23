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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
} from '@bodiless/fclasses';
import { cxFlowContainer, FlowContainerClean } from '@bodiless/cx-flowcontainer';

import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';

const DefaultFlowContainer = as(
  cxFlowContainer.Default,
  withNodeKey('defaultcontainer'),
)(FlowContainerClean);

const DefaultFlowContainerWithGutters = as(
  cxFlowContainer.DefaultWithGutters,
  withNodeKey('defaultgutterscontainer'),
)(FlowContainerClean);

const FullFlowContainer = as(
  cxFlowContainer.DefaultWithGutters,
  cxFlowContainer.WithFullWidthConstraint,
  withNodeKey('fullwidthcontainer'),
)(FlowContainerClean);

const OneThirdContainer = as(
  cxFlowContainer.DefaultWithGutters,
  cxFlowContainer.WithTabletOneThirdConstraint,
  withNodeKey('onethirdcontainer'),
)(FlowContainerClean);

const ContentRegionContainer = as(
  cxFlowContainer.ContentRegion,
  withNodeKey('contentregioncontainer'),
)(FlowContainerClean);

const Examples = (props: any) => (
  <>
    <DefaultFlowContainer />
    <hr />
    <DefaultFlowContainerWithGutters />
    <hr />
    <FullFlowContainer />
    <hr />
    <OneThirdContainer />
    <hr />
    <ContentRegionContainer />
  </>
);

export const FlowContainer = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('FlowContainer'),
  Content: {
    Title: replaceWith(() => <>FlowContainer</>),
    Examples: replaceWith(Examples),
  },
});
