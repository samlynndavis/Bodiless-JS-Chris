import React from 'react';
import { asFluidToken } from '@bodiless/cx-elements';
import {
  cxPage
} from '@bodiless/cx-templates';
import {
  replaceWith
} from '@bodiless/fclasses';

import { RichText } from './StyleGuideTemplate/RichText';
import { EditorPlain } from './StyleGuideTemplate/EditorPlain';

const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: replaceWith(() => <>Choose a styleguide page from the templates menu.</>),
    EditorPlain,
    RichText,
    Foo: replaceWith(() => <>FOO </>),
  },
});

export const __cxstarter__StyleGuidePage = { Default };
