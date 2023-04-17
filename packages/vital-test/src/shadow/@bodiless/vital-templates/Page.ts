import vitalPageBase from '--vital--/lib/shadow/@bodiless/vital-templates/Page';
import { asFluidToken } from '@bodiless/vital-elements';
import { asBodilessPage } from '../../../helpers/asBodilessPage';

const Default = asFluidToken({
  ...vitalPageBase.Default,
  Schema: {
    _: asBodilessPage,
  },
});

export default {
  Default,
};
