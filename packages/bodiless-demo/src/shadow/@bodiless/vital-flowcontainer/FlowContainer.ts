import { useNode } from '@bodiless/core';
import { flowIf, on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { StyledEditor, StyledEditorClean } from '../../../components/StyledEditor';

const isHome = () => useNode().node.pagePath === '/';

const ExtraPaddingOnHome = asFluidToken(vitalFlowContainerBase.Default, {
  Flow: flowIf(isHome),
  Spacing: {
    ComponentWrapper: 'my-12',
  },
});

const Default = asFluidToken(
  {
    ...vitalFlowContainerBase.Default,
    Components: {
      ...vitalFlowContainerBase.Default.Components,
      StyledEditor: on(StyledEditorClean)(StyledEditor.Default),
    },
  },
  ExtraPaddingOnHome,
);

export default {
  ...vitalFlowContainerBase,
  Default,
};
