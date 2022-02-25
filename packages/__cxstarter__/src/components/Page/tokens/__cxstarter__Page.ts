import { asElementToken } from '@bodiless/cx-elements';
import { cxPage } from '@bodiless/cx-templates';
import { withRegisterDesignContext } from '@bodiless/fclasses';
import { omit } from 'lodash';

const Default = asElementToken({
  ...cxPage.Default,
  Compose: {
    WithCustomRichText: withRegisterDesignContext('RichText', d => omit(d, 'H1')),
  },
});

export default {
  ...cxPage,
  Default,
};
