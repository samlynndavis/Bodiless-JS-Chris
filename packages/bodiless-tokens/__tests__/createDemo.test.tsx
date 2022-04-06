import { asTokenSpec, A, Token } from '@bodiless/fclasses';

describe('createDemo', () => {
  it('Creates a demo with correct tokens', () => {

    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: 'https://www.somthing.com/test.html?query=true'
      });
    Object.defineProperty(window, {
      location: 'http://foo.com?tokens=Foo'
    });
  });
});

const testDomains = {
  Core: {},
};

const asTestTokenSpec = asTokenSpec<{}, typeof testDomains>(testDomains);
const asTestSimpleToken = (t: Token) => asTestTokenSpec({
  Core: {
    _: t,
  }
});

const testTokenCollection = {
  Foo: asTestSimpleToken('foo'),
  Bar: asTestSimpleToken('bar'),
  Baz: asTestSimpleToken('baz'),
};
