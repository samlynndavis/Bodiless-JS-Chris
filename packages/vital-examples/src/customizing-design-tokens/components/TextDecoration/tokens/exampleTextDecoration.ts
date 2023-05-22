import { asTokenGroup, TextDecorationMeta } from '@bodiless/vital-elements';
import { vitalTextDecorationBase } from '@bodiless/vital-elements/src/base';

export default asTokenGroup(TextDecorationMeta)({
  ...vitalTextDecorationBase,
  Bold: 'font-black',
});
