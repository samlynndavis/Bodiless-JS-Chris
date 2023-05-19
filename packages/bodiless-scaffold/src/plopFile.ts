import type { NodePlopAPI } from 'plop';
import config from './config/index.js';

export default (plop: NodePlopAPI) => {
  plop.setGenerator('component', config);
};
