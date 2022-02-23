import React from 'react';
import { RichTextClean, cxRichText } from '@bodiless/cx-editors';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { on, flowHoc, replaceWith } from '@bodiless/fclasses';

export const RichText = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('RichText'),
  Content: {
    Title: replaceWith(() => <>Rich Text Editor</>),
    Examples: on(RichTextClean)(cxRichText.Default),
  },
});
