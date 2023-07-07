import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HOC } from '@bodiless/fclasses';
import { withPageTreeButton as withPageTreeButtonBase } from '@bodiless/page';

const query = graphql`
  query PageTreeQuery {
      allDirectory(filter: {relativePath: {regex: "/^pages/"}}) {
        edges {
          node {
            relativePath
          }
        }
      }
    }
  `;

type Datum = {
  node: {
    relativePath: string,
  }
};

type Data = {
  allDirectory: {
    edges: Datum[],
  }
};

const withPageTreeButton: HOC = Component => {
  const ComponentWithPageTreeButton = withPageTreeButtonBase(Component);
  return (props: any) => {
    // @todo The presence of this static query causes a bug
    // See https://jira.jnj.com/browse/AESQ-9023
    const rawData: Data = useStaticQuery(query);
    const pages = rawData.allDirectory.edges.map(
      ({ node }) => node.relativePath.split('/').slice(1).join('/'),
    ).filter(p => !!p);
    return <ComponentWithPageTreeButton {...props} pages={pages} />;
  };
};

export default withPageTreeButton;
