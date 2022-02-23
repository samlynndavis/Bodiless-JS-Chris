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

//const EditorPlain = on(StyleGuideTemplateClean)(
const EditorPlain = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
    Meta: flowHoc.meta.term('Token')('EditorPlain'),
    Content: {
      Title: replaceWith(() => <>Plain Text Editor</>),
      Examples: on(EditorPlainClean)(cxEditorPlain.Default),
    },
  })
// );

//const RichText = on(StyleGuideTemplateClean)(
const RichText = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
    Meta: flowHoc.meta.term('Token')('RichText'),
    Content: {
      Title: replaceWith(() => <>Rich Text Editor</>),
      Examples: on(RichTextClean)(cxRichText.Default),
    },
  })
// );

console.log('sgt', __cxstarter__StyleGuideTemplate);
console.log('here now');

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: replaceWith(() => <>Choose a styleguide page from the templates menu.</>),
    EditorPlain: on(StyleGuideTemplateClean)(EditorPlain),
    RichText: on(StyleGuideTemplateClean)(RichText),
  },
});

export const __cxstarter__StyleGuidePage = { Default };
