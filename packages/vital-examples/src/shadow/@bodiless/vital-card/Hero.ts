import { addProps } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { exampleCard } from '../../../reusable-tokens/components/Card';

const Default = asCardToken(exampleCard.Hero, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': 'exampleHeroCard' }),
  },
});

export default {
  ...exampleCard,
  Default,
};
