import { asTokenGroup } from '../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FontDecoration'],
  },
};

export const cxElementFontDecoration = asTokenGroup(meta)({
  WithUnderline: 'underline',
  WithBold: 'font-bold',
  WithExtraBold: 'font-extrabold',
  WithUppercase: 'uppercase',
  WithMedium: 'font-medium',
  WithNormal: 'font-normal',
  WithSuperscript: 'align-baseline',
});
