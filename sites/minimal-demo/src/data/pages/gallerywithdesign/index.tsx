import React from 'react';
import { graphql } from 'gatsby';
import { Page, PageProps } from '@bodiless/gatsby-theme-bodiless';
import {
  addClasses, as, Div, H1, Img, A, Section,
} from '@bodiless/fclasses';
import { asEditable, asBodilessLink, withPlaceholder } from '@bodiless/components';
import { asBodilessImage } from '@bodiless/components-ui';
import { RichText } from '@bodiless/richtext-ui';
import { mysiteElement, mysiteRichText } from '@bodiless/minimal-demo';
import { withNodeKey } from '@bodiless/core';
import Gallery from './Gallery';

const asPageContainer = addClasses('container mx-auto');
const asYMargin = addClasses('my-2');

const Container = as(
  asPageContainer,
  asYMargin,
)(Div);

const PrimaryHeader = as(
  asEditable('title', 'Title'),
  mysiteElement.H1,
)(H1);

const Link = asBodilessLink('hero-link')(A);
const Image = asBodilessImage('hero-image', {
  src: 'https://via.placeholder.com/6000x1200.png?text=HERO+IMAGE',
  alt: 'Hero Image',
  title: 'Hero Image',
})(Img);

const Body = as(
  mysiteRichText.Simple,
  withPlaceholder('Body'),
  withNodeKey('body'),
)(RichText);

const Footer = asEditable(
  { nodeKey: 'footer', nodeCollection: 'site' },
  'Footer text. Click to edit!',
)(Section);

export default (props: PageProps) => (
  <Page {...props}>
    <Container>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link><Image /></Link>
      <PrimaryHeader>About BodilessJS</PrimaryHeader>
      <Body />
      <Gallery nodeKey="gallery-content" />
      <Footer />
    </Container>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery,
    ...SiteQuery
  }
`;
