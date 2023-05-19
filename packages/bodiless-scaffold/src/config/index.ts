import type { PlopGeneratorConfig } from 'plop';
import prompts from './prompts.js';
import actions from './actions.js';

const componentGeneratorConfig: PlopGeneratorConfig = {
  description: 'Component Scaffold',
  prompts,
  actions,
};

export default componentGeneratorConfig;
