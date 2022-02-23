import { as } from '@bodiless/fclasses';
import { asTokenGroup } from '../../util';
import { cxElementColor } from './color.token';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Typography'],
  },
};

export const cxElementTypography = asTokenGroup(meta)({
  Underline: 'underline',
  Bold: 'font-bold',
  Superscript: 'align-super',
  Link: as(
    'text-m-base lg:text-base font-bold underline',
    cxElementColor.WithInteractiveColorText,
    cxElementColor.WithInteractiveHoverColorText,
    cxElementColor.WithInteractiveActiveColorText,
  ),
  H1: as(
    'text-m-3xl lg:text-3xl font-bold',
    cxElementColor.WithHeaderColor,
  ),
  H2: as(
    'text-m-2xl lg:text-2xl font-bold',
    cxElementColor.WithHeaderColor,
  ),
  H3: as(
    'text-m-xl lg:text-xl font-medium',
    cxElementColor.WithHeaderColor,
  ),
  H4: as(
    'text-m-lg lg:text-lg font-normal',
    cxElementColor.WithHeaderColor,
  ),
  H5: as(
    'text-m-base lg:text-base font-medium',
    cxElementColor.WithHeaderColor,
  ),
  Body: as(
    'text-m-base lg:text-base font-normal',
    cxElementColor.WithBodyText,
  ),
  Eyebrow: as(
    'text-m-xs lg:text-xs uppercase font-extrabold',
    cxElementColor.WithEyebrowColor,
  ),
  Rest: as(
    'text-m-xs lg:text-xs font-normal',
    cxElementColor.WithBodyText,
  ),
  DMSans: 'font-DMSans',
});
