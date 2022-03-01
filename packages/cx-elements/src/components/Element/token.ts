import { cxElementLayout } from './layout.token';
import {
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
} from './typography.token';
import { cxElementColor } from './color.token';

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
} from './typography.token';

export { cxElementLayout } from './layout.token';

export const cxElement = {
  ...cxElementLayout,
  ...cxElementColor,
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
