import { asElementToken } from '@bodiless/vital-elements';

const Simple = asElementToken({
  Theme: {
    _: 'rounded-bl-[20px]',
  },
});

const Fancy = asElementToken({
  Theme: {
    _: 'card-corner md:card-corner-md lg:card-corner-lg',
  },
});

export default {
  Simple,
  Fancy,
};
