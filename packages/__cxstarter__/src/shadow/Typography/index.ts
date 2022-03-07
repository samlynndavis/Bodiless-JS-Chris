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
import cxTypography from '@bodiless/cx-elements/lib/components/Typography/tokens/cxTypography';

export default {
  ...cxTypography,
  // Here we extend the base H1 token to add a class.
  // A more realistic example would be to alter the existing
  // token more substantailly.
  H1: asElementToken(cxTypography.H1, {
    Core: {
      _: 'shadowed',
    },
  }),
};
