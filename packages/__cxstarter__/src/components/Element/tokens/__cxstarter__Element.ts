import { cxElement } from '@bodiless/cx-elements';
import { as } from '@bodiless/fclasses';

export default {
  ...cxElement,
  H2: as(cxElement.H2, 'starter-custom'),
};
