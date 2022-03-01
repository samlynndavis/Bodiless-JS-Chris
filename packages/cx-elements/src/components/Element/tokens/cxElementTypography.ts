import { as } from '@bodiless/fclasses';
import { asElementToken } from '../../../util';
import { cxElementColor } from './cxElementColor';
import { cxElementFontSize } from './cxElementFontSize';
import { cxElementFontDecoration } from './cxElementFontDecoration';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Typography'],
  },
};

const Link = asElementToken({
  Core: {
    _: cxElementFontSize.Base,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithBold,
      cxElementFontDecoration.WithUnderline,
      cxElementColor.WithTextPrimaryInteractiveColor,
      cxElementColor.WithPrimaryInteractiveHoverOpacity,
      cxElementColor.WithTextPrimaryInteractiveActiveColor,
    ),
  },
  Meta: meta,
});

const H1 = asElementToken({
  Core: {
    _: cxElementFontSize.ThreeXl,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithBold,
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-6',
  },
  Meta: meta,
});

const H2 = asElementToken({
  Core: {
    _: cxElementFontSize.TwoXl,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithBold,
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta: meta,
});

const H3 = asElementToken({
  Core: {
    _: cxElementFontSize.Xl,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithMedium,
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta: meta,
});

const H4 = asElementToken({
  Core: {
    _: cxElementFontSize.Lg,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithNormal,
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5.75 lg:mb-9',
  },
});

const H5 = asElementToken({
  Core: {
    _: cxElementFontSize.Base,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithMedium,
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-4.5',
  },
  Meta: meta,
});

const Body = asElementToken({
  Core: {
    _: cxElementFontSize.Base,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithNormal,
      cxElementColor.WithTextPrimaryBodyCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-6',
  },
  Meta: meta,
});

const Eyebrow = asElementToken({
  Core: {
    _: cxElementFontSize.Xs,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithUppercase,
      cxElementFontDecoration.WithExtraBold,
      cxElementColor.WithTextSecondaryEyebrow,
    ),
  },
  Spacing: {
    _: 'mb-3',
  },
});

// This probably will need a better name as Design team defines the uses of this token.
// They have called it crumbs & reviews now.
const Rest = asElementToken({
  Core: {
    _: cxElementFontSize.Xs,
  },
  Theme: {
    _: as(
      cxElementFontDecoration.WithNormal,
      cxElementColor.WithTextPrimaryBodyCopyColor,
    ),
  },
  Meta: meta,
});

export {
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Eyebrow,
  Rest,
};
