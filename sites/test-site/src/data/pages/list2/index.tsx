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
import { asBodilessList, asEditable, useListContext } from '@bodiless/components';
import {
  withDesign, replaceWith, Div, addClasses, H1, H3, flowIf, addProps, flowHoc,
} from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
// import { OuterList, OuterLinkList } from './OldListDemo';
import ChameleonListDemo from './ChameleonListDemo';
import ListDemo from './ListDemo';
import SimpleListDemo from './SimpleListDemo';
import { asHeader1, asHeader3 } from '../../../components/Elements.token';
import ListDesignTest from './ListDesignTest';

const SuperSimpleList = flowHoc(
  asBodilessList('list0'),
  withDesign({
    Title: flowHoc(
      replaceWith('span'),
      asEditable('text', 'Item'),
    ),
  }),
)('ul');

const ListWithPrependAndContextualStyles = flowHoc(
  addProps({ prependItems: ['prepend', 'prepend-2'] }),
  withDesign({
    Title: flowIf(() => useListContext().currentItem === 'prepend')(
      replaceWith(() => <span>This item cannot be edited</span>),
    ),
  }),
  addProps({ appendItems: ['append'] }),
)(SuperSimpleList);

const Wrapper = addClasses('w-1/2 p-5')(Div);
const Title = asHeader1(H1);
const SectionHeader = asHeader3(H3);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <Title className="text-3xl font-bold">Editable List Demo V2</Title>
      <p className="pt-4">
        The following are different kinds of editable lists. Click on an item in each list to
        display a menu with available operations.
      </p>
      <div className="flex flex-wrap pt-4">
        <Wrapper>
          <SectionHeader>Simple List</SectionHeader>
          <p>This list has one level with editable but non linkable titles.</p>
          <SuperSimpleList />
        </Wrapper>
        <Wrapper>
          <SectionHeader>Basic Compound List</SectionHeader>
          <p>
            This list has two levels of nested sublists.
          </p>
          <SimpleListDemo nodeKey="list3" />
        </Wrapper>
        <Wrapper>
          <SectionHeader>Toggled Compound List</SectionHeader>
          <p>
            This list has up to 2 levels of nested sublists, which can be added or removed
            by an editor. The innermost sublist has less padding.
          </p>
          <ListDemo nodeKey="list2" className="w-1/3" />
        </Wrapper>
        <Wrapper>
          <SectionHeader>Chameleon Compound List</SectionHeader>
          <p>
            This list has up to 2 levels of nested sublists. The main list itself and
            each sublist can be switched between bullets and numbers.  The titles in
            the list are editable links.
          </p>
          <ChameleonListDemo nodeKey="list1" />
        </Wrapper>
        <Wrapper>
          <SectionHeader>List design test</SectionHeader>
          <p>
            This list has up to 2 levels of nested sublists. The main list itself and
            each sublist can be switched between bullets and numbers.  The titles in
            the list are editable links.
          </p>
          <ListDesignTest />
        </Wrapper>
        <Wrapper>
          <SectionHeader>List with append and item context</SectionHeader>
          <p>
            This list has static items inserted at the beginning and end. These
            items cannot be removed. In addition, the first item is non-editable.
          </p>
          <ListWithPrependAndContextualStyles />
        </Wrapper>
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
