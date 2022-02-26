import { asFluidToken } from '@bodiless/cx-elements';
import {
  cxPage,
} from '@bodiless/cx-templates';
import { __cxstarter__StyleGuideTemplate } from './StyleGuideTemplate';
import { __cxstarter__DesignContext } from '../../components/DesignContext';

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
    ...__cxstarter__DesignContext,
  },
});

export const __cxstarter__StyleGuidePage = { Default };
