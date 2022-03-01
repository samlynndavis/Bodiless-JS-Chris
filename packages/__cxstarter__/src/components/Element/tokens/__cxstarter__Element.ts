import { asElementToken, cxElement } from '@bodiless/cx-elements';

// The default export is a token collection.
export default {
  // We incorporate any CanvasX tokens which are not specifially overridden.
  ...cxElement,
  // We can override a default Cx token here...
  H2: asElementToken(cxElement.H2, {
    Theme: {
      _: 'starter-custom'
    },
  }),
  // ...or we can add a new, brand specific token.
  H2Special: asElementToken(cxElement.H2, {
    Theme: {
      _: 'starter-special',
    },
  }),
};
