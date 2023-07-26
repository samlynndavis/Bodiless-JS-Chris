import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ProductCardElement'],
  },
};

export default asTokenGroup(meta)({
  BorderBorder: vitalColor.BorderLightThemeBase,
  TextHeadline: vitalColor.TextLightThemeBase,
  TextReviews: vitalColor.TextLightThemeBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  TextDarkThemeReviews: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BorderDarkThemeBorder: vitalColor.BorderDarkThemeBase,
  ImageBorderRadius: 'rounded-0px',
  TextLightThemeReviews: vitalColor.TextLightThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BorderRadius: 'rounded-0px',
  PaddingTop: 'pt-16px' 'md:pt-16px' 'lg:pt-24px',
  PaddingBottom: 'pb-16px' 'md:pb-16px' 'lg:pb-24px',
  PaddingLeft: 'pl-16px' 'md:pl-16px' 'lg:pl-24px',
  PaddingRight: 'pr-16px' 'md:pr-16px' 'lg:pr-24px',
});
