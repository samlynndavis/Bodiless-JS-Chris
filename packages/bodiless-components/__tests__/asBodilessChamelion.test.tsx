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

import React, { FC } from 'react';
import {
  mount, ComponentType, ReactWrapper, shallow,
} from 'enzyme';
import {
  DefaultContentNode, NodeProvider, useNode, withNodeKey, withNode,
  PageEditContext, PageContextProvider,
} from '@bodiless/core';
import { flowRight, flow, identity } from 'lodash';
import { withDesign, withoutProps } from '@bodiless/fclasses';

import {
  asBodilessChamelion, withChamelionComponentFormControls,
  withChamelionContext, useChamelionContext,
} from '../src/Chamelion';
import { DEFAULT_KEY } from '../src/Chamelion/withChamelionContext';

const mockSetNode = jest.fn();
// @ts-ignore Unused
let mockGetNode = jest.fn();

const MockNodeProvider = ({ data, children }: any) => {
  const { node } = useNode() as { node: DefaultContentNode<any> };
  const getters = node.getGetters();
  const actions = node.getActions();
  const { getNode: getNode$ } = getters;
  const getNode = jest.fn(
    (path: string[]) => data[path.join('$')] || getNode$(path),
  );
  mockGetNode = getNode;
  const newNode = new DefaultContentNode(
    { ...actions, setNode: mockSetNode },
    { ...getters, getNode },
    node.path,
  );
  return (
    <NodeProvider node={newNode}>
      {children}
    </NodeProvider>
  );
};

const TestComponent = flowRight(withNodeKey('component'), withNode)(
  ({ dataKey, ...rest }: any) => {
    const { node } = useNode();
    // @ts-ignore No index signature for node.data
    return <span id="test" data-node-value={node.data[dataKey] || 'undefined'} {...rest} />;
  },
);
const withProps = (xprops: any) => (Component: ComponentType<any>|string) => (props: any) => (
  <Component {...props} {...xprops} />
);

const withTitle = (title: string) => (C: ComponentType<any>) => {
  const C1 = (props: any) => <C {...props} />;
  C1.title = title;
  return C1;
};

const design = {
  A: flow(withProps({ 'data-test-a': true }), withTitle('A')),
  _default: withProps({ 'data-test-default': true }),
};

const TestChamelion = flowRight(
  withDesign(design),
  asBodilessChamelion('chamelion'),
  withoutProps('design'),
  withoutProps('wrap', 'unwrap'),
)(TestComponent);

describe('asBodilessChamelion', () => {
  let mockIsEdit: jest.SpyInstance<any, []>;

  beforeAll(() => {
    mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get');
    mockIsEdit.mockReturnValue(true);
  });

  afterAll(() => {
    mockIsEdit.mockRestore();
  });
  beforeEach(() => {
    mockSetNode.mockClear();
    mockGetNode.mockClear();
  });

  describe('Chamelion  Button', () => {
    describe('Toggle Button', () => {
      const callHandler = (wrapper: ReactWrapper<any, any>) => {
        const { getMenuOptions } = wrapper.find(PageContextProvider).props();
        const options = getMenuOptions!();
        expect(options).toHaveLength(1);
        // @ts-ignore no need to simulate the event argument
        return options[0].handler();
      };

      it('Provides a toggle on button when toggled off', () => {
        const wrapper = mount((
          <MockNodeProvider data={{}}>
            <TestChamelion />
          </MockNodeProvider>
        ));
        callHandler(wrapper);
        expect(mockSetNode).toBeCalledWith(['root', 'chamelion'], { component: 'A' });
      });

      it('Provides a toggle off button when toggled on', () => {
        const wrapper = mount((
          <MockNodeProvider data={{ root$chamelion: { component: 'A' } }}>
            <TestChamelion />
          </MockNodeProvider>
        ));
        callHandler(wrapper);
        expect(mockSetNode).toBeCalledWith(['root', 'chamelion'], { component: null });
      });
    });

    describe('Swap Button', () => {
      const getForm = (wrapper: ReactWrapper<any, any>) => {
        const { getMenuOptions } = wrapper.find(PageContextProvider).props();
        const options = getMenuOptions!();
        expect(options).toHaveLength(1);
        // @ts-ignore no need to simulate the event argument
        const render = options[0].handler();
        const Form = () => <>{render()}</>;
        return Form;
      };

      const TestChamelionExt = withDesign({
        B: flow(withProps({ 'data-test-b': true }), withTitle('B')),
      })(TestChamelion);

      it('Provides the correct initial values', () => {
        const wrapper = mount((
          <MockNodeProvider data={{ root$chamelion: { component: 'A' } }}>
            <TestChamelionExt />
          </MockNodeProvider>
        ));
        const Form = getForm(wrapper);
        const form = shallow(<Form />);
        const { initialValues } = form.childAt(0).props();
        expect(initialValues).toEqual({ component: 'A' });
      });

      it('Provides the correct submit handlers', () => {
        const wrapper = mount((
          <MockNodeProvider data={{}}>
            <TestChamelionExt />
          </MockNodeProvider>
        ));
        const Form = getForm(wrapper);
        const form = shallow(<Form />);
        const { initialValues, submitValues } = form.childAt(0).props();
        expect(initialValues.component).toBeFalsy();
        const values = { component: 'A' };
        submitValues(values);
        expect(mockSetNode).toBeCalledWith(['root', 'chamelion'], values);
      });

      it('Provides the correct form components', () => {
        const wrapper = mount((
          <MockNodeProvider data={{}}>
            <TestChamelionExt />
          </MockNodeProvider>
        ));
        const Form = getForm(wrapper);
        const form = mount(<Form />);
        expect(form.find('input[value="A"]').prop('checked')).toBeFalsy();
        expect(form.find('input[value="B"]').prop('checked')).toBeFalsy();
        expect(form.find('label[htmlFor="bl-component-form-chamelion-radio-A"]').text()).toBe('A');
        expect(form.find('label[htmlFor="bl-component-form-chamelion-radio-B"]').text()).toBe('B');
      });

      it('Shows the default option when it has a title', () => {
        const TestChamelionExt2 = withDesign({
          _default: withTitle('Default'),
        })(TestChamelion);
        const wrapper = mount((
          <MockNodeProvider data={{}}>
            <TestChamelionExt2 />
          </MockNodeProvider>
        ));
        const Form = getForm(wrapper);
        const form = mount(<Form />);
        expect(form.find('input[value="A"]').prop('checked')).toBeFalsy();
        expect(form.find('input[value="_default"]')).toHaveLength(1);
        // @TODO: Fix this case.
        // expect(form.find('input[value="_default"]').prop('checked')).toBeTruthy();
      });
    });
  });

  it('Applies a design correctly depending on toggle state', () => {
    const data = { root$chamelion: { component: 'A' } };
    const Test: FC<any> = ({ data: data$ }) => (
      <MockNodeProvider data={data$}>
        <TestChamelion />
      </MockNodeProvider>
    );
    let wrapper = mount(<Test data={data} />);
    expect(mockGetNode.mock.calls[0][0]).toEqual(['root', 'chamelion']);
    expect(wrapper.find('span#test').prop('data-test-a')).toBe(true);
    wrapper = mount(<Test data={{}} />);
    expect(wrapper.find('span#test').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('span#test').prop('data-test-default')).toBe(true);
  });

  it('Preserves the node path of the wrapped component', () => {
    const data = {
      root$chamelion: { component: 'A' },
      root$component: { foo: 'bar' },
    };
    const Test: FC<any> = () => (
      <MockNodeProvider data={data}>
        <TestChamelion nodeKey="cokponent" dataKey="foo" />
      </MockNodeProvider>
    );
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test').prop('data-node-value')).toBe('bar');
  });

  describe('wrap and unwrap', () => {
    const PropsCatcher: FC = () => <></>;

    const ChamelionPropsCatcher = flowRight(
      withDesign(design),
      asBodilessChamelion('chamelion'),
    )(PropsCatcher);

    it('Passes the correct unwrap prop when not in default state', () => {
      const wrapper = mount((
        <MockNodeProvider data={{ root$chamelion: { component: 'A' } }}>
          <ChamelionPropsCatcher />
        </MockNodeProvider>
      ));
      const unwrap = wrapper.find(PropsCatcher).prop('unwrap') as Function;
      unwrap();
      expect(mockSetNode).toBeCalledWith(['root', 'chamelion'], { component: null });
    });

    it('Does not pass an unwrap prop when in default state', () => {
      const wrapper = mount((
        <MockNodeProvider data={{}}>
          <ChamelionPropsCatcher />
        </MockNodeProvider>
      ));
      expect(wrapper.find(PropsCatcher).prop('unwrap')).toBeUndefined();
    });
  });

  describe('withChamelionComponentFormControls', () => {
    const PropsCatcher: FC<any> = () => <></>;
    const PropsCatcherTest = flowRight(
      withDesign({
        On: withTitle('On'),
      }),
      withChamelionContext('chamelion'),
      withChamelionComponentFormControls,
    )(PropsCatcher);
    it('Adds correct onSubmit when toggled off', () => {
      const wrapper = mount((
        <MockNodeProvider data={{}}>
          <PropsCatcherTest />
        </MockNodeProvider>
      ));
      const { unwrap, onSubmit } = wrapper.find(PropsCatcher).props();
      expect(unwrap).toBeUndefined();
      onSubmit();
      expect(mockSetNode).toBeCalledWith(['root', 'chamelion'], { component: 'On' });
    });
    it('Adds correct unwrap when toggled on', () => {
      const wrapper = mount((
        <MockNodeProvider data={{ root$chamelion: { component: 'On' } }}>
          <PropsCatcherTest />
        </MockNodeProvider>
      ));
      const { unwrap, onSubmit } = wrapper.find(PropsCatcher).props();
      expect(onSubmit).toBeUndefined();
      unwrap();
      expect(mockSetNode).toBeCalledWith(['root', 'chamelion'], { component: null });
    });
    it('Preserves the node path of the wrapped component', () => {
      const data = {
        root$chamelion: { component: 'A' },
        root$component: { foo: 'bar' },
      };
      const Test = flowRight(
        withChamelionContext('chamelion'),
        withChamelionComponentFormControls,
      )(TestComponent) as any;
      const wrapper = mount((
        <MockNodeProvider data={data}>
          <Test nodeKey="component" dataKey="foo" />
        </MockNodeProvider>
      ));
      expect(wrapper.find('span#test').prop('data-node-value')).toBe('bar');
    });
  });

  describe('withChamelionContext', () => {
    it('Preserves the node path of the wrapped component', () => {
      const data = {
        root$chamelion: { component: 'A' },
        root$component: { foo: 'bar' },
      };
      const Test: FC<any> = () => (
        <MockNodeProvider data={data}>
          <TestChamelion nodeKey="cokponent" dataKey="foo" />
        </MockNodeProvider>
      );
      const wrapper = mount(<Test />);
      expect(wrapper.find('span#test').prop('data-node-value')).toBe('bar');
    });

    const withTestDesign = withDesign({
      Foo: withTitle('FooTitle'),
      Baz: identity,
      [DEFAULT_KEY]: withTitle('DefaultTitle'),
    });

    it('Applies a design correctly', () => {
      const PropCatcher:any = () => null;
      const Test$ = () => {
        const { selectableComponents } = useChamelionContext();
        const map = Object.keys(selectableComponents).reduce((acc, key) => (
          // @ts-ignore
          { ...acc, [key]: selectableComponents[key].title }
        ), {});
        return <PropCatcher map={map} />;
      };
      const Test = flowRight(
        withTestDesign,
        withChamelionContext('chamelion'),
      )(Test$);
      const wrapper = mount(<Test />);
      expect(wrapper.find(PropCatcher).prop('map'))
        .toEqual({ Foo: 'FooTitle', _default: 'DefaultTitle' });
    });
  });
});
