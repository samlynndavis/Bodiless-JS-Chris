import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['NavigationElement'],
  },
};

export default asTokenGroup(meta)({
  PrimaryDropdownBackgroundBackground: vitalColor.BackgroundBase,
  PrimaryBackgroundPrimaryNavigation: vitalColor.BackgroundBase,
  PrimaryDropdownBorderBorder: vitalColor.BorderInteractiveLightThemeIdle,
  SecondaryBackgroundSecondaryNavigation: vitalColor.BackgroundAlt6,
  PrimaryDropdownBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryDropdownBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  PrimaryBackgroundDarkThemePrimaryNavigation: vitalColor.BackgroundAlt5,
  PrimaryBackgroundLightThemePrimaryNavigation: vitalColor.BackgroundBase,
  PrimaryDropdownBorderDarkThemeBorder: vitalColor.BorderInteractiveDarkThemeIdle,
  PrimaryDropdownBorderLightThemeBorder: vitalColor.BorderInteractiveLightThemeIdle,
  SecondaryBackgroundDarkThemeSecondaryNavigation: vitalColor.BackgroundAlt8,
  SecondaryBackgroundLightThemeSecondaryNavigation: vitalColor.BackgroundAlt6,
});
