import { addProps } from '@bodiless/fclasses';
import { asCardToken, vitalCardBase } from '@bodiless/vital-card';
import { exampleCard } from '../../../reusable-tokens';

const Default = asCardToken(
  vitalCardBase.Default,
  exampleCard.Default, {
    Compose: {
      WithShadowedBy: addProps({ 'data-shadowed-by': 'exampleCard' }),
    },
  }
);

const Hero = asCardToken(
  vitalCardBase.Hero,
  exampleCard.Hero, {
    Compose: {
      WithShadowedBy: addProps({ 'data-shadowed-by': 'exampleHeroCard' }),
    },
  }
);

export default {
  ...exampleCard,
  Default,
  Hero
};
