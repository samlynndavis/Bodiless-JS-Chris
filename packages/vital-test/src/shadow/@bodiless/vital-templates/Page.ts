import vitalPageBase from '--vital--/lib/shadow/@bodiless/vital-templates/Page';
import { on, as } from '@bodiless/fclasses';
import { vitalContentListingTemplate } from '@bodiless/vital-content-listing';
import { asFluidToken } from '@bodiless/vital-elements';
import { PDPTemplateClean, vitalPDPTemplate, GenericTemplateClean } from '@bodiless/vital-templates';
import { vitalSearchGenericTemplate, withSearchMenuProvider, withSearchResult } from '@bodiless/vital-search';

const Default = asFluidToken({
  ...vitalPageBase.Default,
  Components: {
    ...vitalPageBase.Default.Components,
    PDP: on(PDPTemplateClean)(vitalPDPTemplate.Default),
    Search: on(GenericTemplateClean)(vitalSearchGenericTemplate.Search),
    ContentListing: on(GenericTemplateClean)(vitalContentListingTemplate.Default),
  },
  Compose: {
    ...vitalPageBase.Default.Compose,
    WithSearchContext: as(withSearchMenuProvider, withSearchResult),
  },
});

export default {
  ...vitalPageBase,
  Default,
};
