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

import { ComponentType } from 'react';
import { withNode, } from '@bodiless/data';
import {
  withDesign,
  addClasses,
} from '@bodiless/fclasses';
import StaticFlowContainer from './StaticFlowContainer';
import type { FlowContainerProps } from './types';

const FlowContainerDesignable = withDesign({
  Wrapper: addClasses('flex flex-wrap'),
})(StaticFlowContainer);

const FlowContainer = withNode(FlowContainerDesignable) as ComponentType<FlowContainerProps>;

export default FlowContainer;
