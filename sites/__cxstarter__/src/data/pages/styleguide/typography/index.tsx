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
  H3,
  H4,
  H5,
  P,
  as,
} from '@bodiless/fclasses';
import { withEditorPlain } from '@bodiless/cx-editors';
import { cxElement } from '@bodiless/cx-elements';
import { LinkClean, cxLink } from '@bodiless/cx-link';
import { withNodeKey } from '@bodiless/core';

// For now, wrap whole page in Font -- this should be added to helmet.
const PageFontWrapper = as(cxElement.DMSans)(Div);
const H1Title = flowHoc(
  withEditorPlain('title', 'Page Title'),
  as(cxElement.H1, 'py-5'),
)(H1);
const CxH1 = flowHoc(
  withEditorPlain('H1', 'Header 1'),
  as(cxElement.H1),
)(H1);
const CxH2 = flowHoc(
  withEditorPlain('H2', 'Header 2'),
  as(cxElement.H2),
)(H2);
const CxH3 = flowHoc(
  withEditorPlain('H3', 'Header 3'),
  as(cxElement.H3),
)(H3);
const CxH4 = flowHoc(
  withEditorPlain('H4', 'Header 4'),
  as(cxElement.H4),
)(H4);
const CxH5 = flowHoc(
  withEditorPlain('H5', 'Header 5'),
  as(cxElement.H5),
)(H5);
const CxBody = flowHoc(
  withEditorPlain('Body', 'Body Copy'),
  as(cxElement.Body),
)(P);
const CxEyebrow = flowHoc(
  withEditorPlain('Eyebrow', 'Eyebrow'),
  as(cxElement.Eyebrow),
)(P);
const CxRest = flowHoc(
  withEditorPlain('Rest', 'Rest: i.e. Breadcrumbs / Review Numbers'),
  as(cxElement.Rest),
)(P);
const CxDemoLink = flowHoc(
  withEditorPlain('Link1', 'Link'),
  as(
    cxElement.Link,
    cxLink.Default,
    cxLink.Sidecar,
  ),
  withNodeKey('demo-link'),
)(LinkClean);

const main = (props: any) => (
  <Page {...props}>
    <PageFontWrapper>
      <div className="p-10">
        <H1Title />
        <CxH1 />
        <CxH2 />
        <CxH3 />
        <CxH4 />
        <CxH5 />
        <CxBody />
        <CxEyebrow />
        <CxDemoLink />
        <CxRest />
      </div>
    </PageFontWrapper>
  </Page>
);

export default main;

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
