import { asFluidToken } from '@bodiless/cx-elements';
import { cxFlowContainer } from '@bodiless/cx-flowcontainer';

const Default = asFluidToken({
  ...cxFlowContainer.Default,
  Components: {
    ...cxFlowContainer.Default.Components,
  },
});

export default {
  Default
};
