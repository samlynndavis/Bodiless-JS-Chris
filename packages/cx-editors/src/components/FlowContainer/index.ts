import { asFluidToken } from '@bodiless/cx-elements';
import { on } from '@bodiless/fclasses';
import { cxRichText, RichTextClean } from '../RichText';

const WithEditorVariations = asFluidToken({
  Components: {
    RichText: on(RichTextClean)(cxRichText.Default),
  },
});

export const cxEditorsFlowContainer = { WithEditorVariations };
