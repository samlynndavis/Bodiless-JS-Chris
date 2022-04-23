import {
  Span,
} from '@bodiless/fclasses';
import { vitalTypography } from '@bodiless/vital-elements';
import { createTokenStories } from '@bodiless/tokens';

const { meta, story } = createTokenStories({
  title: 'Elements/Typography',
  component: Span,
  tokens: vitalTypography,
  defaultTokens: ['WithDemoContent'],
  componentExportName: 'Span',
  tokensExportName: 'vitalTypography',
});

export default meta;

// Unfortunately Storybook CSF does not yet provide a way to generate stories
// prorammatically.  See https://github.com/storybookjs/storybook/issues/9828
export const Clean = story();
// export const Bold = story('Strong');
// export const Emphasis = story('Emphasis');
