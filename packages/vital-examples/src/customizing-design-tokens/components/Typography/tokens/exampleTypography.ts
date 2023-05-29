import { as } from '@bodiless/fclasses';
import {
  asElementToken,
  vitalTextDecoration,
  vitalFontSize,
  asTokenGroup,
  TypographyMeta,
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

// Here we use `asTokenGroup` to share the TypographyMeta among all tokens exported.
export default asTokenGroup(TypographyMeta)({
  ...vitalTypographyBase,
  H1,
  H2,
});
