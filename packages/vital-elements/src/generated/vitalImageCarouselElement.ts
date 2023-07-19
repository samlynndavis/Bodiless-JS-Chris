import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ImageCarouselElement'],
  },
};

export default asTokenGroup(meta)({
  ImageBorderDarkThemeIdle: vitalColor.BorderDarkThemeBase,
  ImageThumbnailBorderDarkThemeIdle: vitalColor.BorderDarkThemeBase,
  ImageThumbnailBorderLightThemeActive: vitalColor.BorderInteractiveLightThemeIdle,
  ImageBorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  ImageThumbnailBorderLightThemeIdle: vitalColor.BorderLightThemeBase,
  ImageThumbnailBorderDarkThemeActive: vitalColor.BorderInteractiveDarkThemeIdle,
});
