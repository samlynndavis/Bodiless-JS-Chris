// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import React, { FC, Fragment } from 'react';
import {
  as, flowHoc, HOC,
  Span, Div, designable, DesignableComponentsProps, DesignableComponents, on, asTokenSpec,
} from '../src';
import {
  asShadowedTokenCollection, withRegisterShadowTokens, DefaultDomains,
  asShadowedTokenSpec, withRegisterShadowToken,
} from '../src/TokenShadow';

// Test designable component

type TestDesignableProps = DesignableComponentsProps & {
  component: string,
};

const TestDesignableBase: FC<TestDesignableProps> = (
  { components, component, ...rest }
) => {
  const Component = components[component] || Fragment;
  return <Component {...components} />;
};
const TestDesignable = designable<DesignableComponents>({}, 'TestDesignable')(TestDesignableBase);
export const asTestDesignableToken = asTokenSpec<any, DefaultDomains>();

// ++++++++++++++++++++++++++ Base Token Collection
export const asTestElementToken = asTokenSpec<{}, DefaultDomains>();

const Foo = asTestElementToken({
  Core: {
    _: 'foo',
  },
});

const Bar = asTestElementToken({
  Core: {
    _: 'bar',
  },
});

const Baz = asTestElementToken({
  Core: {
    _: 'baz',
  },
});

const cxElement = asShadowedTokenCollection('Element', {
  Foo,
  Bar,
  Baz,
});

const FooBar = asTestElementToken({
  Core: {
    _: as(cxElement.Foo, cxElement.Bar),
  },
});

const FooBaz = asTestElementToken({
  Core: {
    _: as(cxElement.Foo, cxElement.Baz),
  },
});

const cxComposedElement = asShadowedTokenCollection('ComposedElement', {
  FooBar,
  FooBaz,
});

const cxTestDesignable = asShadowedTokenCollection('TestDesignable', {
  Default: asTestDesignableToken({
    Components: {
      Foo: on(Span)(cxElement.Foo),
      Bar: on(Span)(cxElement.Bar),
      Baz: on(Span)(cxElement.Baz),
    },
  }),
});

// +++++++++++++++++++++++++ Brand Token Collections

const brandElement = {
  Bar: asTestElementToken({
    Core: {
      // Standard way of extending the cx token with another class.
      // Need to be careful that this odesn't produce an infinite loop.
      _: as(cxElement.Bar, 'brand-bar'),
    }
  }),
  Baz: asTestElementToken({
    Core: {
      _: 'brand-baz',
    }
  })
};

const brandComposedElement = {
  ...cxComposedElement,
  FooBaz: asTestElementToken({
    Core: {
      _: 'brand-foo-baz',
    },
  }),
};

const BrandTokenProvider = flowHoc(
  withRegisterShadowTokens('Element', brandElement),
  withRegisterShadowTokens('ComposedCollection', brandComposedElement),
)(Fragment);

// +++++++++++++++++++++++++ Site Token Collections

const siteElement = {
  Bar: asTestElementToken({
    Core: {
      // Standard way of extending the cx token with another class.
      // Need to be careful that this odesn't produce an infinite loop.
      _: as(cxElement.Bar, 'site-bar'),
    },
  }),
};

describe('basic dynamic shadowing', () => {
  it('Applies the base token when no shadows are registered', () => {
    const Test = as(cxElement.Bar)(Span);
    const test = mount(<Test />);
    expect(test.find('span').prop('class')).toBe('bar');
  });

  it('Applies the base token when it is not shadowed', () => {
    const Test = as(cxElement.Foo)(Span);
    const test = mount(<BrandTokenProvider><Test /></BrandTokenProvider>);
    expect(test.find('span').prop('class')).toBe('foo');
  });

  it('Applies a shadowed token when registered', () => {
    const Test = as(cxElement.Bar)(Span);
    const test = mount(<BrandTokenProvider><Test /></BrandTokenProvider>);
    expect(test.find('span').prop('class')).toBe('bar brand-bar');
  });
});

describe('single token shadowing', () => {
  const Base = asShadowedTokenSpec('Base', asTestElementToken({
    Core: {
      _: 'base',
    },
  }));

  test('registered token is used', () => {
    const Brand = asTestElementToken({
      Core: {
        _: as('brand'),
      },
    });
    const Test = flowHoc(
      as(Base),
      withRegisterShadowToken('Base', Brand),
    )(Span);
    const test = mount(<Test />);
    expect(test.find('span').prop('className')).toBe('brand');
  });

  test('registered token is used which extends the base token', () => {
    const BrandExtend = asTestElementToken({
      ...Base,
      Core: {
        _: as(Base.Core._, 'brand'),
      },
    });
    const Test = flowHoc(
      as(Base),
      withRegisterShadowToken('Base', BrandExtend),
    )(Span);
    const test = mount(<Test />);
    expect(test.find('span').prop('className')).toBe('base brand');
  });

  test('registered token is used which composes base token', () => {
    const BrandExtend = asTestElementToken({
      Core: {
        _: 'brand',
      },
      Compose: {
        // Need to avoid infinite loop!
        Base,
      },
    });
    const Test = flowHoc(
      as(Base),
      withRegisterShadowToken('Base', BrandExtend),
    )(Span);
    const test = mount(<Test />);
    expect(test.find('span').prop('className')).toBe('brand base');
  });
});
