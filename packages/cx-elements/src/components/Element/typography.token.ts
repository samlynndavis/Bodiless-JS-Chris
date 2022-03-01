import { as } from '@bodiless/fclasses';
import { asElementToken } from '../../util';
import { cxElementColor } from './color.token';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Typography'],
  },
};

const Underline = asElementToken({
  Theme: {
    _: 'underline',
  },
  Meta: meta,
});

const Bold = asElementToken({
  Theme: {
    _: 'font-bold',
  }
});

const Superscript = asElementToken({
  Theme: {
    _: 'align-super',
  },
  Meta: meta,
});

const Link = asElementToken({
  Core: {
    _: 'text-m-base lg:text-base',
  },
  Theme: {
    _: as(
      'font-bold underline',
      cxElementColor.WithTextPrimaryInteractiveColor,
      cxElementColor.WithPrimaryInteractiveHoverOpacity,
      cxElementColor.WithTextPrimaryInteractiveActiveColor,
    ),
  },
  Meta: meta,
});

const H1 = asElementToken({
  Core: {
    _: 'text-m-3xl lg:text-3xl',
  },
  Theme: {
    _: as(
      'font-bold',
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
    _: 'text-m-2xl lg:text-2xl',
  },
  Theme: {
    _: as(
      'font-bold',
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
    _: 'text-m-xl lg:text-xl',
  },
  Theme: {
    _: as(
      'font-medium',
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
    _: 'text-m-lg lg:text-lg',
  },
  Theme: {
    _: as(
      'font-normal',
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5.75 lg:mb-9',
  },
});

const H5 = asElementToken({
  Core: {
    _: 'text-m-base lg:text-base',
  },
  Theme: {
    _: as(
      'font-medium',
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-4.5',
  },
  Meta: meta,
});

const asBody = asElementToken({
  Core: {
    _: 'text-m-base lg:text-base',
  },
  Theme: {
    _: as(
      'font-normal',
      cxElementColor.WithTextPrimaryHeaderCopyColor,
    ),
  },
  Spacing: {
    _: 'mb-6',
  },
  Meta: meta,
});

const asEyebrow = asElementToken({
  Core: {
    _: 'text-m-xs lg:text-xs',
  },
  Theme: {
    _: as(
      'uppercase font-extrabold',
      cxElementColor.WithTextSecondaryEyebrow,
    ),
  },
  Spacing: {
    _: 'mb-3',
  },
});

const asRest = asElementToken({
  Core: {
    _: 'text-m-xs lg:text-xs',
  },
  Theme: {
    _: as(
      'font-normal',
      cxElementColor.WithTextPrimaryBodyCopyColor,
    ),
  },
  Meta: meta,
});

const DMSans = asElementToken({
  Theme: {
    _: 'font-DMSans',
  },
  Meta: meta,
});

export {
  Underline,
  Bold,
  Superscript,
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  asBody,
  asEyebrow,
  asRest,
  DMSans,
};
