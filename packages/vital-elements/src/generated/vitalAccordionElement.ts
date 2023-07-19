import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['AccordionElement'],
  },
};

export default asTokenGroup(meta)({
  DropdownTextDarkThemeBody: vitalColor.TextDarkThemeBase,
  DropdownTextLightThemeBody: vitalColor.TextLightThemeBase,
  DropdownBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderLightThemeColor: vitalColor.BorderLightThemeBase,
  LabelBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  LabelTextDarkThemeLabel: vitalColor.TextDarkThemeBase,
  LabelTextLightThemeLabel: vitalColor.TextLightThemeBase,
  DropdownBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BorderDarkThemeColor: vitalColor.BorderDarkThemeBase,
  LabelBackgroundDarkThemeBackground: vitalColor.BackgroundAlt7,
});
