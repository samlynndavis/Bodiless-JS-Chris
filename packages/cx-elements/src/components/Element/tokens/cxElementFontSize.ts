import { asTokenGroup } from '../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FontSize'],
  },
};

export const cxElementFontSize = asTokenGroup(meta)({
  Base: 'text-m-base lg:text-base',
  ThreeXl: 'text-m-3xl lg:text-3xl',
  TwoXl: 'text-m-2xl lg:text-2xl',
  Xl: 'text-m-xl lg:text-xl',
  Lg: 'text-m-lg lg:text-lg',
  Xs: 'text-m-xs lg:text-xs',
});
