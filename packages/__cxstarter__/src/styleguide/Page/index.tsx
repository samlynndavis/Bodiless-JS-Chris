import React from 'react';
import {
  RichTextClean, cxRichText, EditorPlainClean, cxEditorPlain
} from '@bodiless/cx-editors';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  asStyleGuideTemplateToken, cxPage, cxStyleGuideTemplate, StyleGuideTemplateClean
} from '@bodiless/cx-templates';
import {
  flowHoc, on, P, replaceWith
} from '@bodiless/fclasses';
import { __cxstarter__StyleGuideTemplate } from '../StyleGuideTemplate';
import { EditorPlain } from '../StyleGuideTemplate/EditorPlain';

const title = 'AAA';
const RichText = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Tokens')('RichText'),
  Content: {
    Title: replaceWith(() => <>{title}</>),
    // @TODO Enable editable description with default content.
    // Description: ...
    // @TODO: Add an iframe slot
    // Comps: ...
    // @TODO Auto generate examples from token collection.
    Examples: on(RichTextClean)(cxRichText.Default),
  },
});

console.log('sgt', __cxstarter__StyleGuideTemplate);
console.log('here now');

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    // @ts-ignore
    _default: replaceWith(() => 'Choose a styleguide page from the templates menu.'),
    EditorPlain: on(StyleGuideTemplateClean)(
      asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
        Content: {
          Title: replaceWith(() => <>Plain Text Editor</>),
          Examples: on(EditorPlainClean)(cxEditorPlain.Default),
        },
      })
    ),
    RichText: on(StyleGuideTemplateClean)(
      asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
        Content: {
          Title: replaceWith(() => <>Rich Text Editor</>),
          Examples: on(RichTextClean)(cxRichText.Default),
        },
      })
    ),
  },
});

export const __cxstarter__StyleGuidePage = { Default };
