import { asFluidToken } from '@bodiless/cx-elements';
import { cxRichTextBase } from '@bodiless/cx-editors';
import omit from 'lodash/omit';

const Default = asFluidToken({
  ...cxRichTextBase.Default,
  Core: {
    ...omit(cxRichTextBase.Default.Core, 'H1'),
  },
  Components: {
    ...omit(cxRichTextBase.Default.Components, 'H1'),
  },
});

export default {
  ...cxRichTextBase,
  Default,
};
