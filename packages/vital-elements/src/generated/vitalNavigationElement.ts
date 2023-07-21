import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['NavigationElement'],
  },
};

export default asTokenGroup(meta)({
  PrimaryDropdownBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryDropdownBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  SecondaryIconLightThemeSecondaryNavigation: vitalColor.BackgroundAlt6,
  SecondaryIconDarkThemeSecondaryNavigation: vitalColor.BackgroundAlt8,
  PrimaryBackgroundDarkThemePrimaryNavigation: vitalColor.BackgroundAlt5,
  PrimaryBackgroundLightThemePrimaryNavigation: vitalColor.BackgroundBase,
  PrimaryDropdownBorderDarkThemeBorder: vitalColor.BorderInteractiveDarkThemeIdle,
  PrimaryDropdownBorderLightThemeBorder: vitalColor.BorderInteractiveLightThemeIdle,
  SecondaryBackgroundDarkThemeSecondaryNavigation: vitalColor.BackgroundAlt8,
  SecondaryBackgroundLightThemeSecondaryNavigation: vitalColor.BackgroundAlt6,
});
