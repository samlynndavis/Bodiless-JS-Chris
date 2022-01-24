/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ComponentType, FC, Fragment } from 'react';
import {
  DesignableComponentsProps, Span, designable, Div, addClasses, removeClasses,
  withDesign, Token, asToken, flowIf, withoutProps,
  asTokenSpec, as, extendMeta, extend
} from '../src';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, shallow, render } from 'enzyme';
import { pick } from 'lodash';

const defaultDomains = {
  Core: {},
  Analytics: {},
  SEO: {},
  Components: {},
  Layout: {},
  Spacing: {},
  Theme: {},
  Editors: {},
  Content: {},
  Behavior: {},
  Schema: {},
};

type TestComponents = {
  A: ComponentType<any>,
  B: ComponentType<any>,
  ABBA: ComponentType<any>,
};

const TestComponents: TestComponents = {
  A: Span,
  B: Span,
  ABBA: Span,
};

const TestBase: FC<DesignableComponentsProps<TestComponents>> = ({ components: C, ...rest }) => (
  <Div id="test-wrapper" {...rest}>
    <C.A id="test-a" />
    <C.B id="test-b" />
  </Div>
);

const TestClean = designable(TestComponents)(TestBase);

const asTestTokenSpec = asTokenSpec<TestComponents, typeof defaultDomains>(defaultDomains);

describe('extendMeta', () => {
  it('Merges categories properly',  () => {
    const foobar = asToken.meta.term('Foo')('Bar');
    const foobaz = asToken.meta.term('Foo')('Baz');
    const bingbang = asToken.meta.term('Bing')('Bang');
    const test = extendMeta(foobar, foobaz, bingbang);
    expect(test).toEqual({
      categories: {
        Foo: ['Bar', 'Baz'],
        Bing: ['Bang'],
      },
    });
  });
  it('Does not allow non-tokenmeta arguments', () => {
    // @ts-expect-error
    extendMeta({ Foo: 'Bar'});
    // @ts-expect-error
    extendMeta({ Categories: { Foo: 'Bar' }});
  });
  it('Overrides non-category keys', () => {
    const test = extendMeta({ title: 'Foo' }, { title: 'Bar' });
    expect(test).toEqual({ title: 'Bar' });
  });
});

describe('asTokenSpec', () => {
  it('Does not allow invalid domains', () => {
    asTestTokenSpec({
      // @ts-expect-error
      Foo: 'bar',
    });
  });
  it('does not accept a design in the Meta key', () => {
    asTestTokenSpec({
      Meta: {
        // @ts-expect-error
        A: 'foo',
      },
    });
  });
  it('does not accept invalid design keys', () => {
    asTestTokenSpec({
      Core: {
        _: 'foo',
        A: 'bar',
        B: 'baz',
        // @ts-expect-error
        C: 'bing',
      },
    });
  });
});

describe('extend', () => {
  const Left = asTestTokenSpec({
    Layout: {
      B: 'b',
    },
    Theme: {
      B: 'b2',
    },
  });
  const Right = asTestTokenSpec({
    Layout: {
      B: 'b1',
      A: 'a',
    },
    Spacing: {
      A: 'a2',
    },
  });
  const Test = extend(Left, Right);
  const Expected = asTestTokenSpec({
    Layout: {
      B: as('b', 'b1'),
      A: 'a',
    },
    Theme: {
      B: 'b2',
    },
    Spacing: {
      A: 'a2',
    },
  });
  // Testing returned type.
  Test.Layout;
  Test.Theme;
  Test.Spacing;
  // @ts-expect-error
  Test.Bing;
  Test?.Layout?.A;
  Test?.Layout?.B;
  // @ts-expect-error
  Test.Layout.Blip;
  it('propagates outer keys in expected order', () => {
    expect(Object.keys(Test)).toEqual(Object.keys(Expected));
  });
  it('Combines non intersecteing keys in the correct order', () => {
    expect(Object.keys(Test.Layout||{})).toEqual(Object.keys(Expected.Layout||{}));
    expect(Test.Layout!.A).toEqual(Expected.Layout!.A);
    expect(Test.Spacing).toEqual(Expected.Spacing);
    expect(Test.Theme).toEqual(Expected.Theme);
  });
  it('Combines matching keys into a single token', () => {
    const SpanExpected = as(Expected.Layout!.B)(Span);
    const SpanTest = as(Test?.Layout?.B)(Span);
    const expected = shallow(<SpanExpected />);
    const test = shallow(<SpanTest />);
    expect(test.html()).toEqual(expected.html());
  });
  it('Combines conditions properly', () => {
    const Foo = asTestTokenSpec({
      Core: {
        _: withoutProps('foo'),
      },
      Flow: flowIf(({ foo }: any) => Boolean(foo)),
      Compose: {
        Foo: asTestTokenSpec({ Core: { A: 'foo' } }),
      },
    });
    const T1 = as(Foo)(TestClean);
    const w1 = mount(<T1 foo />);
    expect(w1.find('span#test-a').prop('className')).toEqual('foo');

    const Bar = asTestTokenSpec({
      Flow: flowIf(({ bar }: any) => Boolean(bar)),
    });
    const FooBar = extend(Foo, Bar);
    const T = as(FooBar)(TestClean);
  
    let wrapper = mount(<T foo />);
    // console.log(wrapper.debug());
    // console.log(wrapper.find('div#test-a').debug());
    expect(wrapper.find('span#test-a').prop('className')).toBeUndefined();
  });
  it('Comgines metadata properly', () => {
    const A = asTestTokenSpec({ Meta: asToken.meta.term('Foo')('Bar') });
    const B = asTestTokenSpec({ Meta: asToken.meta.term('Foo')('Baz') });
    const C = asTestTokenSpec({ Meta: { title: 'Title' }});
    const Test = extend(A, B, C);
    expect(Test).toEqual({
      Meta: {
        title: 'Title',
        categories: {
          Foo: ['Bar', 'Baz'],
        },
      },
    });
  });
});

describe('as', () => {
  it('Applies a condition properly', () => {
    const Test = asTestTokenSpec({
      Flow: flowIf(({ doIt }: any) => Boolean(doIt)),
      Core: {
        _: withoutProps('doIt'),
      },
      Theme: {
        _: 'foo',
      },
    });
    const TestC = as(Test)(TestClean);
    // @ts-ignore
    const test = mount(<TestC doIt={true} />);
    expect(test.find('div#test-wrapper').prop('className')).toBe('foo');
    const test1 = mount(<TestC />);
    expect(test1.find('div#test-wrapper').prop('className')).toBeUndefined();
    console.log(test1.debug());
  });
  // eslint-disable-next-line jest/expect-expect
  it('Type checks domains', () => {
    as({
      // @ts-expect-error
      Bizzle: {
        Baz: 'bing',
      },
    });
  });

  // it('Propagates metadata from _ key of mulitple domains', () => {
  //   const spec = asTestTokenSpec({
  //     Meta: asToken.meta.term('Foo')('Bar'),
  //     Meta2: {
  //       _: asToken.meta.term('Foo')('Baz'),
  //       A: asToken.meta.term('Foo')('Bing'),
  //     },
  //   });
  //   const asSpec = as(spec);
  //   expect(asSpec.meta?.categories?.Foo).toEqual(['Bar', 'Baz']);
  //   const Test = asSpec(TestClean);
  //   // Metadata associated with tokens applied to individual design keys
  //   // are not attache to the final component.
  //   expect(Test.categories?.Foo).toEqual(['Bar', 'Baz']);
  // });

  it('Removes classes applied by an external design', () => {
    const withClass = withDesign({
      A: addClasses('bar'),
    }) as Token;
    const spec = asTestTokenSpec({
      Core: {
        _: withClass,
      },
      Theme: {
        A: as(removeClasses('bar'), addClasses('baz')),
      },
    });
    const Test = as(spec)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test-a').prop('className')).toBe('baz');
  });

  it('Aggregates clases from multiple domains in the correct order', () => {
    const spec = asTestTokenSpec({
      Theme: {
        _: 'foo',
        A: 'bar',
      },
      Layout: {
        _: 'foo2',
        A: 'bar2',
      },
    });
    const Test = as(spec)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('div#test-wrapper').prop('className')).toBe('foo foo2');
    expect(wrapper.find('span#test-a').prop('className')).toBe('bar bar2');
  });

  it('Applies classes to the whole component and to individual elements', () => {
    const spec = asTestTokenSpec({
      Core: {
        _: 'foo',
        A: 'bar',
      },
    });
    const Test = as(spec)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('div#test-wrapper').prop('className')).toBe('foo');
    expect(wrapper.find('span#test-a').prop('className')).toBe('bar');
    expect(wrapper.find('span#test-b').prop('className')).toBeUndefined();
  });
});

// describe('createUtilities', () => {
//   it('Requires a Core domain', () => {
//     const domains = {
//       Foo: {},
//       Bar: {},
//     };
//     // @ts-expect-error
//     createUtilities(domains);
//   });
// 
//   it('Enforces custom domains', () => {
//     const domains = {
//       Core: {},
//       Foo: {},
//     };
//     const { as, on, asTokenSpec } = createUtilities(domains);
//     // @ts-expect-error
//     asTokenSpec<any>()({ Theme: {} });
//     asTokenSpec<any>()({ Core: {} });
//     asTokenSpec<any>()({ Foo: {} });
//     // @ts-expect-error
//     as({ Theme: {} });
//     as({ Core: {} });
//     as({ Foo: {} });
//     // @ts-expect-error
//     on(Fragment)({ Theme: {} });
//     on(Fragment)({ Core: {} });
//     on(Fragment)({ Foo: {} });
//   });
// });
