import { replaceWith } from '@bodiless/fclasses';
import {
  asFooterToken, vitalFooterBase,
} from '@bodiless/vital-layout';
import { GitDiscuss } from '../../../components/GitHubButtons';

const Default = asFooterToken({
  ...vitalFooterBase.Default,
  Components: {
    ...vitalFooterBase.Default.Components,
    Rewards: replaceWith(GitDiscuss),
    SocialLinksWrapper: replaceWith(() => null),
    SocialLinks: replaceWith(() => null),
  },
  Layout: {
    Wrapper: 'w-full',
    Container: 'flex justify-end',
    Column: 'flex-grow',
    CopyrightWrapper: 'w-full',
  },
});

export default {
  ...vitalFooterBase,
  Default,
};
