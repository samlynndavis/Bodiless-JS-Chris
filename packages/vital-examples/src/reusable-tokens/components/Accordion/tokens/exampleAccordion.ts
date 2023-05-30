import { as } from '@bodiless/fclasses';
import { asAccordionToken, vitalAccordionTitle } from '@bodiless/vital-accordion';
import { vitalAccordionBase } from '@bodiless/vital-accordion/lib/base';
import { omit } from 'lodash';

const Default = asAccordionToken(
  vitalAccordionBase.Default, {
    Components: {
      ...vitalAccordionBase.Default.Components,
      Wrapper: as(omit(vitalAccordionTitle.Default, 'Theme', 'Spacing', 'Layout'), 'TESTCLASS'),
    },
  }
);

const WithFAQSchema = asAccordionToken(
  vitalAccordionBase.WithFAQSchema, {
    SEO: {
      ...vitalAccordionBase.WithFAQSchema.SEO,
      _: as('uppercase'),
    },
  },
);

export default {
  ...vitalAccordionBase,
  Default,
  WithFAQSchema,
};
