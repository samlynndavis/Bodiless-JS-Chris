import { as } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { vitalCardBase } from '@bodiless/vital-card/lib/base';
import { exampleRadius } from '../../Radius';

const Default = asCardToken(vitalCardBase.Default, {
  Theme: {
    ContentWrapper: as(exampleRadius.Simple),
  }
});

const Hero = asCardToken(vitalCardBase.Hero, {
  Theme: {
    Image: as(exampleRadius.Fancy),
  },
});

export default {
  ...vitalCardBase,
  Default,
  Hero,
};
