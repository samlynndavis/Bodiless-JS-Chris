import React from 'react';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  cxPage, StyleGuideTemplateClean
} from '@bodiless/cx-templates';
import {
  as,
  on,
  replaceWith
} from '@bodiless/fclasses';
import { __cxstarter__StyleGuideTemplate } from './StyleGuideTemplate';

const { RichTextDemo, EditorPlainDemo } = __cxstarter__StyleGuideTemplate;

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: replaceWith(() => <>Choose a styleguide page from the templates menu.</>),
    EditorPlainDemo: on(StyleGuideTemplateClean)(EditorPlainDemo),
    RichTextDemo: on(StyleGuideTemplateClean)(RichTextDemo),
    Foo: replaceWith(() => <>FOO </>),
  },
});

export const __cxstarter__StyleGuidePage = { Default };
