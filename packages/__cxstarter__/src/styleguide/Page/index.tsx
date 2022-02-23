import React from 'react';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  cxPage} from '@bodiless/cx-templates';
import {
  replaceWith
} from '@bodiless/fclasses';
import { __cxstarter__StyleGuideTemplate } from '../StyleGuideTemplate';

import { EditorPlain, RichText } from './StyleGuideTemplate';

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: replaceWith(() => <>Choose a styleguide page from the templates menu.</>),
    EditorPlain,
    RichText,
  },
});

export const __cxstarter__StyleGuidePage = { Default };
