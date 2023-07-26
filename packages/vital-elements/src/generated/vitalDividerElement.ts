import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['DividerElement'],
  },
};

export default asTokenGroup(meta)({
  Primary: vitalColor.BorderLightThemeBase,
  Secondary: vitalColor.BorderLightThemeAlt1,
  DarkThemeSecondary: vitalColor.BorderDarkThemeBase,
  LightThemePrimary: vitalColor.BorderLightThemeBase,
  LightThemeSecondary: vitalColor.BorderLightThemeAlt1,
  DarkThemePrimary: vitalColor.BorderDarkThemeBase,
});
