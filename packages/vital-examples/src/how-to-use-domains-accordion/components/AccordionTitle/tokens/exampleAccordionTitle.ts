import { withPlaceholder } from '@bodiless/components';
import { addProps, as } from '@bodiless/fclasses';
import { asAccordionTitleToken } from '@bodiless/vital-accordion';
import { vitalAccordionTitleBase } from '@bodiless/vital-accordion/lib/base';
import { omit } from 'lodash';
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';

const Default = asAccordionTitleToken(vitalAccordionTitleBase.Default, {
  ...omit(vitalAccordionTitleBase.Default, 'Theme', 'Spacing', 'Layout'),
  Theme: {
    Label: as(
      vitalTextDecoration.ExtraBold,
      vitalColor.TextPrimaryInteractive,
      'outline-dashed outline-green',
    ),
  },
  Spacing: {
    Label: 'p-2',
  },
},);

const WithFAQSchema = asAccordionTitleToken(
  vitalAccordionTitleBase.WithFAQSchema, {
    Content: {
      Label: withPlaceholder('Question'),
    },
    Analytics: {
      Wrapper: addProps({ 'custom-accordion-data-element': 'faq'})
    },
  },
);

export default {
  ...vitalAccordionTitleBase,
  Default,
  WithFAQSchema,
};
