import React from 'react';
import {
  cxPage, StyleGuideTemplateClean, cxStyleGuideTemplate,
} from '@bodiless/cx-templates';

import { RichTextClean, cxRichText } from '@bodiless/cx-editors';

import {
  as, withDesign, on, replaceWith, addProps,
} from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';

const Editors = as(
  cxStyleGuideTemplate.Default,
  withDesign({
    Title: replaceWith(() => <>Rich Text Editor</>),
    Examples: on(RichTextClean)(
      cxRichText.Full,
      addProps({
        placeholder: 'Placeholder',
      }),
      withNodeKey('richtext'),
    ),
  })
)(StyleGuideTemplateClean);

export default as(cxPage.Default)(Editors);
