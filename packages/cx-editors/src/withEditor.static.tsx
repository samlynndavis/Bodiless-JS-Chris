import { withChild } from '@bodiless/core';
import { StaticComponent, } from '@bodiless/cx-elements';

export const withEditor = () => () => withChild(StaticComponent);
export const withEditorPlain = withEditor();
export const withEditorPlainClean = withEditor();
export const withEditorRichClean = withEditor();
export const withEditorFull = withEditor();
