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

const sectionComponents: SectionComponents = {
  Wrapper: Section,
  TitleWrapper: Div,
  Title: H2,
  LinkWrapper: Fragment,
  Link: Fragment,
  DescriptionWrapper: Fragment,
  Description: Fragment,
  ContentWrapper: Fragment,
  Content: Fragment,
};

const SectionBase: FC<SectionBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    LinkWrapper,
    /**
     * Renaming the link because of this error:
     *
     * `The href attribute is required for an anchor to be keyboard accessible.
     *  Provide a valid, navigable address as the href value. If you cannot provide an href,
     *  but still need the element to resemble a link, use a button and change it
     *  withappropriate styles.
     *
     *  Learn more:
     *  https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
     */
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
  designable(sectionComponents, 'Section'),
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
