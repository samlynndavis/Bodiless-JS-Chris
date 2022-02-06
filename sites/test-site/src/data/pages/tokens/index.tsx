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
  H1, addProps, withDesign, replaceWith, H3, H2, addClasses, flowHoc, HOC, ComponentWithMeta,
} from '@bodiless/fclasses';
import {
  CardClean,
} from '@bodiless/card';
import {
  asAccordionBody, asAccordionTitle, asAccordionWrapper,
} from '@bodiless/accordion';
import {
  withActivateOnEffect, withNodeKey, withNode,
  withNodeDataHandlers, useNode, WithNodeProps,
  withReactivateOnRemount,
} from '@bodiless/core';
import { FlowContainer } from '@bodiless/layouts-ui';
import { withTitle, withDesc } from '@bodiless/layouts';
import {
  TokenLibrary, withTokenNamesFromData, withTokensFromProps, TokenPrinter,
  withTokenPrinterKeys, TokenPanel as TokenPanelClean, withTokenPanelPane,
} from '@bodiless/tokens';
import Layout from '../../../components/Layout';
import {
  asHeader1, asPrimaryColorBackground, asHeader3, asHeader2, asBold,
} from '../../../components/Elements.token';
import { asEditableCard } from '../../../components/Card';
import * as availableTokens from '../../../components/Card/token';
import { withTypographyTokenPanel } from './TypographySelector';

const asFancyPanel = withDesign({
  Title: flowHoc(asAccordionTitle, asHeader3, asPrimaryColorBackground),
  Wrapper: asAccordionWrapper,
  Body: asAccordionBody,
  Category: flowHoc(asBold, addClasses('mt-2')),
  CheckBox: addClasses('mr-2'),
  Label: addClasses('block'),
});

const asFancyWrapper = withDesign({
  Panel: asFancyPanel,
});

const TokenPanel = asFancyWrapper(TokenPanelClean);

const withFlowContainerFirstItemNode = (
  nodeKey: string,
): HOC<{}, Partial<WithNodeProps>> => Component => {
  const ComponentWithNode = withNode(Component);
  const WithFlowContainerFirstItemNode = (props: any) => {
    const { node } = useNode<any>();
    const { items } = node.data;
    const item = items && items[0];
    return item?.uuid
      ? <ComponentWithNode {...props} nodeKey={items[0].uuid} />
      : <Component {...props} />;
  };
  return flowHoc(
    withNode,
    withNodeKey(nodeKey),
  )(WithFlowContainerFirstItemNode) as ComponentWithMeta<any>;
};

const withTokenData = (nodeKey: string) => flowHoc(
  withTokenNamesFromData,
  withNodeDataHandlers(),
  withNode,
  withNodeKey(nodeKey),
);

const CardTokenPrinter = flowHoc(
  withTokenPrinterKeys(['Title', 'Body', 'Link']),
  withDesign({
    Title: withTokenData('title-selector'),
    Body: withTokenData('body-selector'),
    Link: withTokenData('link-selector'),
  }),
  withTokenData('selector'),
  withFlowContainerFirstItemNode('demo'),
)(TokenPrinter);

const TokenPrinterBody = asAccordionBody(() => (
  <pre>
    <code>
      <CardTokenPrinter />
    </code>
  </pre>
));
const TokenPrinterTitle = flowHoc(
  asPrimaryColorBackground,
  asHeader3,
  asAccordionTitle,
)(H3);

const TokenPrinterAccordion = asAccordionWrapper(() => (
  <div>
    <TokenPrinterTitle>Code</TokenPrinterTitle>
    <TokenPrinterBody />
  </div>
));

const DemoTokenPanelCard = flowHoc(
  withDesign({
    Title: withReactivateOnRemount('title'),
    Body: withReactivateOnRemount('body'),
    Image: withReactivateOnRemount('image'),
    Link: withReactivateOnRemount('link'),
  }),
  asEditableCard,
  withDesign({
    Title: flowHoc(
      withTypographyTokenPanel('title-selector'),
      addProps({ tokenPanelTitle: 'Title' }),
    ),
    Body: flowHoc(
      withTypographyTokenPanel('body-selector'),
      addProps({ tokenPanelTitle: 'Body' }),
    ),
    Link: flowHoc(
      withTypographyTokenPanel('link-selector'),
      addProps({ tokenPanelTitle: 'CTA' }),
    ),
  }),
  withTokensFromProps,
  withReactivateOnRemount('card'),
  withTokenPanelPane('selector'),
  addProps({ availableTokens, tokenPanelTitle: 'Card' }),
  withActivateOnEffect,
)(CardClean);

const PageTitle = asHeader1(H1);
const ColumnHeader = flowHoc(asHeader2, addClasses('my-2'))(H2);

const DemoFlowContainer = flowHoc(
  withDesign({
    Card: flowHoc(
      replaceWith(DemoTokenPanelCard),
      withTitle('Card'),
      withDesc('A way to promote a call to Action.'),
    ),
  }),
  addProps({ maxComponents: 1 }),
  withNodeKey('demo'),
)(FlowContainer);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <TokenLibrary>
        <PageTitle>Tokens!</PageTitle>
        <p>Tools for tokens</p>
        <div className="flex">
          <div className="w-2/3 p-5">
            <ColumnHeader>Component</ColumnHeader>
            <TokenPrinterAccordion />
            <DemoFlowContainer />
          </div>
          <div className="w-1/3 p-5">
            <ColumnHeader>Tokens</ColumnHeader>
            <TokenPanel />
          </div>
        </div>
      </TokenLibrary>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
