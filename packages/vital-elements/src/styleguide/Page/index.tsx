import { vitalPage } from '@bodiless/vital-templates';
import { asFluidToken } from '../../util';
import { TestStyleGuideTemplate } from './StyleGuideTemplate';

const { Typography } = TestStyleGuideTemplate;

const Default = asFluidToken({
  ...vitalPage.Default,
  Components: {
    Typography,
  },
});

export default {
  Default,
};
