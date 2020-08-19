/**
 * Copyright © 2020 Johnson & Johnson
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
import Layout from '../components/Layout';
import { SectionContent, SectionMargin } from '../components/Product';
import Page from '../components/Page';
import {
  ProductListingTitle,
  ProductListingImage,
  ProductListingFlowContainer,
} from '../components/ProductListing';
import FilterByGroup from '../components/FilterByGroup';

export default props => (
  <Page {...props}>
    <Layout>
      <SectionContent>
        <SectionMargin>
          <ProductListingTitle />
        </SectionMargin>
        <SectionMargin>
          <ProductListingImage />
        </SectionMargin>
        <SectionMargin>
          <FilterByGroup>
            <ProductListingFlowContainer nodeKey="product_listing_touts" />
          </FilterByGroup>
        </SectionMargin>
      </SectionContent>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery,
    ...SiteQuery
  }
`;
