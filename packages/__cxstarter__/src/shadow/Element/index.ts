/**
 * @file
 * This is a demonstration of how to use Bodiless/CanvasX token
 * shadowing to override a token from the CanvasX Design System.
 *
 * The shadowing module should be exported at {package}/lib/shadow/{ComponentName}
 */

import { asElementToken } from '@bodiless/cx-elements';

// Import the base token module directly.
// @todo This should perhaps be exposed via "exports" in package.json
// but this is not yet officially supported in a typescript stable release.
// See https://github.com/microsoft/TypeScript/issues/33079
// Note this is a default export.
import cxElementBase from '@bodiless/cx-elements/lib/components/Element/tokens/cxElement';


export const cxElement = {
  ...cxElementBase,
  // Here we extend the base H1 token to add a class.
  // A more realistic example would be to alter the existing
  // token more substantailly.
  H1: asElementToken(cxElementBase.H1, {
    Core: {
      _: 'shadowed',
    },
  }),
};

// @todo How to handle static tokens?
// We can't simply re-export cElementStatic (if it exists)
// because it imports direclty from `cxElement` which is not shadowed.
// Maybe need to re-think directory structure.  Something like
//
// /Element/tokens/index.ts
// ```
// import cxElement from './cxElement'
// export default cxElement;
// ```
//
// /Element/cxElementStatic.cx-static.ts
// ```
// import { cxElement } from './tokens';
// export default cxElementStatic;
// ```
//
// /Element/index.ts
// ```
// import cxElement from './tokens';
// import cxElementStatic from './cxElementStatic.cx-static';
// export { cxElement, cxElementStatic };
// ```
