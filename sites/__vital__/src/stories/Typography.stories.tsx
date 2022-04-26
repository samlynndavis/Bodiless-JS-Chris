import { vitalTypographySpec } from '@bodiless/vital-elements';
import { createTokenStories } from '@bodiless/tokens';

const { meta, story } = createTokenStories(vitalTypographySpec);

export default meta;
export const Clean = story();
