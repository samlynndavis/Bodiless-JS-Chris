import { Fragment } from 'react';
import { graphql } from 'gatsby';
import { as } from '@bodiless/fclasses';
import { vitalPage } from '@bodiless/vital-templates';

const DefaultPage = as(vitalPage.Default)(Fragment);

export default DefaultPage;

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
