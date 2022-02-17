import { as } from '@bodiless/fclasses';
import { asTokenCollection } from '../../util';
import { cxElementColor } from './color.token';

export const cxElementTypography = asTokenCollection({
  Underline: 'underline',
  Bold: 'font-bold',
  Superscript: '',
  Link: 'underline',
  H1: as(
    'text-m-3xl lg:text-3xl font-bold text-black-header',
    //  cxElementColor.WithHeaderColor,
  ),
  H2: as(
    'text-m-2xl lg:text-2xl font-bold text-black-header',
    // cxElementColor.WithHeaderColor,
  ),
  H3: as(
    'text-m-xl lg:text-xl font-medium text-black-header',
    // cxElementColor.WithHeaderColor,
  ),
  H4: as(
    'text-m-lg lg:text-lg font-normal text-black-header',
    // cxElementColor.WithHeaderColor,
  ),
  H5: as(
    'text-m-base lg:text-base font-medium text-black-header',
    // cxElementColor.WithHeaderColor,
  ),
  Body: as(
    'text-m-base lg:text-base font-normal text-gray-body',
    // cxElementColor.WithBodyText,
  ),
  Eyebrow: as(
    'text-m-xs lg:text-xs uppercase font-extrabold text-secondary-eyebrow',
    // cxElementColor.WithEyebrowColor,
  ),
  Rest: as(
    'text-m-xs lg:text-xs font-normal text-gray-body',
    // cxElementColor.WithBodyText,
  ),
  DMSans: 'font-DMSans',
});
