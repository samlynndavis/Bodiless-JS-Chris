import { as } from '@bodiless/fclasses';
import { asAccordionTitleToken } from '@bodiless/vital-accordion';
import { vitalAccordionTitleBase } from '@bodiless/vital-accordion/lib/base';
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';
import { omit } from 'lodash';

const Default = asAccordionTitleToken(
  vitalAccordionTitleBase.Default, {
    Components: {
      Label: as(
        omit(vitalAccordionTitleBase.Default, 'Theme', 'Spacing', 'Layout'),
        vitalTextDecoration.ExtraBold,
        vitalColor.TextPrimaryInteractive,
        'outline-dashed outline-green p-2',
      ),
    },
    Behavior: {
      Wrapper: 'transition-all duration-400',
    }
  }
);

export default {
  ...vitalAccordionTitleBase,
  Default,
};
