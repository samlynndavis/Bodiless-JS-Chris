import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['CheckboxElement'],
  },
};

export default asTokenGroup(meta)({
  BorderChecked: vitalColor.BorderInteractiveLightThemeIdle,
  BorderHover: vitalColor.BorderLightThemeBase,
  BorderIdle: vitalColor.BorderLightThemeBase,
  BackgroundDisabled: vitalColor.BackgroundInteractiveLightThemeDisabled,
  BackgroundChecked: vitalColor.BackgroundInteractiveLightThemeIdle,
  BackgroundHover: vitalColor.BackgroundInteractiveLightThemeHover,
  TextLabel: vitalColor.TextLightThemeBase,
  BorderDisabled: vitalColor.BorderInteractiveLightThemeDisabled,
  BorderLightThemeChecked: vitalColor.BorderInteractiveLightThemeIdle,
  BorderLightThemeHover: vitalColor.BorderLightThemeBase,
  BorderLightThemeIdle: vitalColor.BorderLightThemeBase,
  BackgroundLightThemeDisabled: vitalColor.BackgroundInteractiveLightThemeDisabled,
  BackgroundLightThemeChecked: vitalColor.BackgroundInteractiveLightThemeIdle,
  BackgroundLightThemeHover: vitalColor.BackgroundInteractiveLightThemeHover,
  TextLightThemeLabel: vitalColor.TextLightThemeBase,
  BorderLightThemeDisabled: vitalColor.BorderInteractiveLightThemeDisabled,
  MarginRight: 'mr-12px',
  TextDarkThemeLabel: vitalColor.TextLightThemeBase,
  PaddingLeft: 'pl-0px' 'md:pl-0px' 'lg:pl-0px',
  PaddingRight: 'pr-0px' 'md:pr-0px' 'lg:pr-0px',
  PaddingTop: 'pt-0px' 'md:pt-0px' 'lg:pt-0px',
  PaddingBottom: 'pb-0px' 'md:pb-0px' 'lg:pb-0px',
});
