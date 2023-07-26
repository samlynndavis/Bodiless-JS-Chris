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
  PrimaryPaddingBottom: 'pb-8px' 'md:pb-8px' 'lg:pb-16px',
  SecondaryPaddingBottom: 'pb-24px' 'md:pb-24px' 'lg:pb-8px',
  SecondaryPaddingTop: 'pt-24px' 'md:pt-24px' 'lg:pt-8px',
  PrimaryPaddingTop: 'pt-8px' 'md:pt-8px' 'lg:pt-16px',
});
