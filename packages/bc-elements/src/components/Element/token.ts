import { bcElementLayout } from './layout.token';
import { bcElementTypography } from './typography.token';
import { bcElementColor } from './color.token';

export { bcElementTypography } from './typography.token';
export { bcElementLayout } from './layout.token';

export const bcElement = {
  ...bcElementTypography,
  ...bcElementLayout,
  ...bcElementColor,
};
