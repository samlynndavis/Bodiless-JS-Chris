import React, { FC } from 'react';
import {
  designable,
  Div,
  H2,
  Section,
  Fragment,
  as,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/data';
import { asVitalTokenSpec } from '@bodiless/vital-elements';

import { SectionComponents, SectionBaseProps } from './types';

const sectionComponent: SectionComponents = {
  Wrapper: Section,
  TitleWrapper: Div,
  Title: H2,
  LinkWrapper: Fragment,
  Link: Fragment,
  DescriptionWrapper: Fragment,
  Description: Fragment,
  ContentWrapper: Div,
  Content: Div,
};

const SectionBase: FC<SectionBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    LinkWrapper,
    Link: SectionLink,
    ContentWrapper,
    Content,
  } = components;

  return (
    <Wrapper {...rest}>
      <TitleWrapper>
        <Title />
      </TitleWrapper>
      <DescriptionWrapper>
        <Description />
      </DescriptionWrapper>
      <LinkWrapper>
        <SectionLink />
      </LinkWrapper>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </Wrapper>
  );
};

const SectionClean = as(
  designable(sectionComponent, 'Section'),
  withNode,
)(SectionBase);

/**
 * A token modifier that respects the Section Components.
 *
 * @category Token Collection
 */
const asSectionToken = asVitalTokenSpec<SectionComponents>();
const sectionToken = asSectionToken();
type SectionToken = typeof sectionToken;

export default SectionClean;
export { asSectionToken };
export type { SectionToken };
