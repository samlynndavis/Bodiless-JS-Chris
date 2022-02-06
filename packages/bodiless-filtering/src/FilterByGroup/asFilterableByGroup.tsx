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

import { withSidecarNodes } from '@bodiless/core';
import { flowHoc } from '@bodiless/fclasses';
import { withTagProps } from './FilterByGroupContext';
import withFilterByTags from './withFilterByTags';
import { asTaggableItem } from '../Taggable/asTaggableItem';

const asFilterableByGroup = (nodeKey: string = '_tags') => flowHoc(
  withSidecarNodes(
    asTaggableItem(nodeKey),
    withFilterByTags,
  ),
  withTagProps({
    placeholder: 'Add or Create',
    formTitle: 'Group Membership',
    formBodyText: 'Select from available groups:',
    seeAllText: 'View All Groups',
    noSuggestionsText: 'No matching groups found.',
  }),
);

export default asFilterableByGroup;
