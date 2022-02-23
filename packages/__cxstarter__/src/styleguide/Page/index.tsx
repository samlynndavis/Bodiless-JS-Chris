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

const { RichText, EditorPlain } = __cxstarter__StyleGuideTemplate;

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: replaceWith(() => <>Choose a styleguide page from the templates menu.</>),
    EditorPlain: on(StyleGuideTemplateClean)(EditorPlain),
    RichText: on(StyleGuideTemplateClean)(RichText),
    Foo: replaceWith(() => <>FOO </>),
  },
});

export const __cxstarter__StyleGuidePage = { Default };
