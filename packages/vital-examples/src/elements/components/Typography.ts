import { as } from '@bodiless/fclasses';
import {
  asElementToken,
  vitalColor,
  vitalTextDecoration,
} from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/src/base';

const H1 = asElementToken({
  Core: {
    _: as(vitalTextDecoration.Normal, 'text-5xl'),
  },
  Theme: {
    _: vitalColor.TextPrimaryBrand,
  },
});

const H2 = asElementToken({
  Core: {
    _: as(vitalTextDecoration.ExtraBold, 'text-3xl'),
  },
  Theme: {
    _: vitalColor.TextPrimaryBodyCopy,
  },
});

export default {
  ...vitalTypographyBase,
  H1,
  H2,
};
