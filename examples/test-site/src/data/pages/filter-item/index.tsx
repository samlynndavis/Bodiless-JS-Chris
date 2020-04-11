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
import { Editable, asTaggableItem, withPlaceholder, asEditable } from '@bodiless/components';
import Layout from '../../../components/Layout';
import { flow, flowRight } from 'lodash';
import { withNodeKey } from '@bodiless/core';

const suggestions = [
  { id: 0, name: 'Bananas' },
  { id: 1, name: 'Mangos' },
  { id: 2, name: 'Lemons' },
  { id: 3, name: 'Apricots' },
];

//  const TaggableEditable = flowRight(
//    asTaggableItem('tags'),
//    asEditable('text', 'Editable Text')
//  )('span');
const TaggableEditable = flowRight(
  asTaggableItem('tags'),
  withPlaceholder('Editable Text'),
  withNodeKey('text'),
)(Editable);
export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Metadata (tags) Group Demo Page</h1>
      <p>
        Below is an editable component that can take metadata (tags/groups) So
        that an end user to hide it with a filter.
      </p>
      <div className="my-3">
        <TaggableEditable
          suggestions={suggestions}
          inputPlaceHolder="Add or create"
          allowNew
          noSuggestionsText="No suggestions found"
        />
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
