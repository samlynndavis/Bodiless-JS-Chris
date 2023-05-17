import { as, asTokenSpec, HOC, TokenCollection } from '@bodiless/fclasses';
import {
  asElementToken,
  vitalColor,
  vitalTextDecoration,
  DefaultDomains,
  asSimpleToken,
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

const elementToken = asElementToken();
type ElementToken = typeof elementToken;

export interface LessonTypographyComponents
  extends TokenCollection<{}, DefaultDomains> {
  H1: ElementToken;
  H2: ElementToken;
  // H4: ElementToken;
  // H5: ElementToken;
  // Body: ElementToken;
  // Eyebrow: ElementToken;
  // EyebrowNoSpacing: ElementToken;
  // Rest: ElementToken;
  // Gradient: ElementToken;
  // Link: ElementToken;
  // HeaderLink: ElementToken;
}

const lessonTypography: LessonTypographyComponents = {
  // ...vitalTypographyBase,
  H1,
  H2,
};

export default lessonTypography;
