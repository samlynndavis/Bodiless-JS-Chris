import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ImageCarouselElement'],
  },
};

export default asTokenGroup(meta)({
  ImageThumbnailBorderActive: vitalColor.BorderInteractiveLightThemeIdle,
  ImageBorderBorder: vitalColor.BorderLightThemeBase,
  ImageThumbnailBorderIdle: vitalColor.BorderLightThemeBase,
  ImageBorderDarkThemeIdle: vitalColor.BorderDarkThemeBase,
  ImageThumbnailBorderDarkThemeIdle: vitalColor.BorderDarkThemeBase,
  ImageThumbnailBorderLightThemeActive: vitalColor.BorderInteractiveLightThemeIdle,
  ImageBorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  ImageBorderRadiusBorderRadius: 'rounded-0px',
  ImageThumbnailBorderLightThemeIdle: vitalColor.BorderLightThemeBase,
  ImageThumbnailBorderDarkThemeActive: vitalColor.BorderInteractiveDarkThemeIdle,
});
