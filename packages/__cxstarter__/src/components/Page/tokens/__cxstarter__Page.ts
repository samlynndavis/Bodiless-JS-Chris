import { asElementToken } from '@bodiless/cx-elements';
import { cxPage } from '@bodiless/cx-templates';
import { __cxstarter__DesignContext } from '../../DesignContext';

const Default = asElementToken({
  ...cxPage.Default,
  Compose: {
    ...__cxstarter__DesignContext,
  },
});

export default {
  ...cxPage,
  Default,
};
