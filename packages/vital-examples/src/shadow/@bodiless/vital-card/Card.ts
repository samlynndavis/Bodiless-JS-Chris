import { addProps } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { lessonCard } from '../../../reusable-tokens/components/lessonCard';

const Default = asCardToken(lessonCard.Default, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': 'lessonCard' }),
  },
});

export default {
  ...lessonCard,
  Default,
};
