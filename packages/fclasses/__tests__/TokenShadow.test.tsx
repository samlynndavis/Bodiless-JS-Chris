// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import React, { FC, Fragment } from 'react';
import {
  as, flowHoc, HOC,
  Span, ComponentOrTag, Div, designable, DesignableComponentsProps,
} from '../src';
import {
  asTestTokenSpec, asShadowedTokenCollection, withRegisterShadowTokens,
} from '../src/TokenShadow';

// ++++++++++++++++++++++++++ Base Token Collection

const Foo = asTestTokenSpec({
  Core: {
    _: 'foo',
  },
});

const Bar = asTestTokenSpec({
  Core: {
    _: 'bar',
  },
});

const Baz = asTestTokenSpec({
  Core: {
    _: 'baz',
  },
});

const cxElement = asShadowedTokenCollection({
  Foo,
  Bar,
  Baz,
}, 'Element');

const FooBar = asTestTokenSpec({
  Core: {
    _: as(cxElement.Foo, cxElement.Bar),
  },
});

const FooBaz = asTestTokenSpec({
  Core: {
    _: as(cxElement.Foo, cxElement.Baz),
  },
});

const cxComposedElement = asShadowedTokenCollection({
  FooBar,
  FooBaz,
}, 'ComposedElement');

// +++++++++++++++++++++++++ Brand Token Collections

const brandElement = {
  ...cxElement,
  Bar: asTestTokenSpec({
    Core: {
      // Standard way of extending the cx token with another class.
      // Need to be careful that this odesn't produce an infinite loop.
      _: as(cxElement.Bar, 'brand-bar'),
    }
  }),
  Baz: asTestTokenSpec({
    Core: {
      _: 'brand-baz',
    }
  })
};

const brandComposedElement = {
  ...cxComposedElement,
  FooBaz: asTestTokenSpec({
    Core: {
      _: 'brand-foo-baz',
    },
  }),
};

const BrandTokenProvider = flowHoc(
  withRegisterShadowTokens(brandElement, 'Element'),
  withRegisterShadowTokens(brandComposedElement, 'ComposedColection'),
)(Fragment);

describe('shadowed collection', () => {
  it('Applies the shadowed token', () => {
    const Test = as(cxElement.Bar)(Span);
    const cxline = mount(<Test />);
    expect(cxline.find('span').prop('class')).toBe('bar');
    const test = mount(<BrandTokenProvider><Test /></BrandTokenProvider>);
    expect(cxline.find('span').prop('class')).toBe('bar brand-bar');
  });
});
