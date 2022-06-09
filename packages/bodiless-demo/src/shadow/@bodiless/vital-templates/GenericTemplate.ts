import { vitalGenericTemplateBase, asGenericTemplateToken } from '@bodiless/vital-templates';
import { vitalSpacing } from '@bodiless/vital-elements';
import { as } from '@bodiless/fclasses';

const Default = asGenericTemplateToken(vitalGenericTemplateBase.Default, {
  Spacing: {
    TopWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'py-16',
    ),
  },
});

export default {
  ...vitalGenericTemplateBase,
  Default,
};
