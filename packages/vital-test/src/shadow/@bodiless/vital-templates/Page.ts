import vitalPage from '--vital--/lib/shadow/@bodiless/vital-templates/Page';
import { on, as } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { GenericTemplateStatic, vitalGenericTemplateStatic } from '@bodiless/vital-templates';
import { withSearchMenuProvider, withSearchResult } from '@bodiless/vital-search';

const Default = asFluidToken({
  ...vitalPage.Default,
  Components: {
    _default: on(GenericTemplateStatic)(vitalGenericTemplateStatic.Default),
    // ...vitalPage.Default.Components,
    // PDP: on(PDPTemplateClean)(vitalPDPTemplate.Default),
    // Search: on(GenericTemplateClean)(vitalSearchGenericTemplate.Search),
    // ContentListing: on(GenericTemplateClean)(vitalContentListingTemplate.Default),
  },
  Compose: {
    ...vitalPage.Default.Compose,
    WithSearchContext: as(withSearchMenuProvider, withSearchResult),
  },
});

export default {
  ...vitalPage,
  Default,
};
