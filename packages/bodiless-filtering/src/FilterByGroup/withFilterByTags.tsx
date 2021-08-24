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

import React from 'react';
import { flowRight, differenceWith, isEmpty } from 'lodash';
import { ifToggledOn, ifToggledOff, useNode } from '@bodiless/core';
import {
  replaceWith, withoutProps, Enhancer, Token,
} from '@bodiless/fclasses';

import type { TagType } from './types';
import { useFilterByGroupContext, useRegisterItem } from './FilterByGroupContext';
import { TAG_ANY_KEY } from './FilterByGroupStore';
import { useTagsAccessors } from '../TagButton';

type ToggleByTagsProps = {
  selectedTags: TagType[];
};

/**
 * Determine which component to show based on selected tags.
 * @param selectedTags
 *  The selected tags to use.
 */
const useToggleByTags = ({ selectedTags }: ToggleByTagsProps) => {
  const { multipleAllowedTags } = useFilterByGroupContext();
  const { getTags } = useTagsAccessors();
  const tags = getTags();

  // Show all items if there is no selected tag.
  if (isEmpty(selectedTags)) {
    return true;
  }

  if (multipleAllowedTags) {
    const selectedCategories = tags.reduce((prev, curr) => {
      const selectedTag = selectedTags.find(tag => tag.id === curr.id);
      const categoryId = selectedTag ? selectedTag.categoryId : undefined;
      return {
        ...prev,
        ...(
          categoryId ? {
            [categoryId]: true,
          } : {}
        ),
      };
    }, {}) as { [category: string]: boolean };

    return selectedTags
      .find(selectedTag => !selectedCategories[selectedTag.categoryId]) === undefined;
  }

  return (
    differenceWith(
      selectedTags,
      tags,
      (selectedTag, itemTag) => (selectedTag.id === TAG_ANY_KEY || selectedTag.id === itemTag.id),
    ).length === 0
  );
};

const ifTagsSelected = ifToggledOn(useToggleByTags);
const ifTagsNotSelected = ifToggledOff(useToggleByTags);

const asRegisteredItem: Token = Component => props => {
  const { node } = useNode();
  const [productUuid] = node.path.slice(-2);
  useRegisterItem([{ id: productUuid }]);
  return <Component {...props} />;
};

const withFilterByTags: Enhancer<ToggleByTagsProps> = flowRight(
  ifTagsSelected(asRegisteredItem),
  ifTagsNotSelected(replaceWith(() => null)),
  withoutProps(['selectedTags']),
);

export { ifTagsSelected, ifTagsNotSelected };
export default withFilterByTags;
