import { Editable } from '@bodiless/components';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { designable, DesignableComponentsProps } from '@bodiless/fclasses';
import React, { ComponentType, ComponentProps, FC } from 'react';

type EditorPlainComponents = {
  Editable: ComponentType<ComponentProps<typeof Editable>>,
};

const editorPlainComponents: EditorPlainComponents = {
  Editable,
};

type EditorPlainBaseProps = DesignableComponentsProps<EditorPlainComponents>
& ComponentProps<typeof Editable>;

const EditorPlainBase: FC<EditorPlainBaseProps> = props => {
  const { components: C, ...rest } = props;
  return <C.Editable {...rest} />;
};

export const EditorPlainClean = designable(
  editorPlainComponents,
  'EditorPlain',
)(EditorPlainBase);

export const asEditorPlainToken = asCxTokenSpec<EditorPlainComponents>();
