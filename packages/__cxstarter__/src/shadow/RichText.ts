import { asFluidToken } from '@bodiless/cx-elements';
// Must import directy from the token collection.
import cxRichText from '@bodiless/cx-editors/lib/components/RichText/tokens';
import omit from 'lodash/omit';

const Default = asFluidToken({
  ...cxRichText.Default,
  Core: {
    ...omit(cxRichText.Default.Components, 'H1'),
  },
  Components: {
    ...omit(cxRichText.Default.Components, 'H1'),
  },
});

export default {
  ...cxRichText,
  Default,
};