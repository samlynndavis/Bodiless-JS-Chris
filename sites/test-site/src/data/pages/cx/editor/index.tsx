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
import { withEditorFull, withEditorPlain } from '@bodiless/cx-editors';
import { cxElement } from '@bodiless/cx-elements';
import { LinkClean, cxLink } from '@bodiless/cx-link';

// For now, wrap whole page in Font -- this should be added to helmet.
const PageFontWrapper = as(cxElement.DMSans)(Div);

const FullFeaturedEditor = flowHoc(
  withEditorFull('RTEData', 'Type something here...'),
)(Div);

const PlainEditor = flowHoc(
  withEditorPlain('PlainData', 'Type something here...'),
)(Div);

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
)(LinkClean);

const main = (props: any) => (
  <Page {...props}>
    <PageFontWrapper>
      <div className="p-10">
        <h1 className="py-5 text-3xl">Typography and Editor Test Page* </h1>
        <h2 className="py-10 text-2xl">Full Featured Editor*</h2>
        <FullFeaturedEditor />
        <h2 className="py-10 text-2xl">Basic Editor*</h2>
        <PlainEditor />
        <h2 className="py-10 text-2xl">Typography Samples*</h2>
        <CxH1 />
        <CxH2 />
        <CxH3 />
        <CxH4 />
        <CxH5 />
        <CxBody />
        <CxEyebrow />
        <CxDemoLink />
        <CxRest />
        <p className="py-10">* Test page headers/descriptions are not using cx typography.</p>
      </div>
    </PageFontWrapper>
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
