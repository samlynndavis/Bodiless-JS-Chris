import React from 'react';
import {
  flowHoc,
  replaceWith,
  on,
  H1,
  H2,
  H3,
  H4,
  H5,
  P,
  A,
  addProps,
  Span,
} from '@bodiless/fclasses';
import { asFluidToken, vitalTypography } from '@bodiless/vital-elements';
import {
  asStyleGuideTemplateToken,
  vitalStyleGuideTemplate,
} from '@bodiless/vital-templates';
import {
  StyleGuideExamplesClean,
  vitalStyleGuideExamples,
} from '../../Examples';

const vitalTypographyFlowContainer = asFluidToken({
  Components: {
    H1: on(H1)(
      vitalTypography.H1,
      addProps({ children: 'An example of H1 title' }),
    ),
    H2: on(H2)(
      vitalTypography.H2,
      addProps({ children: 'An example of H2 title' }),
    ),
    H3: on(H3)(
      vitalTypography.H3,
      addProps({ children: 'An example of H3 title' }),
    ),
    H4: on(H4)(
      vitalTypography.H4,
      addProps({ children: 'An example of H4 title' }),
    ),
    H5: on(H5)(
      vitalTypography.H5,
      addProps({ children: 'An example of H5 title' }),
    ),
    HeaderLink: on(Span)(
      vitalTypography.HeaderLink,
      addProps({ children: 'An example of the crumb reviews' }),
    ),
    Body: on(P)(
      vitalTypography.Body,
      addProps({ children: 'An example of the body' }),
    ),
    Eyebrow: on(Span)(
      vitalTypography.Eyebrow,
      addProps({ children: 'An example of the Eyebrow' }),
    ),
    Gradient: on(Span)(
      vitalTypography.Gradient,
      addProps({ children: 'An example of the Gradient' }),
    ),
    Link: on(A)(
      vitalTypography.Link,
      addProps({
        children: 'An example of the link',
        href: 'https://example.com',
      }),
    ),
    Rest: on(Span)(
      vitalTypography.Rest,
      addProps({ children: 'An example of the Rest' }),
    ),
  },
});

export const Typography = asStyleGuideTemplateToken(
  vitalStyleGuideTemplate.Default,
  {
    Meta: flowHoc.meta.term('Token')('Typography'),
    Content: {
      Title: replaceWith(() => <>Typography</>),
      Description: replaceWith(() => null),
      Examples: on(StyleGuideExamplesClean)(
        vitalStyleGuideExamples.Default,
        vitalTypographyFlowContainer,
      ),
    },
  },
);
