import { as } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { vitalCardBase } from '@bodiless/vital-card/lib/base';
import { Radius } from '../../Radius';

const Default = asCardToken(vitalCardBase.Default, {
  Theme: {
    ContentWrapper: as(Radius.Simple),
  }
});

const Hero = asCardToken(vitalCardBase.Hero, {
  Theme: {
    Image: as(Radius.Fancy),
  },
});

export default {
  ...vitalCardBase,
  Default,
  Hero,
};
