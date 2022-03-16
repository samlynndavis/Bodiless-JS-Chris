import { asElementToken, cxTypographyBase } from '@bodiless/cx-elements';

export default {
  ...cxTypographyBase,
  H1: asElementToken(cxTypographyBase.H1, {
    Theme: {
      _: 'shadowed',
    },
  }),
};
