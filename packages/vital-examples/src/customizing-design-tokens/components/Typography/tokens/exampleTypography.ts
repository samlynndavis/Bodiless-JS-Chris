import { as, TokenCollection } from '@bodiless/fclasses';
import {
  asElementToken,
  vitalColor,
  vitalTextDecoration,
  DefaultDomains,
  vitalFontSize,
} from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/src/base';

const H1 = asElementToken(vitalTypographyBase.H1, {
  Core: {
    _: as(vitalTextDecoration.Normal, vitalFontSize.XXXXXL),
  },
  Theme: {
    _: vitalColor.TextPrimaryBrand,
  },
});

const H2 = asElementToken(vitalTypographyBase.H2, {
  Core: {
    _: as(vitalTextDecoration.ExtraBold, vitalFontSize.XXXL),
  },
  Theme: {
    _: vitalColor.TextPrimaryBodyCopy,
  },
});

const elementToken = asElementToken();
type ElementToken = typeof elementToken;

export interface LessonTypographyComponents
  extends TokenCollection<{}, DefaultDomains> {
  H1: ElementToken;
  H2: ElementToken;
  H4: ElementToken;
  H5: ElementToken;
  Body: ElementToken;
  Eyebrow: ElementToken;
  EyebrowNoSpacing: ElementToken;
  Rest: ElementToken;
  Gradient: ElementToken;
  Link: ElementToken;
  HeaderLink: ElementToken;
}

const lessonTypography: LessonTypographyComponents = {
  ...vitalTypographyBase,
  H1,
  H2,
};

export default lessonTypography;
