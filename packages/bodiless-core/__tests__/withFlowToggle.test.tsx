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

import { mount } from 'enzyme';
import React, { ComponentType } from 'react';
import { ifToggledOff, ifToggledOn, withFlowToggle } from '../src/withFlowToggle';

describe('withFlowToggle', () => {
  it('renders the correct component based on the toggle function', () => {
    const A = () => <div id="A" />;
    const B = () => <div id="B" />;
    const createToggleFunc = (isOn: boolean) => () => isOn;
    const RenderA = withFlowToggle(createToggleFunc(true))(A, B);
    const RenderB = withFlowToggle(createToggleFunc(false))(A, B);
    const wrapperA = mount(<RenderA />);
    expect(wrapperA.find('#A')).toHaveLength(1);
    expect(wrapperA.find('#B')).toHaveLength(0);
    const wrapperB = mount(<RenderB />);
    expect(wrapperB.find('#A')).toHaveLength(0);
    expect(wrapperB.find('#B')).toHaveLength(1);
  });
});

const hocA = (PassedComponent: ComponentType) => (props: JSX.IntrinsicAttributes) => (
  <PassedComponent {...props} data-id="A" />
);
const hocB = (PassedComponent: ComponentType) => (props: JSX.IntrinsicAttributes) => (
  <PassedComponent {...props} data-id="B" />
);
const C = () => <span />;

describe('ifToggledOn', () => {
  it('renders the correct component', () => {
    let Render = ifToggledOn(() => true)(hocA, hocB)(C);
    let wrapper = mount(<Render />);
    expect(wrapper.find('C[data-id="B"]')).toHaveLength(1);
    Render = ifToggledOn(() => false)(hocA, hocB)(C);
    wrapper = mount(<Render />);
    expect(wrapper.find('[data-id="B"]')).toHaveLength(0);
    expect(wrapper.find('[data-id="A"]')).toHaveLength(0);
    expect(wrapper.find('C')).toHaveLength(1);
  });
});

describe('ifToggledOff', () => {
  it('renders the correct component', () => {
    let Render = ifToggledOff(() => true)(hocA, hocB)(C);
    let wrapper = mount(<Render />);
    expect(wrapper.find(C)).toHaveLength(1);
    expect(wrapper.find('C[data-id="A"]')).toHaveLength(0);
    expect(wrapper.find('C[data-id="B"]')).toHaveLength(0);
    Render = ifToggledOff(() => false)(hocA, hocB)(C);
    wrapper = mount(<Render />);
    expect(wrapper.find('[data-id="A"]')).toHaveLength(1);
    expect(wrapper.find('C[data-id="B"]')).toHaveLength(1);
  });
});
