import { asTokenGroup, FontSizeMeta } from '@bodiless/vital-elements';
import { vitalFontSizeBase } from '@bodiless/vital-elements/src/base';

export default asTokenGroup(FontSizeMeta)({
  ...vitalFontSizeBase,
  XXXXXL: 'text-m-5xl lg:text-5xl',
});
