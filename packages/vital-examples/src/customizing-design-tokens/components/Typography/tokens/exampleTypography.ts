import { as } from '@bodiless/fclasses';
import {
  asElementToken,
  vitalTextDecoration,
  vitalFontSize,
} from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/src/base';

const H1 = asElementToken({
  ...vitalTypographyBase.H1,
  Core: {
    _: as(vitalTextDecoration.Normal, vitalFontSize.XXXL),
  },
});

const H2 = asElementToken({
  ...vitalTypographyBase.H2,
  Core: {
    _: as(vitalTextDecoration.ExtraBold, vitalFontSize.XXL),
  },
});

export default {
  ...vitalTypographyBase,
  H1,
  H2,
};
