import { asElementToken } from '@bodiless/vital-elements';

const fancyRadius = asElementToken({
  Theme: {
    _: 'card-corner md:card-corner-md lg:card-corner-lg',
  },
});

export default {
  fancyRadius,
};
