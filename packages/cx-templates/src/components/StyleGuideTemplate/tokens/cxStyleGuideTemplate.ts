import { cxElement } from '@bodiless/cx-elements';
import { EditorPlainClean, cxEditorPlain } from '@bodiless/cx-editors';
import { withNodeKey } from '@bodiless/core';
import { on } from '@bodiless/fclasses';
import { cxLayout, LayoutClean } from '@bodiless/cx-layout';
import { asStyleGuideTemplateToken } from '../StyleGuideTemplateClean';

const Default = asStyleGuideTemplateToken({
  Theme: {
    TitleWrapper: cxElement.H1,
  },
  Components: {
    Wrapper: on(LayoutClean)(cxLayout.Default),
  },
  Editors: {
    Title: on(EditorPlainClean)(cxEditorPlain.Title),
  },
  Schema: {
    Title: withNodeKey('title'),
  },
});

export default { Default };
