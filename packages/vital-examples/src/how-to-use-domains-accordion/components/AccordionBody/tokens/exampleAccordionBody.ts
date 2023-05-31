import { asAccordionBodyToken } from '@bodiless/vital-accordion';
import { withPlaceholder } from '@bodiless/components';
import { vitalAccordionBodyBase } from '@bodiless/vital-accordion/lib/base';

const WithFAQSchema = asAccordionBodyToken(
  vitalAccordionBodyBase.WithFAQSchema, {
    Content: {
      Content: withPlaceholder('Answer'),
    },
  },
);

export default {
  ...vitalAccordionBodyBase,
  WithFAQSchema,
};
