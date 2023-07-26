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
});
