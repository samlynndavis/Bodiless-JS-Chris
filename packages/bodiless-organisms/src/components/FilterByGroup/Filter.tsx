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

/* eslint-disable arrow-body-style, max-len, @typescript-eslint/no-unused-vars */
import React, { FC, HTMLProps } from 'react';
import { observer } from 'mobx-react-lite';
import { flow, isEmpty } from 'lodash';
import {
  withNodeKey,
  withNode,
  withNodeDataHandlers,
  ifReadOnly,
  withoutProps,
  ifEditable,
  withContextActivator,
  withLocalContextMenu,
} from '@bodiless/core';
import {
  designable,
  Div,
  H3,
  Ul,
  Input,
  Label,
  withDesign,
  replaceWith,
} from '@bodiless/fclasses';
import {
  List,
  asEditable,
  asEditableList,
  withBasicSublist,
  ListTitleProps,
} from '@bodiless/components';
import { withNewTagButton } from './withNewTagButton';
import { FilterComponents, FilterProps, TagLabelProps } from './types';
import { useFilterByGroupContext } from './FilterByGroupContext';
import { useItemsAccessors } from './FilterTagsModel';

const filterComponentsStart:FilterComponents = {
  FilterCategory: asEditable('category_name', 'Category Name')(H3),
  FilterGroupWrapper: Ul,
  FilterGroupItemInput: Input,
  FilterGroupItemLabel: Label,
  FilterGroupItemPlaceholder: Label,
  FilterInputWrapper: Div,
};

const FilterBase: FC<FilterProps> = ({ components }) => {
  const {
    FilterCategory,
    FilterGroupItemInput,
    FilterGroupItemLabel,
    FilterGroupItemPlaceholder,
    FilterGroupWrapper,
    FilterInputWrapper,
  } = components;

  const TagListTitleBase = (props: HTMLProps<HTMLInputElement> & ListTitleProps) => {
    const context = useFilterByGroupContext();
    const { tag, nodeId } = useItemsAccessors();
    const { allTags, selectedTag, selectedNode } = context;

    if (!isEmpty(tag.id) && !allTags.some(_tag => _tag.id === tag.id)) {
      context.addTag(tag);
    }

    const isTagSelected = Boolean(selectedTag && selectedTag.id === tag.id);
    const isNodeSelected = Boolean(selectedNode === nodeId);

    const LabelComponent = (
      { labelText, ...rest }: TagLabelProps,
    ) => (isEmpty(labelText)
      ? (<FilterGroupItemPlaceholder {...rest}>Select tag...</FilterGroupItemPlaceholder>)
      : (<FilterGroupItemLabel {...rest}>{ labelText }</FilterGroupItemLabel>));

    return (
      <FilterInputWrapper {...props} key={tag.id}>
        <FilterGroupItemInput
          type="radio"
          name="filter-item"
          value={tag.id}
          id={nodeId}
          onChange={() => context.setSelectedTag(tag, nodeId)}
          checked={isNodeSelected && isTagSelected}
        />
        <LabelComponent htmlFor={nodeId} labelText={tag.name} />
      </FilterInputWrapper>
    );
  };

  const CategoryList = flow(
    asEditableList,
    withDesign({
      Title: replaceWith(FilterCategory),
    }),
  )(List);

  const TagTitle = flow(
    observer,
    withoutProps(['componentData']),
    ifEditable(
      withNewTagButton,
      withContextActivator('onClick'),
      withLocalContextMenu,
    ),
    ifReadOnly(withoutProps(['setComponentData'])),
    withNodeDataHandlers({ id: '', name: '' }),
    withNode,
    withNodeKey('tag'),
  )(TagListTitleBase);

  const TagList = flow(
    asEditableList,
    withDesign({
      Title: replaceWith(TagTitle),
      Wrapper: replaceWith(FilterGroupWrapper),
    }),
  )(List);

  const FilterList = withBasicSublist(TagList)(CategoryList);

  return (
    <FilterList nodeKey="filter" />
  );
};

const FilterClean = flow(
  designable(filterComponentsStart),
)(FilterBase);

export default FilterClean;
