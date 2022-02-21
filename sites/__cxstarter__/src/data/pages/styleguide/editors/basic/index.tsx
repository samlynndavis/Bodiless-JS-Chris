import React from 'react';
import {
  cxPage, StyleGuideTemplateClean, cxStyleGuideTemplate,
} from '@bodiless/cx-templates';

import { EditorPlainClean, cxEditorPlain } from '@bodiless/cx-editors';

import {
  as, withDesign, on, replaceWith, addProps,
} from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';

const Editors = as(
  cxStyleGuideTemplate.Default,
  withDesign({
    Title: replaceWith(() => <>Basic Editor with Auto Superscript</>),
    Examples: on(EditorPlainClean)(
      cxEditorPlain.WithAutoSuperscript,
      addProps({
        placeholder: 'Placeholder',
      }),
      withNodeKey('plain'),
    ),
  }),
)(StyleGuideTemplateClean);

export default as(cxPage.Default)(Editors);
