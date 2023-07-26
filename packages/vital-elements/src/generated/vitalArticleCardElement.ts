import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ArticleCardElement'],
  },
};

export default asTokenGroup(meta)({
  TextEyebrow: vitalColor.TextLightThemeBase,
  TextBody: vitalColor.TextLightThemeBase,
  TextHeadline: vitalColor.TextLightThemeBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  BorderRadius: 'rounded-0px',
  TextDarkThemeEyebrow: vitalColor.TextDarkThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeEyebrow: vitalColor.TextLightThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  ImageBorderRadius: 'rounded-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  PaddingBottom: 'pb-16px' 'md:pb-16px' 'lg:pb-24px',
  PaddingTop: 'pt-16px' 'md:pt-16px' 'lg:pt-24px',
  PaddingRight: 'pr-16px' 'md:pr-16px' 'lg:pr-24px',
  PaddingLeft: 'pl-16px' 'md:pl-16px' 'lg:pl-24px',
});
