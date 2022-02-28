import { as } from '@bodiless/fclasses';
import { asTokenGroup, asElementToken } from '../../util';
import { cxElementColor } from './color.token';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Typography'],
  },
};

const Link = asElementToken({
  Theme: {
    _: as(
      'text-m-base lg:text-base font-bold underline',
      cxElementColor.WithInteractiveColorText,
      cxElementColor.WithInteractiveHoverColorText,
      cxElementColor.WithInteractiveActiveColorText,
    ),
  },
});

const H1 = asElementToken({
  Theme: {
    _: as(
      'text-m-3xl lg:text-3xl font-bold',
      cxElementColor.WithHeaderColor,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-6',
  },
});

const H2 = asElementToken({
  Theme: {
    _: as(
      'text-m-2xl lg:text-2xl font-bold',
      cxElementColor.WithHeaderColor,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
});

const H3 = asElementToken({
  Theme: {
    _: as(
      'text-m-xl lg:text-xl font-medium',
      cxElementColor.WithHeaderColor,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
});

const H4 = asElementToken({
  Theme: {
    _: as(
      'text-m-lg lg:text-lg font-normal',
      cxElementColor.WithHeaderColor,
    ),
  },
  Spacing: {
    _: 'mb-5.75 lg:mb-9',
  },
});

const H5 = asElementToken({
  Theme: {
    _: as(
      'text-m-base lg:text-base font-medium',
      cxElementColor.WithHeaderColor,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-4.5',
  },
});

const asBody = asElementToken({
  Theme: {
    _: as(
      'text-m-base lg:text-base font-normal',
      cxElementColor.WithBodyText,
    ),
  },
  Spacing: {
    _: 'mb-6',
  },
});

const asEyebrow = asElementToken({
  Theme: {
    _: as(
      'text-m-xs lg:text-xs uppercase font-extrabold',
      cxElementColor.WithEyebrowColor,
    ),
  },
  Spacing: {
    _: 'mb-3',
  },
});

const asRest = asElementToken({
  Theme: {
    _: as(
      'text-m-xs lg:text-xs font-normal',
      cxElementColor.WithBodyText,
    ),
  },
});

export const cxElementTypography = asTokenGroup(meta)({
  Underline: asElementToken({
    Theme: {
      _: 'underline',
    }
  }),
  Bold: asElementToken({
    Theme: {
      _: 'font-bold',
    }
  }),
  Superscript: asElementToken({
    Theme: {
      _: 'align-super',
    }
  }),
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body: asBody,
  Eyebrow: asEyebrow,
  Rest: asRest,
  DMSans: asElementToken({
    Theme: {
      _: 'font-DMSans',
    }
  }),
});
