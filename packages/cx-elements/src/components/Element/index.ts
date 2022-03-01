import { cxElementColor } from './tokens/cxElementColor';
import { cxElementFontDecoration } from './tokens/cxElementFontDecoration';
import { cxElementFonts } from './tokens/cxElementFonts';
import { cxElementFontSize } from './tokens/cxElementFontSize';
import { cxElementLayout } from './tokens/cxElementLayout';
import {
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Eyebrow,
  Rest,
} from './tokens/cxElementTypography';

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
} from './tokens/cxElementTypography';

export { cxElementLayout } from './tokens/cxElementLayout';

export const cxElement = {
  ...cxElementColor,
  ...cxElementFontDecoration,
  ...cxElementFonts,
  ...cxElementFontSize,
  ...cxElementLayout,
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
