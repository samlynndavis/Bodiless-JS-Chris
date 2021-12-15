import React from 'react';
import { SelectorComponents, withDirection } from '../../src';
import { HOC, Div, Fragment } from '@bodiless/fclasses';
import { mount } from 'enzyme';

const addTitle = (t: string): HOC => Component => props => <Component {...props} title={t} />;
const addId = (id: string): HOC => Component => props => <Component {...props} id={id} />;

describe('SelectorComponents', () => {
  const design = {
    Foo: addId('foo'),
    Bar: addId('bar'),
    Baz:addId('baz'),
  };

  it('Returns all components as selectable', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo']
    });
    expect(Object.keys(test.selectableComponents)).toEqual(Object.keys(design));
  });

  it('Returns only selected components', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo']
    });
    expect(Object.keys(test.components)).toEqual(['Foo']);
  });

  it('Limits components when start components is specified', () => {
    const test = new SelectorComponents({
      design,
      startComponents: {
        Bar: Fragment,
        Baz: Fragment,
      },
      selectedComponents: ['Foo'],
    });
    expect(Object.keys(test.components)).toEqual([]);
  });

  it('Limits selectableComponents when start components is specified', () => {
    const test = new SelectorComponents({
      design,
      startComponents: {
        Bar: Fragment,
        Baz: Fragment,
      },
      selectedComponents: ['Foo'],
    });
    expect(Object.keys(test.selectableComponents)).toEqual(['Bar', 'Baz']);
  });

  it('Uses the default component when no startComponents are specified', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo'],
      DefaultComponent: addTitle('base')('div'),
    });
    const S = test.selectableComponents;
    let wrapper = mount(<><S.Foo /><S.Bar /><S.Baz /></>);
    console.log(wrapper.debug());
    ['foo', 'bar', 'baz'].forEach(
      id => expect(wrapper.find(`div#${id}`).prop('title')).toEqual('base'),
    );
    const C = test.components;
    wrapper = mount(<C.Foo />);
    expect(wrapper.find('div#foo').prop('title')).toEqual('base');
  });

  it('Uses startComponents when specified', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo'],
      DefaultComponent: addTitle('base')('div'),
      startComponents: {
        Foo: addTitle('foo-base')('div'),
        Bar: addTitle('bar-base')('div'),
      },
    });
    const C = test.components;
    let wrapper = mount(<C.Foo />); 
    expect(wrapper.find('div#foo').prop('title')).toEqual('foo-base');
    const S = test.selectableComponents;
    wrapper = mount(<><S.Foo /><S.Bar /></>);
    expect(wrapper.find('div#foo').prop('title')).toEqual('foo-base');
    expect(wrapper.find('div#bar').prop('title')).toEqual('bar-base');
  });
});
