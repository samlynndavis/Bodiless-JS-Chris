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

import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  flowHoc,
  Div,
  H1,
  H2,
  as,
} from '@bodiless/fclasses';
import { withEditorFull, withEditorPlain } from '@bodiless/cx-editors';
import { cxElement } from '@bodiless/cx-elements';

const FullFeaturedEditor = flowHoc(
  withEditorFull('RTEData', 'Type something here...'),
)(Div);

const PlainEditor = flowHoc(
  withEditorPlain('PlainData', 'Type something here...'),
)(Div);

const CXH1 = flowHoc(
  withEditorPlain('H1', 'Header 1'),
  as(cxElement.H1),
)(H1);
const CXH2 = flowHoc(
  withEditorPlain('H2', 'Header 2'),
  as(cxElement.H2),
)(H2);
const CXH3 = flowHoc(
  withEditorPlain('H3', 'Header 3'),
  as(cxElement.H3),
)(H2);
const CXH4 = flowHoc(
  withEditorPlain('H4', 'Header 4'),
  as(cxElement.H4),
)(H2);
const CXH5 = flowHoc(
  withEditorPlain('H5', 'Header 5'),
  as(cxElement.H5),
)(H2);

const main = (props: any) => (
  <Page {...props}>
    <div className="p-10">
      <h1 className="py-5">Typography and Editor Page </h1>
      <h2 className="py-10">Full Featured Editor</h2>
      <FullFeaturedEditor />
      <h2 className="py-10">Basic Editor</h2>
      <PlainEditor />
      <h2 className="py-10">Typography</h2>
      <CXH1 />
      <CXH2 />
      <CXH3 />
      <CXH4 />
      <CXH5 />
    </div>
  </Page>
);
export default main;

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
