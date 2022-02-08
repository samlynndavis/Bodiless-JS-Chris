import { addProps, DesignableComponents } from '@bodiless/fclasses';
import { RawComopnentPage } from './RawComponentDemo';
import { A, B } from './TestComponents';

export const SiteRawDemoPage = addProps({
  components: { A, B } as DesignableComponents,
})(RawComopnentPage);
