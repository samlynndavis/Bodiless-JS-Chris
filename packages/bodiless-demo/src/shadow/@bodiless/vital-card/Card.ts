import { flowHoc } from '@bodiless/fclasses';
import { asCardToken, vitalCardBase } from '@bodiless/vital-card';

const Hero = asCardToken(vitalCardBase.Hero, {
  // ...vitalCardBase.WithPrimaryButton,
});

const WithHorizontalRightOrientation = asCardToken(vitalCardBase.WithHorizontalOrientation, {
  Layout: {
    Wrapper: 'flex-reverse',
  },
  Meta: flowHoc.meta.term('Orientation')('Horizontal - Image Right'),
});

export default {
  ...vitalCardBase,
  Hero,
  WithHorizontalRightOrientation,
};
