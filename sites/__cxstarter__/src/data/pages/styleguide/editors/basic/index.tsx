import React from 'react';
import { graphql } from 'gatsby';
import {
  cxPage, StyleGuideTemplateClean, cxStyleGuideTemplate,
} from '@bodiless/cx-templates';

import { EditorPlainClean, cxEditorPlain } from '@bodiless/cx-editors';

import {
  as, withDesign, on, replaceWith, addProps,
} from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';

const Editors = as(
  cxStyleGuideTemplate.Default,
  withDesign({
    Title: replaceWith(() => <>Basic Editor with Auto Superscript</>),
    Examples: on(EditorPlainClean)(
      cxEditorPlain.WithAutoSuperscript,
      addProps({
        placeholder: 'Placeholder',
      }),
      withNodeKey('plain'),
    ),
  }),
)(StyleGuideTemplateClean);

export default as(cxPage.Default)(Editors);

// The allSite query is extraneous and exists only to prevent
// a webpack linting error produced by default gatsby config(the $slug variable
// is used in the fragments, but the graphql doesn't pick that up and
// raises an unused parameter error).
// @todo Fix unnecessary query.
export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
    allSite(filter: {pathPrefix: {eq: $slug}}) {
      edges {
        node {
          buildTime
        }
      }
    }
  }
`;

