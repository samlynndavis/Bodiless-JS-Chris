/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactNode } from 'react';
import { Link, graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';


import { Editable } from '@bodiless/components';
import Layout from '../../../components/Layout';
import { FlowContainerDefault } from '../../../components/FlowContainer';
import { addClasses, Div, asToken, startWith, varyDesigns, withDesign, addProps } from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';

// const getContainers = (n: number) => new Array(n)
//   .map((_, i) => <FlowContainerDefault nodeKey={`fc-${i}`} key={i} />);


const colors = ['red', 'blue', 'teal', 'green', 'yellow', 'purple', 'orange'];
const createColorDesign = (prefix: string) => colors.reduce(
  (acc, next) => ({
    ...acc,
    // [`${prefix}${next}1`]: addClasses(`${prefix}-${next}-100`),
    // [`${prefix}${next}2`]: addClasses(`${prefix}-${next}-200`),
    // [`${prefix}${next}3`]: addClasses(`${prefix}-${next}-300`),
    [`${prefix}${next}4`]: asToken(addClasses(`${prefix}-${next}-400`), asToken.meta.term(prefix)(`${prefix}-${next}`)),
    // [`${prefix}${next}5`]: addClasses(`${prefix}-${next}-500`),
    // [`${prefix}${next}6`]: addClasses(`${prefix}-${next}-600`),
    // [`${prefix}${next}7`]: addClasses(`${prefix}-${next}-700`),
  }),
  {},
);
const Box = asToken(
  addClasses('w-12 h-12 p-2 border-2'),
)(Div);

const createTextDesign = (n: number) => {
  const design: any = {};
  for (var i = 0; i < n; i++) {
    design[`Text${i}`] = asToken(
      addProps({ children: `Foo ${i}` }),
      asToken.meta.term('Text')(i),
    );
  }
  return design;
}

const baseDesign = {
  Box: startWith(Box),
};
const finalDesign = varyDesigns(
  baseDesign,
  createColorDesign('bg'),
  createColorDesign('border'),
  createColorDesign('text'),
  // createTextDesign(10),
);

const HeavyFlowContainer = withDesign(finalDesign)(FlowContainer);

const getContainers = (n: number) => {
  let nodes: ReactNode[] = [];
  for (var i = 0; i < n; i++) {
    nodes.push(
      <HeavyFlowContainer nodeKey={`fc-${i}`} key={i} />
    );
  }
  return nodes;
}


export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Demo of site/page level data</h1>
      <h3 className="text-lg font-bold">This is page 1</h3>
      <p className="my-2"><Link to="/sitedatapage2">Go to page 2</Link></p>
      <h4 className="text-base font-bold">The following is page level</h4>
      <div className="m-2 p-2 w-1/3 h-12 border-blue border">
        <Editable nodeKey="sitedatapage" placeholder="Page level data..." />
      </div>
      <h4 className="text-base font-bold">The following is site level</h4>
      <div className="m-2 p-2 w-1/3 h-12 border-blue border">
        <Editable nodeKey="sitedatapage" nodeCollection="site" placeholder="Site level data..." />
      </div>
      <div>
        Containers
        {getContainers(1)}
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
