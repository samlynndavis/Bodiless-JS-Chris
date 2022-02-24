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
});

export const __cxstarter__StyleGuidePage = { Default };
