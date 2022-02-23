import React from 'react';
import {
  cxStyleGuideTemplate, asStyleGuideTemplateToken,
} from '@bodiless/cx-templates';
import { RichTextClean, cxRichText } from '@bodiless/cx-editors';

import {
  flowHoc,
  on, replaceWith,
} from '@bodiless/fclasses';

const title = 'Plain Text Editor Again . ';

export const Foo = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
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
