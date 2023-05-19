import React from 'react';
import {
  as, Div, H1,
} from '@bodiless/fclasses';
import { SectionClean } from '@bodiless/vital-section';
import { vitalTypography } from '@bodiless/vital-elements';

import { exampleSection } from 'vital-examples/lib/intro/section-example';

const DefaultSection = as(
  exampleSection.Default,
  exampleSection.WithSectionCards,
)(SectionClean);

const SectionWithTitle = as(
  exampleSection.Default,
  exampleSection.WithSectionTitle,
  exampleSection.WithSectionCards,
)(SectionClean);

const SectionWithLink = as(
  exampleSection.Default,
  exampleSection.WithSectionLink,
  exampleSection.WithSectionCards,
)(SectionClean);

const SectionWithDescription = as(
  exampleSection.Default,
  exampleSection.WithSectionDescription,
  exampleSection.WithSectionCards,
)(SectionClean);

const SectionFull = as(
  exampleSection.Default,
  exampleSection.WithSectionTitle,
  exampleSection.WithSectionLink,
  exampleSection.WithSectionDescription,
  exampleSection.WithSectionCards,
)(SectionClean);

const Container = as('mx-2.5 md:mx-8 lg:mx-36')(Div);
const Title = as(vitalTypography.H1)(H1);

export default () => (
  <Container>
    <Title>Default Vital Section Example</Title>
    <section className="my-2">
      <DefaultSection />
    </section>

    <Title>Vital Section Example With Title</Title>
    <section className="my-2">
      <SectionWithTitle />
    </section>

    <Title>Vital Section Example With Link</Title>
    <section className="my-2">
      <SectionWithLink />
    </section>

    <Title>Vital Section Example With Description</Title>
    <section className="my-2">
      <SectionWithDescription />
    </section>

    <Title>Vital Section With All Slots</Title>
    <section className="my-2">
      <SectionFull />
    </section>
  </Container>
);
