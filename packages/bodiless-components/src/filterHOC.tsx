import {
  withoutProps, ifToggledOn, ifToggledOff, TagType,
} from '@bodiless/core';
import { replaceWith } from '@bodiless/fclasses';
import { difference, flowRight, differenceWith } from 'lodash';
import { toJS } from 'mobx';
import useTagsAccessors from './TagButton/TagModel';
import { ComponentType } from 'react';

type ToggleByTagsProps = {
  selectedTags: TagType[];
};

/**
 * Determine which component to show based on selected tags.
 * @param selectedTags
 *  The selected tags to use.
 */
const useToggleByTags = <P extends object>({
  selectedTags,
}: P & ToggleByTagsProps) => {
  const { getTags } = useTagsAccessors();
  const tags = getTags();
  console.log('selected tags', selectedTags);
  console.log('item tags', toJS(tags));
  console.log('differnece', difference(selectedTags, tags));
  // const tags = itemTags.map(t => t.name);
  return differenceWith(selectedTags, tags, (selectedTag, itemTag) => selectedTag.name === itemTag.name).length === 0;
};

const ifTagsSelected = ifToggledOn(useToggleByTags);
const ifTagsNotSelected = ifToggledOff(useToggleByTags);

const withFilterByTags = <P extends object>(C: ComponentType<P>) => flowRight(
  ifTagsNotSelected(replaceWith(() => null)),
  withoutProps(['selectedTags']),
)(C) as ComponentType<P & ToggleByTagsProps>;

export { ifTagsSelected, withFilterByTags, ifTagsNotSelected };
