import React from 'react';
import type { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme';
import { DesignRegistryContext, DesignRegistryValue, withDesignFromRegistry } from '../src/DesignRegistry';
import { HOC } from '../src/types';
import { flowHoc, withDesign } from '../src';

const TestBase: FC<any> = props => <div id="test" {...props} />;

const addDataTest = (val: string): HOC => Component => (props: any) => {
  const { 'data-test': dataTest = '', ...rest } = props;
  const dataTest$ = `${dataTest}${val}`;
  return <Component {...rest} data-test={dataTest$} />;
}

const testRegistry: DesignRegistryValue = {
  Foo: {
    Bar: addDataTest('Bar'),
  },
};
const withTestRegistry: HOC = Component => props => (
  <DesignRegistryContext.Provider value={testRegistry}>
    <Component {...props} />
  </DesignRegistryContext.Provider>
);

const getDataTest = (wrapper: ReactWrapper, designKey: string) => {
  const design = wrapper.find(TestBase).prop('design');
  const token = design[designKey];
  const C = () => null;
  const Test = token(C);
  const wrapper$ = mount(<Test />);
  return wrapper$.find(C).prop('data-test');
}

describe('withDesignFromRegistry', () => {
  it('Applies a registered design when it exists', () => {
    const Test = flowHoc(
      withDesignFromRegistry('Foo'),
      withTestRegistry,
    )(TestBase);
    const wrapper = mount(<Test />);
    expect(getDataTest(wrapper, 'Bar')).toBe('Bar');
  });

  it('Does not alter an existing design when no registered design exists', () => {
    const Test = flowHoc(
      withDesign({
        Bar: addDataTest('Floop'),
      }),
      withDesignFromRegistry('DoesNotExist'),
      withTestRegistry,
    )(TestBase);
    const wrapper = mount(<Test />);
    expect(getDataTest(wrapper, 'Bar')).toBe('Floop');
  });
});
