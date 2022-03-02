import React, { useState } from 'react';
import type { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import type { HOC, Token } from '../src';
import {
  flowHoc, withDesign,
} from '../src';
import {
  withTokenFromRegistry, withRegisterTokens,
} from '../src/TokenRegistry';

const TestBase: FC<any> = props => <div id="test" {...props} />;

const addDataTest = (val: string): HOC => Component => (props: any) => {
  const { 'data-test': dataTest = '', ...rest } = props;
  const dataTest$ = `${dataTest}${val}`;
  return <Component {...rest} data-test={dataTest$} />;
};

const testRegistry: Record<string, Token<any, any>> = {
  Foo: addDataTest('Foo'),
};

describe('withTokenFromRegistry', () => {
  it('Applies a registered design when it exists', () => {
    const Test = flowHoc(
      withTokenFromRegistry('Foo'),
      withRegisterTokens(testRegistry),
    )(TestBase);
    const wrapper = mount(<Test />);
    expect(wrapper.find(TestBase).prop('data-test')).toBe('Foo');
  });
  it('Replaces a registered token', () => {
    const Test = flowHoc(
      withTokenFromRegistry('Foo'),
      withRegisterTokens({
        Foo: addDataTest('Bar'),
      }),
      withRegisterTokens(testRegistry),
    )(TestBase);
    const wrapper = mount(<Test />);
    expect(wrapper.find(TestBase).prop('data-test')).toBe('Bar');
  });
  it('Does not alter a component when registered token does not exist', () => {
    const Test = flowHoc(
      withTokenFromRegistry('Bar'),
      withRegisterTokens(testRegistry),
    )(TestBase);
    const wrapper = mount(<Test />);
    expect(wrapper.find(TestBase).prop('data-test')).toBeUndefined();
  });
  it('Does not alter state of a wrapped component', () => {
    const TestWithState = (props: any) => {
      const [state, setState] = useState('initial');
      return (
        <button
          id="test"
          type="button"
          onClick={() => setState('changed')}
          {...props}
        >
          {state}
        </button>
      );
    };
    const Test = flowHoc(
      withTokenFromRegistry('Foo'),
      withRegisterTokens(testRegistry),
    )(TestWithState);
    const wrapper = mount(<Test />);
    expect(wrapper.find('button#test').text()).toBe('initial');
    expect(wrapper.find(TestWithState).prop('data-test')).toBe('Foo');
    wrapper.find('#test').simulate('click');
    expect(wrapper.find('button#test').text()).toBe('changed');
    wrapper.setProps({ 'data-baz': 'baz' });
    expect(wrapper.find('button#test').text()).toBe('changed');
  });
});
