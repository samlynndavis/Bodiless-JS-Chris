import { as } from '@bodiless/fclasses';
import { asCardToken, vitalCard } from '@bodiless/vital-card';
import { asElementToken } from '@bodiless/vital-elements';
// import { fancyRadius } from '../../fancyRadius';
// import { simpleCorner } from '../../Radius';

// TODO: Determine how to import 'simpleCorner' and 'fancyRadius' tokens rather
// than needing to compose and apply here

const simpleCorner = asElementToken({
  Theme: {
    _: 'rounded-bl-[20px]',
  },
});

const fancyRadius = asElementToken({
  Theme: {
    _: 'card-corner md:card-corner-md lg:card-corner-lg',
  },
});

const Default = asCardToken(vitalCard.Default, {
  Theme: {
    ContentWrapper: as(simpleCorner),
  }
});

const Hero = asCardToken(vitalCard.Hero, {
  Theme: {
    Image: as(fancyRadius),
  },
});

export default {
  ...vitalCard,
  Default,
  Hero,
};
