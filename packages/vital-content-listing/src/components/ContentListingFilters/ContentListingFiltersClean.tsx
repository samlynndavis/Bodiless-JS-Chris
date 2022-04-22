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

import React from 'react';
import { addProps, as, flowHoc } from '@bodiless/fclasses';
import { FilterByGroupClean, FilterByGroupComponents } from '@bodiless/filtering';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { vitalContentListingFlowContainer } from '../ContentListingFlowContainer';

const FlowContainer = as(vitalContentListingFlowContainer.Default)(FlowContainerClean);

const ContentListingFiltersClean = flowHoc(
  addProps({ children: <FlowContainer /> }),
)(FilterByGroupClean);

export const asContentListingFiltersToken = asVitalTokenSpec<FilterByGroupComponents>();

export default ContentListingFiltersClean;
