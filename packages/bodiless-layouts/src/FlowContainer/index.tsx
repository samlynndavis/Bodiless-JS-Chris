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

import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { flow } from 'lodash';
import {
  withNode,
  useEditContext,
} from '@bodiless/core';
import {
  withDesign,
  addClasses,
} from '@bodiless/fclasses';
import EditFlowContainer from './EditFlowContainer';
import StaticFlowContainer from './StaticFlowContainer';
import { EditFlowContainerProps } from './types';

const FlowContainerBasic: FC<EditFlowContainerProps> = props => {
  const { isEdit } = useEditContext();
  return isEdit
    ? <EditFlowContainer {...props} />
    : <StaticFlowContainer {...props} />;
};

const FlowContainerDesignable = flow(
  observer,
  withDesign({
    Wrapper: addClasses('flex flex-wrap'),
  }),
)(FlowContainerBasic);

const FlowContainer = withNode(FlowContainerDesignable);
export default FlowContainer;
