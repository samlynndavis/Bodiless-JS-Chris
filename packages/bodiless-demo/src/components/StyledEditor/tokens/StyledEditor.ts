import { as, extendMeta, flowHoc } from '@bodiless/fclasses';
import { vitalEditorPlain } from '@bodiless/vital-editors';
import { vitalColor, vitalFontSize } from '@bodiless/vital-elements';
import { asStyledEditorToken } from '../StyledEditorClean';

const Default = asStyledEditorToken({
  Editors: {
    Content: vitalEditorPlain.Default,
  },
  Theme: {
    Wrapper: as(
      'italic text-center',
      vitalFontSize.XL,
    ),
  },
  Layout: {
    Wrapper: as(
      vitalColor.BorderPrimaryInteractive,
      'border-y-4',
      'shadow-md shadow-demo-boxshadow',
    ),
  },
  Spacing: {
    Wrapper: 'py-12',
  },
  Meta: extendMeta(
    flowHoc.meta.term('Type')('Text Editor'),
    flowHoc.meta.term('Style')('Top & Bottom Borders'),
  ),
});

export default {
  Default,
};
