import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FooterElement'],
  },
};

export default asTokenGroup(meta)({
  PrimaryTextHeadline: vitalColor.TextDarkThemeBase,
  PrimaryTextCaption: vitalColor.TextDarkThemeBase,
  PrimaryTextLink: vitalColor.TextDarkThemeBase,
  PrimaryBackgroundBackground: vitalColor.BackgroundAlt8,
  SecondaryTextCaption: vitalColor.TextLightThemeAlt1,
  SecondaryTextHeadline: vitalColor.TextLightThemeBase,
  SecondaryBackgroundBackground: vitalColor.BackgroundAlt6,
  SecondaryTextBody: vitalColor.TextLightThemeBase,
  PrimaryTextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  PrimaryTextDarkThemeLink: vitalColor.TextDarkThemeBase,
  PrimaryTextLightThemeHeadline: vitalColor.TextDarkThemeBase,
  PrimaryTextLightThemeCaption: vitalColor.TextDarkThemeBase,
  PrimaryTextLightThemeLink: vitalColor.TextDarkThemeBase,
  PrimaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryTextDarkThemeCaption: vitalColor.TextDarkThemeBase,
  SecondaryTextLightThemeCaption: vitalColor.TextLightThemeAlt1,
  SecondaryTextLightThemeHeadline: vitalColor.TextLightThemeBase,
  SecondaryTextDarkThemeCaption: vitalColor.TextDarkThemeBase,
  SecondaryTextDarkThemeBody: vitalColor.TextDarkThemeBase,
  SecondaryTextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  SecondaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  SecondaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  SecondaryTextLightThemeBody: vitalColor.TextLightThemeBase,
});
