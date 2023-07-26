import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['JumpLinksElement'],
  },
};

export default asTokenGroup(meta)({
  BorderBorder: vitalColor.BorderInteractiveLightThemeIdle,
  TextIdle: vitalColor.TextInteractiveLightThemeIdle,
  BackgroundBackground: vitalColor.BackgroundAlt6,
  TextHover: vitalColor.TextInteractiveLightThemeHover,
  TextBody: vitalColor.TextLightThemeBase,
  TextActive: vitalColor.TextInteractiveLightThemeIdle,
  BorderDarkThemeBorder: vitalColor.BorderInteractiveDarkThemeIdle,
  BorderLightThemeBorder: vitalColor.BorderInteractiveLightThemeIdle,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextDarkThemeActive: vitalColor.TextInteractiveDarkThemeIdle,
  TextLightThemeIdle: vitalColor.TextInteractiveLightThemeIdle,
  BackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  TextLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
  TextDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,
  TextDarkThemeIdle: vitalColor.TextInteractiveDarkThemeIdle,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeActive: vitalColor.TextInteractiveLightThemeIdle,
});
