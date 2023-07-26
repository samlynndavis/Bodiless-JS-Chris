import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FormFieldElement'],
  },
};

export default asTokenGroup(meta)({
  BackgroundBackground: vitalColor.BackgroundBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderRadiusBorderRadius: 'rounded-4px',
  PaddingPaddingTopBottom: 'p-16px',
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  PaddingPaddingLeftRight: 'p-16px',
});
