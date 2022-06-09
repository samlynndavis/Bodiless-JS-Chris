import React from 'react';
import type { ComponentOrTag } from '@bodiless/fclasses';
import {
  designable,
  Div,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { EditorPlainClean } from '@bodiless/vital-editors';
import { withoutHydration } from '@bodiless/hydration';

export type StyledEditorComponents = {
  Wrapper: ComponentOrTag<any>,
  Content: ComponentOrTag<any>,
};

const styledEditorComponents:StyledEditorComponents = {
  Wrapper: Div,
  Content: EditorPlainClean,
};

type Props = DesignableComponentsProps<StyledEditorComponents> & { };

const StyledEditorBase = (props: Props) => {
  const { components: C } = props;

  return (
    <C.Wrapper>
      <C.Content />
    </C.Wrapper>
  );
};

const StyledEditorClean = designable(styledEditorComponents, 'Styled Editor')(StyledEditorBase);

export const asStyledEditorToken = asVitalTokenSpec<StyledEditorComponents>();

export default withoutHydration()(StyledEditorClean);
