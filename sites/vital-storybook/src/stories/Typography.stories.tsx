import {
  addProps,
  Span,
} from '@bodiless/fclasses';
import type { PropsWithChildren } from 'react';
import { vitalTypography } from '@bodiless/vital-elements';
import { createTokenStories } from '@bodiless/tokens';

const content: PropsWithChildren<{}> = {
  children: 'Lorem ipsum dolor sit amet',
};

const { meta, story } = createTokenStories({
  title: 'Elements/Typography',
  component: addProps(content)(Span),
  tokens: vitalTypography,
  componentName: 'Span',
  tokenCollectionName: 'vitalTypography',
});

export default meta;

// Unfortunately Storybook CSF does not yet provide a way to generate stories
// prorammatically.  See https://github.com/storybookjs/storybook/issues/9828
export const Clean = story();
// export const Bold = story('Strong');
// export const Emphasis = story('Emphasis');
