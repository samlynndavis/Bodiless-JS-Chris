import {
  as, H1, H2, P
} from '@bodiless/fclasses';
import React from 'react';
import { lessonFooter } from 'vital-examples/lib/background-images';
import { FooterClean, vitalFooter } from '@bodiless/vital-layout';
import { vitalTypography } from '@bodiless/vital-elements';

const Footer = as(vitalFooter.Default)(FooterClean);
const CustomFooter = as(lessonFooter.Default)(FooterClean);

const Title = as(vitalTypography.H1, 'pt-8')(H1);
const SubTitle = as(vitalTypography.H2, 'pt-8')(H2);
const Description = as(vitalTypography.Body, 'pt-1')(P);

export default () => (
  <div className="w-full mx-auto">
    <Title className="mx-2.5 md:mx-8 lg:mx-36">SVG Footer Background Example</Title>
    <section className="my-2">
      <SubTitle className="mx-2.5 md:mx-8 lg:mx-36">Standard Footer</SubTitle>
      <Footer />
    </section>
    <section>
      <SubTitle className="mx-2.5 md:mx-8 lg:mx-36">Custom Footer</SubTitle>
      <Description className="mx-2.5 md:mx-8 lg:mx-36">With modified brand logo and SVG footer wave image.</Description>
      <CustomFooter />
    </section>
  </div>
);
