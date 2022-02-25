import { withRegisterDesignContext } from '@bodiless/fclasses';
import omit from 'lodash/omit';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  cxPage,
} from '@bodiless/cx-templates';
import { __cxstarter__StyleGuideTemplate } from './StyleGuideTemplate';

const { Editors, Typography, _default } = __cxstarter__StyleGuideTemplate;

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default,
    Editors,
    Typography,
  },
  // @todo We shouldn't have to duplicate this
  Compose: {
    WithCustomRichText: withRegisterDesignContext('RichText', d => omit(d, 'H1')),
  },
});

export const __cxstarter__StyleGuidePage = { Default };
