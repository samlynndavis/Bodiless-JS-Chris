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
  asSubList, asBodilessList, asEditable, withSimpleSubListDesign,
} from '@bodiless/components';
import {
  withDesign, addClasses, stylable, replaceWith, flowHoc,
} from '@bodiless/fclasses';

export const withSimpleTitle = withDesign({
  Title: flowHoc(
    replaceWith('span'),
    asEditable('text', 'Item'),
  ),
});

export const withItemMargin = withDesign({
  Item: flowHoc(stylable, addClasses('ml-5')),
});

// const BasicCompoundListVerbose = flowHoc(
//   asBodilessList(),
//   withSimpleTitle,
//   withSubLists,
//   withTitles,
//   withMargins,
// )('ul');

const withListDesign = withSimpleSubListDesign(2);
const BasicCompoundList = flowHoc(
  asBodilessList(),
  withSimpleTitle,
  withListDesign(flowHoc(
    asSubList(),
    withSimpleTitle,
    withItemMargin,
  )),
)('ul');

export default BasicCompoundList;
