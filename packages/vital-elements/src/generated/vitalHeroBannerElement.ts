import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['HeroBannerElement'],
  },
};

export default asTokenGroup(meta)({
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextLightThemeEyebrow: vitalColor.TextLightThemeBase,
  TextDarkThemeEyebrow: vitalColor.TextDarkThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
});
