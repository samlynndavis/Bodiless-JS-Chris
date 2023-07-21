import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['CategoryCardElement'],
  },
};

export default asTokenGroup(meta)({
  PaddingLeft: 'pl-0px',
  PaddingRight: 'pr-0px',
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
});
