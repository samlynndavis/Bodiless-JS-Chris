import React from 'react';
import {
  cxPage, StyleGuideTemplateClean, cxStyleGuideTemplate,
} from '@bodiless/cx-templates';

import { RichTextClean, cxRichText } from '@bodiless/cx-editors';

import {
  as, withDesign, on, replaceWith
} from '@bodiless/fclasses';

const Editors = as(
  cxStyleGuideTemplate.Default,
  withDesign({
    Title: replaceWith(() => <>Rich Text Editor</>),
    Examples: on(RichTextClean)(cxRichText.Full),
  })
)(StyleGuideTemplateClean);

export default as(cxPage.Default)(Editors);
