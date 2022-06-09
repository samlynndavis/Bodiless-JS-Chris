import { as, flowHoc, removeClasses } from '@bodiless/fclasses';
import { asCardToken, vitalCardBase } from '@bodiless/vital-card';

export const WithHorizontalRightOrientation = asCardToken(vitalCardBase.WithHorizontalOrientation, {
  Layout: {
    Wrapper: as(
      'md:flex-row-reverse',
      // This is annoying.  We really should have this card variation available as its common use.
      removeClasses('md:flex-row flex-col'),
    ),
  },
  Meta: flowHoc.meta.term('Orientation')('Horizontal - Image Right'),
});
