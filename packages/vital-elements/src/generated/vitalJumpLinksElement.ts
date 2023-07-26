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
  LinkMarginRight: 'mr-8px' 'md:mr-8px' 'lg:mr-16px',
  LinkPaddingLeft: 'pl-8px' 'md:pl-8px' 'lg:pl-16px',
  PaddingTop: 'pt-8px' 'md:pt-8px' 'lg:pt-16px',
  LinkPaddingRight: 'pr-8px' 'md:pr-8px' 'lg:pr-16px',
  LinkPaddingBottom: 'pb-8px' 'md:pb-8px' 'lg:pb-16px',
});
