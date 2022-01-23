import type { Design} from './types';
import { createUtilities } from './createUtilities';


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

const {
  as, asTokenSpec, extend, extendDesign, asElementToken, asSimpleToken, on,
  designToTokens, tokensToDesign, withDesign, 
} = createUtilities(defaultDomains);

export {
  as, asTokenSpec, extend, extendDesign, asElementToken, asSimpleToken, on,
  designToTokens, tokensToDesign, withDesign, 
};
  
/**
   * Helper function to insert elements into a design at a
   * particular key.  Useful when you want to manage the order
   * in which components appear in the component selector or
   * editor toolbar.
   *
   * @param key The design key at which to insert the new elements
   * @param values The design elements to insert
   */
export const insertDesignAt = (
  key: string, values: Design<any>,
) => (obj: Design<any>) => Object.keys(obj).reduce(
  (acc, k) => ({
    ...acc,
    [k]: obj[k],
    ...(k === key ? values : {}),
  }),
  {} as Design<any>,
);
  