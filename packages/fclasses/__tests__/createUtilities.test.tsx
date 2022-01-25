// import { ComponentType } from 'react';
// import { asTokenSpec, as } from '../src/tokenSpec';
// import { DesignableComponents, TokenSpec } from '../lib';
// import { TokenX } from '../src/types';
// 
// type TestDomains = {
//   Core: any,
//   Foo: any,
//   Bar: any,
// };
// 
// const testDomains: TestDomains = {
//   Core: {},
//   Foo: {},
//   Bar: {},
// };
// 
// type Components = {
//   A: ComponentType<any>,
//   B: ComponentType<any>,
// };
// 
// const asTestTokenSpecBase = <C extends DesignableComponents>() => asTokenSpec<C, TestDomains>(testDomains);
// const asTestTokenSpec = asTestTokenSpecBase<Components>();
// 
// asTestTokenSpec({
//   // @ts-expect-error
//   Baz: {
//     _: 'b',
//   },
// });
// 
// asTestTokenSpec({
//   Bar: {
//     _: 'a',
//     // @ts-expect-error
//     C: 'b',
//   },
// });
// 
// const t = asTestTokenSpec({
//   Foo: {
//     _: 'a',
//   },
// });
// 
// const asBase = (...tokens: TokenX<any, TestDomains>[]) => as(...tokens);
// 
// asBase({
//   Bar: {
//     _: 'a',
//   }
// });
// 
// as(t);
import { pick } from 'lodash';
describe('Foo', () => {
  it('works', () => {
    const foo ={
      Foo: 'foo',
      Bar: 'bar',
      Baz: 'baz',
    };
    const t = pick(foo, 'Bar', 'Foo', 'Bing');
    console.log(t);
  });
});