import { addProps } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { exampleCard } from '../../../reusable-tokens/components/Card';

const Default = asCardToken(exampleCard.Default, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': 'exampleCard' }),
  },
});

export default {
  ...exampleCard,
  Default,
};
