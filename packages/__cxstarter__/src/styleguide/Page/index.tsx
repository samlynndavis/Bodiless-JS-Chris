import React from 'react';
import {
  RichTextClean, cxRichText, EditorPlainClean, cxEditorPlain
} from '@bodiless/cx-editors';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  asStyleGuideTemplateToken, cxPage, cxStyleGuideTemplate, StyleGuideTemplateClean
} from '@bodiless/cx-templates';
import {
  flowHoc, on, replaceWith
} from '@bodiless/fclasses';
import { __cxstarter__StyleGuideTemplate } from '../StyleGuideTemplate';

const EditorPlainToken = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('EditorPlain'),
  Content: {
    Title: replaceWith(() => <>Plain Text Editor</>),
    Examples: on(EditorPlainClean)(cxEditorPlain.Default),
  },
});

const EditorPlainDemo = on(StyleGuideTemplateClean)(
  EditorPlainToken
);
const EditorPlain = on(StyleGuideTemplateClean)(
  asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
    Meta: flowHoc.meta.term('Token')('EditorPlain'),
    Content: {
      Title: replaceWith(() => <>Plain Text Editor</>),
      Examples: on(EditorPlainClean)(cxEditorPlain.Default),
    },
  })
);

const RichTextToken = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('RichText'),
  Content: {
    Title: replaceWith(() => <>Rich Text Editor</>),
    Examples: on(RichTextClean)(cxRichText.Default),
  },
});
const RichTextDemo = on(StyleGuideTemplateClean)(RichTextToken);
const RichText = on(StyleGuideTemplateClean)(
  asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
    Meta: flowHoc.meta.term('Token')('RichText'),
    Content: {
      Title: replaceWith(() => <>Rich Text Editor</>),
      Examples: on(RichTextClean)(cxRichText.Default),
    },
  })
);


const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: replaceWith(() => <>Choose a styleguide page from the templates menu.</>),
    // EditorPlain,
    EditorPlainDemo,
    // RichText,
    RichTextDemo,
  },
});

export const __cxstarter__StyleGuidePage = { Default };
