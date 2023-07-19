import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FormFieldElement'],
  },
};

export default asTokenGroup(meta)({
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderActive: vitalColor.BorderInteractiveLightThemeIdle,
  BorderIdle: vitalColor.BorderLightThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
});
