import { asTokenGroup } from '../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FontSize'],
  },
};

export const cxElementFontSize = asTokenGroup(meta)({
  Base: 'text-m-base lg:text-base',
  ThreeXL: 'text-m-3xl lg:text-3xl',
  TwoXL: 'text-m-2xl lg:text-2xl',
  XL: 'text-m-xl lg:text-xl',
  LG: 'text-m-lg lg:text-lg',
  XS: 'text-m-xs lg:text-xs',
});
