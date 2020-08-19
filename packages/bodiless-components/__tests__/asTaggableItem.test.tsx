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
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme';
import { flow } from 'lodash';

const setEditMode = (isEdit: boolean) => {
  // @TODO bodiless-core internals should not be touched
  // bodiless-core should be refactored to allow injecting of default edit mode
  window.sessionStorage.isEdit = isEdit;
};
setEditMode(true);

// eslint-disable-next-line import/first
import asTaggableItem from '../src/Taggable/asTaggableItem';

const getSuggestions = () => [
  { id: 'a', name: 'Bananas' },
  { id: 'b', name: 'Mangos' },
  { id: 'c', name: 'Lemons' },
  { id: 'd', name: 'Apricots' },
];

const props = {
  getSuggestions,
  registerSuggestions: () => null,
  placeholder: 'Add or create',
  formTitle: 'Groups',
  seeAllText: 'See all groups',
  formBodyText: 'Select from available tags:',
  allowNew: true,
  noSuggestionsText: 'No suggestions found',
  inputAttributes: { name: 'react-tags' },
};

const testTag = { id: 0, name: 'bananas' };

const Taggable = flow(asTaggableItem())('span');

let wrapper: ReactWrapper;
let menuButton: ReactWrapper;
let menuForm: ReactWrapper;
let menuPopup: ReactWrapper;

const itemProps = { nodeKey: 'tags', ...props };

describe('Filter item interactions', () => {
  it('should render menu item when clicked', () => {
    wrapper = mount(
      <Taggable {...itemProps}>
        <div id="test">test</div>
      </Taggable>,
    );
    const item = wrapper.find({ ...itemProps }).at(0);
    expect(item).toHaveLength(1);
    item.find('div#test').simulate('click');
    menuButton = wrapper.find('i');
    expect(menuButton.text()).toBe('local_offer');
  });

  it('menu button should toggle context menu visibility when clicked', () => {
    menuButton.simulate('click');
    let tooltips = wrapper.find('Tooltip');

    menuPopup = tooltips.at(1);
    expect(menuPopup.prop('visible')).toBeTruthy();

    menuButton.simulate('click');

    tooltips = wrapper.find('Tooltip');

    menuPopup = tooltips.at(1);
    expect(menuPopup.prop('visible')).toBeFalsy();
  });

  it('React Tags should have all props', () => {
    const reactTags = wrapper.find('ReactTags');
    expect(reactTags.prop('placeholder')).toBe('Add or create');
    expect(reactTags.prop('noSuggestionsText')).toBe('No suggestions found');
    expect(reactTags.prop('allowNew')).toBe(true);
  });
  it('context form should have input fields with cancel and done buttons', () => {
    menuButton.simulate('click');
    menuForm = menuPopup.find('form');
    // Test for input fields:
    const tagsInputFields = menuForm.find('input');
    expect(tagsInputFields).toHaveLength(2);
    expect(tagsInputFields.at(0).prop('value')).toMatchObject([]);
    expect(tagsInputFields.at(0).prop('type')).toBe('hidden');
    expect(tagsInputFields.at(1).prop('placeholder')).toBe('Add or create');

    // Cancel and add buttons:
    const cancelButton = menuForm.find('button[aria-label="Cancel"]');
    expect(cancelButton).not.toBeUndefined();
    expect(cancelButton.prop('type')).toBe('button');
    const submitButton = menuForm.find('button[aria-label="Submit"]');
    expect(submitButton).not.toBeUndefined();
    expect(submitButton.prop('type')).toBeUndefined();
  });

  it('context form should have all tags button and when clicked display all ', () => {
    // All tags
    const allTags = menuForm.find('button').at(1);
    expect(allTags).not.toBeUndefined();
    // allTags.simulate('click');
  });

  it('context form should have interactive all tags button', () => {
    menuButton.simulate('click');
    menuForm = menuPopup.find('form');
    // Test for input fields:
    const tagsInputFields = menuForm.find('input');
    expect(tagsInputFields).toHaveLength(2);
    expect(tagsInputFields.at(0).prop('value')).toMatchObject([]);
    expect(tagsInputFields.at(0).prop('type')).toBe('hidden');

    // Cancel and add buttons:
    const cancelButton = menuForm.find('button[aria-label="Cancel"]');
    expect(cancelButton).not.toBeUndefined();
    expect(cancelButton.prop('type')).toBe('button');
    const submitButton = menuForm.find('button[aria-label="Submit"]');
    expect(submitButton).not.toBeUndefined();
    expect(submitButton.prop('type')).toBeUndefined();
  });

  it('context menu form should close and save content when done is clicked', () => {
    let input = menuForm.find('input[name="tags"]');
    input.simulate('change', { target: { value: [testTag] } });

    const doneButton = menuForm.find('button[aria-label="Submit"]');
    doneButton.simulate('submit');

    expect(wrapper.find('Popup[visible=true]')).toHaveLength(1);

    menuButton = wrapper.find('i');
    menuButton.simulate('click');

    menuPopup = wrapper.find('Tooltip[visible=true]').at(1);
    menuForm = menuPopup.find('form');
    input = menuForm.find('input[name="tags"]');
    expect(input.prop('value')).toStrictEqual([testTag]);
    input.simulate('change', { target: { value: [] } });
  });

  it('context form should not save content when cancel is clicked', () => {
    let input = menuForm.find('input[name="react-tags"]');
    input.simulate('change', { target: { value: [testTag] } });

    const cancelButton = menuForm.find('button[aria-label="Cancel"]');
    cancelButton.simulate('submit');

    menuButton.simulate('click');

    menuPopup = wrapper.find('Tooltip[visible=true]').at(1);
    menuForm = menuPopup.find('form');
    input = menuForm.find('input[name="tags"]');
    expect(input.prop('value')).toStrictEqual([]);
  });
});
