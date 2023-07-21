import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FormFieldElement'],
  },
};

export default asTokenGroup(meta)({
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderActive: vitalColor.BorderInteractiveLightThemeIdle,
  BorderIdle: vitalColor.BorderLightThemeBase,
  PaddingPadding-Top,Bottom: 'p-16px',
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  PaddingPadding-Left,Right: 'p-16px',
});
