import { vitalHeaderSpec } from '@bodiless/vital-layout';
import { createTokenStories } from '@bodiless/tokens';

const { meta, story } = createTokenStories(vitalHeaderSpec);

export default meta;
export const Clean = story();
