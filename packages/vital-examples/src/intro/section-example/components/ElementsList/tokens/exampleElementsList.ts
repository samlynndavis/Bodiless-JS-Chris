import { on } from '@bodiless/fclasses';
import { CardClean, vitalCard } from '@bodiless/vital-card';

import { asElementListToken } from '../ElementsListClean';

const Default = asElementListToken({
  Components: {
    ElementToUse: on(CardClean)(vitalCard.Default),
  },
  Layout: {
    Wrapper: 'flex',
  },
  Spacing: {
    Wrapper: 'mt-6',
    ElementWrapper: 'px-2'
  },
});

export default {
  Default,
};
