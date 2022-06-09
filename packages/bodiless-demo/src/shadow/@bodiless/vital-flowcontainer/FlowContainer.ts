import { useNode } from '@bodiless/core';
import { flowIf, on } from '@bodiless/fclasses';
import { CardClean, vitalCard } from '@bodiless/vital-card';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { WithHorizontalRightOrientation } from '../../../components/Card';
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
      CardImageRight: on(CardClean)(
        vitalCard.Default,
        WithHorizontalRightOrientation,
        vitalCard.WithFlowContainerPreview,
        vitalCard.WithNoEyebrow,
      ),
    },
  },
  ExtraPaddingOnHome,
);

export default {
  ...vitalFlowContainerBase,
  Default,
};
