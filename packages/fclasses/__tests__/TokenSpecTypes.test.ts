/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  $TokenSpec,
  as,
  ComponentOrTag, DesignableComponents, FinalDesign, flowHoc, ReservedDomains,
} from '../src';

// This version procies autocomplete, but does not
// tupe check properties on creted token
// const factory$$ = <
//   C extends DesignableComponents,
//   D extends Domains<C>,
// >() => (
//     s: Partial<D & ReservedDomains<C, D>>,
//   ): typeof s & { [$TokenSpec]: true } => s as any;

// This version provides autocomplete, but allows invalid
// domains when a valid domain is present.
// const factory$$$ = <
//   C extends DesignableComponents,
//   D extends Domains<C>,
// >() => <S extends Partial<D & ReservedDomains<C, D>>>(
//     // s: Pick<TokenSpecBase<C, D>, K>
//     // s: { [k in K]: Design<C> }
//     s: S,
//   ): S & { [$TokenSpec]: true } => s as any;

// This version allows invalid domains when a valid domain
// is also present (incorrect);
// const factory$ = <
//   C extends DesignableComponents,
//   D extends object,
// >() => <K extends keyof D>(
//     // s: { [k in K]: Design<C> }
//     s: Partial<{ [k in K]: FinalDesign<C> }> & ReservedDomains<C, D>
//     // s: Partial<Record<K, Design<C>> & ReservedDomains<C, D>>
//   ): typeof s & { [$TokenSpec]: true } => s as any;
type BareDomains<
  C extends DesignableComponents,
  D extends object
> = Record<keyof D, FinalDesign<C>>;

type Domains<
  C extends DesignableComponents,
  D extends object
> = BareDomains<C, D> & ReservedDomains<C, D>;

type TokenSpecBase<
  C extends DesignableComponents,
  D extends object,
  K extends keyof (Domains<C, D>) = keyof (Domains<C, D>)
> = Pick<Domains<C, D>, K>;

type TokenSpec<
  C extends DesignableComponents,
  D extends object,
  K extends keyof (Domains<C, D>) = keyof (Domains<C, D>)
> = TokenSpecBase<C, D, K> & {
  [$TokenSpec]: true,
};

type AsTokenSpec<C extends DesignableComponents, D extends object> = <
  K0 extends keyof Domains<C, D>,
  K1 extends keyof Domains<C, D> = never,
  K2 extends keyof Domains<C, D> = never,
  K3 extends keyof Domains<C, D> = never,
  K4 extends keyof Domains<C, D> = never,
  K5 extends keyof Domains<C, D> = never,
  K6 extends keyof Domains<C, D> = never,
  K7 extends keyof Domains<C, D> = never,
  K8 extends keyof Domains<C, D> = never,
  K9 extends keyof Domains<C, D> = never
>(
  s0: TokenSpecBase<C, D, K0>,
  s1?: TokenSpecBase<C, D, K1>,
  s2?: TokenSpecBase<C, D, K2>,
  s3?: TokenSpecBase<C, D, K3>,
  s4?: TokenSpecBase<C, D, K4>,
  s5?: TokenSpecBase<C, D, K5>,
  s6?: TokenSpecBase<C, D, K6>,
  s7?: TokenSpecBase<C, D, K7>,
  s8?: TokenSpecBase<C, D, K8>,
  s9?: TokenSpecBase<C, D, K9>,
) => TokenSpec<C, D, K0 | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9>;

const asTokenSpec = <
  C extends DesignableComponents,
  D extends object,
>(domains?: D): AsTokenSpec<C, D> => (...args) => args[0] as any;

// ***********************************************************************
// *************** TESTS

type TestD = {
  Theme?: any,
  Layout?: any,
};

const testDomains: TestD = {
  Theme: {},
  Layout: {},
};

/**
 * This is how a specific design system would override asTokenSpec
 * to use its predefined set of domains.
 */
const asTestTokenSpec = <
  C extends DesignableComponents
>() => asTokenSpec<C, TestD>(testDomains);

describe('Fixed type tokens', () => {
  type TestC = {
    Wrapper: ComponentOrTag<any>,
    Text: ComponentOrTag<any>,
  };
  const asTestToken = asTestTokenSpec<TestC>();
  const t = asTestToken({
    Theme: {},
    Meta: {},
  });

  // Creates a token which can be passed to as
  as<TestD>(t);

  // Creates a token with known properties
  t.Meta;
  t.Theme;
  // @ts-expect-error Globally undefined domain
  t.Foo;
  // @ts-expect-error Domain which does not exist on this specific token.
  t.Layout;

  // Allows all valid domains
  asTestToken({
    Theme: {},
    Layout: {},
    Meta: {},
    Compose: {},
    Flow: flowHoc,
  });

  // Allows a subset of valid domains
  asTestToken({
    Theme: {},
  });

  // Does not allow invalid domains
  asTestToken({
  // @ts-expect-error
    Foo: {},
  });

  // Does not allow invalid design keys
  asTestToken({
    Layout: {
    // @ts-expect-error
      Foo: 'foo',
    },
  });

  // Allows all meta properties
  asTestToken({
    Meta: { title: 'foo', categories: { bar: ['baz'] }, description: 'd' },
  });

  // Does not allow invalid meta
  asTestToken({
  // @ts-expect-error
    Meta: { foo: 'bar' }
  });

  // Does not allow invalid Flow
  asTestToken({
  // @ts-expect-error
    Flow: 'foo',
  });

  // Enforces that token specs in compose must have $TokenSpec identifier.
  asTestToken({
    Compose: {
    // @ts-expect-error
      Composed: {
        Theme: {
          _: 'foo',
        },
      }
    },
  });

  // Enforces that tokens in Compose must have correct design keys.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        Theme: {
          _: 'wrapper',
          // @ts-expect-error
          Foo: 'foo',
        },
      },
    },
  });

  // Enforces that tokens in Compose must have correct domains.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        // @ts-expect-error Invalid domain
        Foo: {
          _: 'foo',
        },
      },
    },
  });

  // Enforces that compose is an object
  asTestToken({
  // @ts-expect-error
    Compose: 'foo',
  });

  // Accepts a string token in compos4
  asTestToken({
    Compose: {
      Composed: 'foo',
    },
  });

  // Does not allow invalid domains even when one valid domain present
  asTestToken({
    Layout: {},
    // @ts-expect-error
    Foo: {},
  });

  // Does not allow invalid design keys even when one valid key is present
  asTestToken({
    Layout: {
      _: 'foo',
      // @ts-expect-error
      Foo: 'foo',
    },
  });

  const Base = asTestToken({
    Theme: {
      _: 'Foo',
    },
    Layout: {
      _: 'foo',
      Wrapper: 'foo',
      Text: 'bar',
    },
  });

  // Allows extension of a domain
  const Extended = asTestToken({
    ...Base,
    Layout: {
      ...Base.Layout,
      Wrapper: 'baz',
    },
  });
});

describe('fluid tokens', () => {
  const asTestToken = asTestTokenSpec<any>();
  const t = asTestToken({
    Theme: {},
    Meta: {},
  });

  // Creates a token which can be passed to as
  as<TestD>(t);

  // Creates a token with known properties
  t.Meta;
  t.Theme;
  // @ts-expect-error Globally undefined domain
  t.Foo;
  // @ts-expect-error Domain which does not exist on this specific token.
  t.Layout;

  // Allows all valid domains
  asTestToken({
    Theme: {},
    Layout: {},
    Meta: {},
    Compose: {},
    Flow: flowHoc,
  });

  // Allows a subset of valid domains
  asTestToken({
    Theme: {},
  });

  // Does not allow invalid domains
  asTestToken({
  // @ts-expect-error
    Foo: {},
  });

  // ALlows any design keys.
  asTestToken({
    Layout: {
      Foo: 'foo',
      Bar: 'bar',
    },
  });

  // Allows all meta properties
  asTestToken({
    Meta: { title: 'foo', categories: { bar: ['baz'] }, description: 'd' },
  });

  // Does not allow invalid meta
  asTestToken({
  // @ts-expect-error
    Meta: { foo: 'bar' }
  });

  // Does not allow invalid Flow
  asTestToken({
  // @ts-expect-error
    Flow: 'foo',
  });

  // Enforces that token specs in compose must have $TokenSpec identifier.
  asTestToken({
    Compose: {
    // @ts-expect-error
      Composed: {
        Theme: {
          _: 'foo',
        },
      }
    },
  });

  // Allows tokens in Compose to have any design keys.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        Theme: {
          _: 'wrapper',
          Foo: 'foo',
          Bar: 'Bar',
        },
      },
    },
  });

  // Enforces that tokens in Compose must have correct domains.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        // @ts-expect-error Invalid domain
        Foo: {
          _: 'foo',
        },
      },
    },
  });

  // Enforces that compose is an object
  asTestToken({
  // @ts-expect-error
    Compose: 'foo',
  });

  // Accepts a string token in compos4
  asTestToken({
    Compose: {
      Composed: 'foo',
    },
  });

  // Does not allow invalid domains even when one valid domain present
  asTestToken({
    Layout: {},
    // @ts-expect-error
    Foo: {},
  });

  // Allows any design keys even when _ is present.
  asTestToken({
    Layout: {
      _: 'foo',
      Foo: 'foo',
      Bar: 'bar',
    },
  });

  const Base = asTestToken({
    Layout: {
      Foo: 'foo',
      Bar: 'bar',
    },
  });

  // Allows extension of a domain
  const Extended = asTestToken({
    Layout: {
      ...Base.Layout,
      Baz: 'foo1',
    },
  });
});
