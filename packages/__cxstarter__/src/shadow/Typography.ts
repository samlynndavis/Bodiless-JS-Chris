import { asElementToken } from '@bodiless/cx-elements';
// Must import directy from the token collection.
import cxTypography from '@bodiless/cx-elements/lib/components/Typography/tokens/cxTypography';

export default {
  ...cxTypography,
  H1: asElementToken(cxTypography.H1, {
    Theme: {
      _: 'shadowed',
    },
  }),
};
