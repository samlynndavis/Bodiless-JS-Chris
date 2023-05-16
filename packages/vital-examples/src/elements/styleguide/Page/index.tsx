import { asFluidToken } from '@bodiless/vital-elements';
import { vitalPage } from '@bodiless/vital-templates';
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
